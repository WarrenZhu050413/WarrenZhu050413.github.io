---
layout: post
title: "perftest gpudirectrdma `write_bw`"
description: "I want to look at `ib_write_bw` with `--use-cuda` flag and understand from a libibverbs level how the GDR transfer is setup and then executed in perftest."
date: 2025-03-17 12:00:00 -0400
categories: [mlsystems]
---

Note: I am not thinking about MLSystems now. But keeping these posts here for anyone curious.

# Goal

I want to look at `ib_write_bw` with `--use-cuda` flag and understand from a libibverbs level how the GDR transfer is setup and then executed in [perftest](https://www.google.com/search?client=firefox-b-1-d&q=perftest).

# Overall Conclusion

What perftest does for a standard `ib_write_bw` is similar to the example shown [here](https://github.com/animeshtrivedi/rdma-example). The main logic is in `perftest/src/write_bw.c`.

The main difference lies in the memory create step, where we use the function `cuda_memory_allocate_buffer` to allocate our buffer. The specific CUDA functions that it calls are:
- `cuMemAllocHost` if we are using integrated memory
- `cuMemAlloc` if we are using specific memory

Then, if we are using DMA, we do page alignment and then call `cuMemGetHandleForAddressRange` to get the DMA-buffer file descriptor handle to the CUDA address range.

## Assumptions

For the normal RDMA steps that I outline below, I assume that we have `user_param.work_rdma_cm = ON`. That is, we are using the `rdma_cm` library to create the connection. We are also assuming that we are not using DC connection type. These add slightly different steps but they are similar with regard to the CUDA setup. We also assume we are doing half duplex write test (without immediate). At last, I assume that `user_param.test_method == RUN_REGULAR`, which means that only a write of a specific size is done. The logic is similar if we have other configurations.

# Actual Steps

### Steps 1-6: Initialize the parameters and verify hardware setup

1. Initialize default values to user's parameters:

```cpp
memset(&user_param, 0, sizeof(struct perftest_parameters));
memset(&user_comm, 0, sizeof(struct perftest_comm));
memset(&ctx, 0, sizeof(struct pingpong_context));

user_param.verb = WRITE;
user_param.tst = BW;
strncpy(user_param.version, VERSION, sizeof(user_param.version));
```

2. Configure the parameters values according to user arguments or default values:

```cpp
// Parses the command line arguments and updates the user_param struct
ret_parser = parser(&user_param, argv, argc);
```

3. Find the IB device selected (or default if none is selected):

```cpp
// Calls ib_dev = ibs_get_device_list and do strcmp(ibv_get_device_name(ib_dev), *ib_devname) to find the device
// Defaults to the first device if ib_devname does not exist
ib_dev = ctx_find_dev(&user_param.ib_devname);
```

4. Get the relevant context from the device:

```cpp
// Calls context = ibv_open_device(ib_dev);, returns context
// ibv_context struct has device, context_ops
ctx.context = ctx_open_device(ib_dev, &user_param);
```

5. Verify user parameters and the device context match:

```cpp
if (verify_params_with_device_context(ctx.context, &user_param))
```

6. See if link type is supported by the user parameters and also active (checks both ports):

```cpp
if (check_link(ctx.context, &user_param))
```

### Steps 7-8: Set up the connection

7. Copy the relevant user parameters to the comm struct and create rdma_cm resources:

```cpp
// Step 7
create_comm_struct(&user_comm, &user_param)

// create_comm_struct calls memory_create, which returns a memory_ctx object
comm->rdma_ctx->memory = comm->rdma_params->memory_create(comm->rdma_params);
```

The memory_ctx structure contains function pointers for memory operations:

```cpp
// Memory_ctx, defined in perftest/src/memory.h
struct memory_ctx {
    int (*init)(struct memory_ctx *ctx);
    int (*destroy)(struct memory_ctx *ctx);
    int (*allocate_buffer)(struct memory_ctx *ctx, int alignment, uint64_t size, int *dmabuf_fd,
                          uint64_t *dmabuf_offset, void **addr, bool *can_init);
    int (*free_buffer)(struct memory_ctx *ctx, int dmabuf_fd, void *addr, uint64_t size);
    void *(*copy_host_to_buffer)(void *dest, const void *src, size_t size);
    void *(*copy_buffer_to_host)(void *dest, const void *src, size_t size);
    void *(*copy_buffer_to_buffer)(void *dest, const void *src, size_t size);
};
```

8. Initialize the connection and print the local data.
This calls `establish_connection`, which executes `rdma_server_connect` or `rdma_client_connect` depending on 
whether the calling machine is server or client.

```cpp
// establish connection
if (establish_connection(&user_comm)) {
    exchange_versions(&user_comm, &user_param);
    check_version_compatibility(&user_param);
    check_sys_data(&user_comm, &user_param);
    (...)
}
```

`establish_connection(&user_comm)` has two components:

a) `rdma_server_connect(&ctx, &user_param)` - Standard RDMA server connection setup:

```cpp
rdma_bind_addr(ctx->cm_id_control, (struct sockaddr *)&sin);
rdma_listen(ctx->cm_id_control, user_param->num_of_qps);
rdma_get_cm_event(ctx->cm_channel, &event);
rdma_cm_connection_request_handler(ctx, &user_param, event, ctx->cm_id_control);
```

b) `rdma_client_connect(&ctx, &user_param)`:

```cpp
rdma_resolve_addr(ctx->cm_id, source_ptr, (struct sockaddr *)&sin, 2000);
rdma_get_cm_event(ctx->cm_channel, &event);
rdma_ack_cm_event(event);
```

9. See if MTU is valid and supported:

```cpp
if (check_mtu(ctx.context, &user_param, &user_comm))
```

10. Allocate memory for fields in the ctx struct needed for the test:

```cpp
if(alloc_ctx(&ctx, &user_param))
```

### Steps 11-12: Change RDMA State from RESET -> INIT

11. Create RDMA CM resources and connect through CM:
This is standard RDMA CM connection creation step, where they exchange information through RDMA send/receive 
operations in the `ctx_handshake` function. 

```cpp
rc = create_rdma_cm_connection(&ctx, &user_param, &user_comm, my_dest, rem_dest);
```

`create_rdma_cm_connection` does:

```cpp
rdma_create_event_channel()
rdma_cm_allocate_nodes(ctx, user_param, &hints)
ctx_handshake(comm, &my_dest[0], &rem_dest[0])
```

Then:

```cpp
if (user_param->machine == CLIENT) {
    rc = rdma_cm_client_connection(ctx, user_param, &hints);
    
    // rdma_cm_client_connection calls
    // rdma_cm_get_rdma_address
    // rdma_resolve_addr
    // rdma_cm_connect_events
} else {
    rc = rdma_cm_server_connection(ctx, user_param, &hints);
    // calls 
    // rdma_create_id
    // rdma_cm_get_rdma_address
    // rdma_bind_addr
    // rdma_listen
    // rdma_cm_connect_events
    // rdma_destroy_id
}
```

12. Create all the basic IB resources (data buffer, PD, MR, CQ and events channel):

```cpp
int ctx_init(struct pingpong_context *ctx, struct perftest_parameters *user_param)

// Does
// ibv_alloc_pd
// ctx->memory->init(ctx->memory)
// create_mr(ctx, user_param)
// create_cqs(ctx, user_param)
// create_qp_main
// And other setups depending on the input flag
```

The part related to GPU RDMA is in the functions that use the `ctx->memory` attribute, which is created through the function `cuda_memory_create`. All the CUDA memory related functions are in `cuda_memory.c`.

It specifically uses `cuda_memory_allocate_buffer` to allocate the memory, get the memory address, and do DMA-related operations if we are testing that.

The specific CUDA functions that it calls are:
- `cuMemAllocHost` if we are using integrated memory
- `cuMemAlloc` if we are using specific memory

Then, if we are using DMA, we do page alignment and then call `cuMemGetHandleForAddressRange` to get the DMA-buffer file descriptor handle to the CUDA address range.

Below is the call stack for the `create_mr` function:

```cpp
int create_mr(struct pingpong_context *ctx, struct perftest_parameters *user_param) 
```

which calls:

```cpp
int create_single_mr(struct pingpong_context *ctx, struct perftest_parameters *user_param, int qp_index)
```

which calls:

```cpp
// is cuda_memory_allocate_buffer for the GPU case
ctx->memory->allocate_buffer(ctx->memory, user_param->cycle_buffer, 
                            ctx->buff_size, &dmabuf_fd, &dmabuf_offset, 
                            &ctx->buf[qp_index], &can_init_mem)
```

### Steps 13-14: INIT -> RTR -> RTS. Ready to send data now.

13. Set up the Connection:

```cpp
if (set_up_connection(&ctx, &user_param, my_dest)) {
```

14. Handshake with the remote side after the connection is set up, exchanges lid and gid values for each QP

```cpp
for (i=0; i < user_param.num_of_qps; i++) {
    if (ctx_hand_shake(&user_comm, &my_dest[i], &rem_dest[i])) {
        fprintf(stderr, " Failed to exchange data between server and clients\n");
        goto destroy_context;
    }
}
```

### Step 15: Actual Communication

**Server Side:**
Calls `run_iter_bw_server`. It doesn't do much. It posts receive requests for receiving control flow messages. It could also send credit information in credit-based flow control if it does `ibv_post_send`.

**Client Side:**
Calls `run_iter_bw`, which has the following steps:

1. Perform warmup (optional):
```cpp
perform_warm_up(&ctx, &user_param)
```

2. Handshake to synchronize with server client:
```cpp
ctx_hand_shake(&user_comm, &my_dest[0], &rem_dest[0])
```

3. Now writes using `post_send_method`, which uses `ibv_post_send`. It sends the specified number of iterations or for the specified rate or for the specified duration. For testing with multiple flows, it gives each flow a unique region in the memory buffer and loops through regions of the memory buffer to write to:

```cpp
struct ibv_send_wr *bad_wr = NULL;
return ibv_post_send(ctx->qp[index], &ctx->wr[index*user_param->post_list], &bad_wr);
```

4. Does `ctx_hand_shake` to resynchronize

5. Calls `xchg_bw_reports` to exchange the bandwidth measurements between the server and the client. 