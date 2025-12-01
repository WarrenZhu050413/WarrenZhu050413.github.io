---
layout: post
title: "TorchFT Design Overview"
description: "Sharing some of my learnings looking at a large portion of my past month looking at the TorchFT codebase. Hope it is useful!"
date: 2025-04-17 12:00:00 -0400
categories: [mlsystems]
relegated: true
---

Note: I am not thinking about MLSystems now. But keeping these posts here for anyone curious.

Sharing some of my learnings looking at a large portion of my past month looking at the TorchFT codebase. Hope it is useful! It is a roadmap to get you comfortable developing on top of the codebase. I also have to thank [Tristan Rice](https://github.com/d4l3k) for being really kind and helpful!

# Background and Prelim

Here are some good background to understand before understanding TorchFT. I hope that this could serve as a good reading list for you to get started rather than something that deters you away! It is really fun!

I assume that you have read the [torchFT Design Doc](https://docs.google.com/document/d/1OZsOsz34gRDSxYXiKkj4WqcD9x0lP9TcsfBeu_SsOY4/edit?tab=t.0#heading=h.hhh64jbwbx4c) and is familiar what HSDP is.

I also assume that you have a good understanding of [Process Groups](https://pytorch.org/torchft/process_group.html) in Pytorch, and [MPI programming patterns](https://carleton.ca/rcs/rcdc/introduction-to-mpi/).

I also assume that you've played around with the torchFT [codebase](https://github.com/pytorch/torchft) yourself! No explanation is as good as clicking through the various files and code structure to get a feel for the codebase! 

# Useful Diagrams
Here is a high level structure of torchFT, taken from the github. Courtesy of [Tristan Rice](https://github.com/d4l3k).
![torchFT_Overall_Structure](./assets/post_pictures/torchFT_Overall_Structure.png).

There is also a [diagram](https://drive.google.com/file/d/1atmOxMuL9vFf9u9-39fs6POazoHpT9_S/view?usp=sharing) I made when going through TorchFT which may help you follow along.

![1](./assets/post_pictures/torchFT_Code_Structure.jpg)

Here is the basic logical structure of TorchFT. This is a commented version of TorchFT's own `train_ddp.py` example:

```python
# Copyright (c) Meta Platforms, Inc. and affiliates.
# All rights reserved.
#
# This source code is licensed under the BSD-style license found in the
# LICENSE file in the root directory of this source tree.

import logging
import os
import sys
from datetime import timedelta
from time import sleep
import torch
import torch.nn.functional as F
import torchvision
import torchvision.transforms as transforms
from torch import nn, optim
from torch.distributed.elastic.multiprocessing.errors import record
from torchdata.stateful_dataloader import StatefulDataLoader

from torchft import (
    DistributedDataParallel,
    DistributedSampler,
    Manager,
    Optimizer,
    ProcessGroupBabyNCCL,
    ProcessGroupGloo,
)

logging.basicConfig(level=logging.INFO)


@record
def main() -> None:
    # Be careful to distinguish between replica_group_id and rank. Rank is within a replica group, REPLICA_GROUP_ID is between replica groups
    REPLICA_GROUP_ID = int(os.environ.get("REPLICA_GROUP_ID", 0))
    NUM_REPLICA_GROUPS = int(os.environ.get("NUM_REPLICA_GROUPS", 2))
    
    transform = transforms.Compose(
        [transforms.ToTensor(), transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))]
    )
    trainset = torchvision.datasets.CIFAR10(
        root="./cifar", train=True, download=True, transform=transform
    )

    # This shards the training set across all ranks and replica groups. We manage
    # the dataloaders on a per replica group basis with the assumption that the
    # majority of groups will be available so few batches will be dropped.
    sampler = DistributedSampler(
        trainset,
        replica_group=REPLICA_GROUP_ID,
        num_replica_groups=NUM_REPLICA_GROUPS,
        rank=0,
        # for DDP we can use replica groups of size 1, FSDP/PP/CP would need more.
        num_replicas=1,
        shuffle=True,
    )

    # This uses the torchdata StatefulDataLoader to be able to checkpoint and
    # restore the per worker dataloader position.
    trainloader = StatefulDataLoader(
        trainset, batch_size=64, num_workers=2, sampler=sampler
    )

    # Have to define your own load state_dict and state_dict function for live checkpoint recovery
    def load_state_dict(state_dict): 
        m.load_state_dict(state_dict["model"])
        optimizer.load_state_dict(state_dict["optim"])

    def state_dict():
        return {
            "model": m.state_dict(),
            "optim": optimizer.state_dict(),
        }

    device = "cuda" if torch.cuda.is_available() else "cpu"
    pg = (
        # ProcessGroupBabyNCCL runs the NCCL operations in another process (wraps it in a cradle)
        # The main benefit is to prevent NCCL hangs affecting the whole program
        # The two processes communicate through a pipe, and the logic inside is amongst the most 
        # intricate in torchFT (but great fun to understand!)

        ProcessGroupBabyNCCL(
            timeout=timedelta(seconds=5),
        )
        if torch.cuda.is_available()
        else ProcessGroupGloo(timeout=timedelta(seconds=5))
    )

    # This starts a ManagerClient in each rank. If rank=0, also starts a ManagerServer
    manager = Manager(
        pg=pg,
        min_replica_size=1,
        load_state_dict=load_state_dict,
        state_dict=state_dict,
        replica_id=f"train_ddp_{REPLICA_GROUP_ID}",
        timeout=timedelta(seconds=10),
        enable_error_bus=True,
    )

    class Net(nn.Module):
        def __init__(self):
            super().__init__()
            self.conv1 = nn.Conv2d(3, 6, 5)
            self.pool = nn.MaxPool2d(2, 2)
            self.conv2 = nn.Conv2d(6, 16, 5)
            self.fc1 = nn.Linear(16 * 5 * 5, 120)
            self.fc2 = nn.Linear(120, 84)
            self.fc3 = nn.Linear(84, 10)

        def forward(self, x):
            x = self.pool(F.relu(self.conv1(x)))
            x = self.pool(F.relu(self.conv2(x)))
            x = torch.flatten(x, 1)  # flatten all dimensions except batch
            x = F.relu(self.fc1(x))
            x = F.relu(self.fc2(x))
            x = self.fc3(x)
            return x

    m = Net().to(device)
    m = DistributedDataParallel(manager, m)
    optimizer = Optimizer(manager, optim.AdamW(m.parameters())) # Optimizer is managed
    criterion = nn.CrossEntropyLoss()

    print(m)

    # You can use an epoch based training but with faults it's easier to use step
    # based training.
    while True: 
        for i, (inputs, labels) in enumerate(trainloader):
            inputs = inputs.to(device)
            labels = labels.to(device)

            # must be called at the beginning of each train loop
            # Quorum computation is triggered here but only needed in the backwards pass.
            optimizer.zero_grad()

            out = m(inputs)
            loss = criterion(out, labels)

            # Gradient allreduce overlaps with the backwards pass.
            loss.backward()

            # must be called at the end of the train loop
            # This may not actually step the optimizer if an error occured during grad allreduce.
            optimizer.step()

            if manager.current_step() % 100 == 0:
                print(f"[{manager.current_step()}] loss = {loss.item()}")

            # TODO (by the user): periodically checkpoint model, optim, manager and dataloader

            # You typically want to checkpoint dataloader frequently (every step?) to
            # avoid repeated batches as it's replica group specific.

            # Model, optim and manager checkpoints can be done more infrequently as
            # they're shared across all groups and will load from existing replicas as
            # long as not every worker goes down.

            if manager.current_step() >= 10000:
                # complete training
                exit()
if __name__ == "__main__":
    main()

```
# FAQ

I think the most pedagogically useful way is to write the set of questions that took me a long time to answer in TorchFT. in increasing levels of subtlety.

#### Prelim: How are the intra-replica-group and inter-replica group stores determined? 

The intra-replica-group stores are determined by torchElastic, not in the province of TorchFT.
The inter-replcia-group stores are determined by the quorum process. Each replica group starts a store, and each data-parallel shards gets assigned one of these stores as their current store.

#### Question 1: What is actually happening under the hood when we Quorum?

```txt
ManagerClient1 ->
ManagerClient2 ->  
ManagerClient3 -> ManagerServer = LighhouseClient --(when all ManagerClients sent quorum) -->
...
ManagerClientn ->

ManagerClient1 ->
ManagerClient2 ->  
ManagerClient3 -> ManagerServer = LighhouseClient --(when all ManagerClients sent quorum) -->
...
ManagerClientn ->

...                                                                             --> Lighthouse Server (Compute Quorum)

                                                                                        Quorum Returns When:
                                                                                            {
                                                                                                # Replica Groups are healthy when they send heartbeats
                                                                                                (Receive minimum_replica_group number of ManagerClients &
                                                                                                More than half of the healthy replica groups have joined) + 
                                                                                                (Waits for join_time_out || All Healthy Replica Groups have joined) +
                                                                                                live_recovery_assignment = live_recovery_computation(quorum_participants)
                                                                                                store_assignments = load_balance_store() # Each replica group has one store
                                                                                                                                        # So have to prevent all data parallel 
                                                                                                                                        # shards using the same store from a single replica group

                                                                                                return (live_recovery_assignment, store_assignments)
                                                                                            }

                                                                                        def live_recovery_computation(quorum_participants):
                                                                                            max_step = max([participant.step() for participant in quorum_participants])
                                                                                            lagging_participants = get_late_participants(participants, max_step)
                                                                                            in_sync_participants = set_minus(quorum_participants, lagging_participants)

                                                                                            for lag_par in lagging_participants:
                                                                                                lagging_participant.recovery_rank = assign_healthy_participant(healthy_participants) # Currently round-robin assignment

                                                         
ManagerClient1 ->
ManagerClient2 ->  
ManagerClient3 -> ManagerServer = LighhouseClient --(when all ManagerClients sent quorum) -->
...
ManagerClientn ->

ManagerClient1 ->
ManagerClient2 ->  
ManagerClient3 -> ManagerServer = LighhouseClient --(when all ManagerClients sent quorum) -->
...
ManagerClientn ->
```

Note: There is a subtlety of Quorum that Tristan Rice pointed out to me. There is a FastQuorum algorithm that returns the quorum immediately if all participants of the previous quorum joins this quorum. This is to prevent the overhead of join-time-out when we have a LighthouseClient that is sending heartbeats but is not joining. This apparently can happen because the heartbeats are issued in a separate thread.

#### Question 2: How does each individual Data Parallel Shard coordinate on their store address?
- It is calculated by the lighthouse (see `load_balance_store` function above)

#### Question 3: How does Live Recovery Work?
- After getting the assignments from the quorum (see `live_recovery_computation` function above)
- Note that the recovery assignment is done in a separate cuda stream. The recovery_stream's completion is checked before an optimizer.step().

#### Question 4: How does Baby Process Group work?
- ProcessGroupBaby manages the process_group related computations in the `_worker` subprocess.
- ProcessGroupBaby sends commands to the `_worker` subprocess through a pipe. The `_worker` subprocess continuously listens to the pipe.
- Three types of commands can be sent, `func`, `wait`, and `future`.
  - `_run_func` executes the corresponding process group function through `_worker`. Each command is registered in a separate cuda stream and the stream is strored.
    - That function call's `id` is stored, along with the cuda stream it is launched in.
    - The future is returned. Caution (See Q5 for more detail): The future is a pytorch future that is done() after the logical, but not physical completion of the actual function
      - E.g. if I call all reduce, it will return if it confirms that all other ranks have called all reduce and the computation is starting (but doesn't wait until it ends)
    - To wait until the physical completion, we would need to register an event on the corresponding cuda stream.
  - `wait(op_id, timeout)` lets the `_worker` subprocess register a cuda event on the stream corresponding to the operation it is waiting on, and return that event. Then the main process calls `event.wait()`. wait on the event before returning.
- The ProcessGroupBaby also has a `future_thread` that runs a `future_handler`. The `future_handler` monitors the cuda event associated with a future (see question 5).

#### Question 5: How does the code ensure that the future waits for the cuda stream to finish (since native pytorch futures return once the operation is enqueued onto the stream)

We have the code, deceivingly simple, that is the following:
```python
work = pg._fun_func(...)
fut = work.get_future()
fut.wait()
```

What actually happens is the following:

Here, pg._fun_func(...) returns a _BabyWork object.

When we do work.get_future(), we call 

`self._pg._get_future(self.op_id, self._stream)`

where `_pg` is a ProcessGroupBaby object.

Thus, when we call `_get_future`, we actually communicate to the `_worker` subprocess in ProcessGroupBaby. `_worker`. However, and here is where something interesting happens, `_get_future` returns a brand new future created in the following way:

```python
def _get_future(
    self, op_id: int, stream: Optional[torch.cuda.Stream]
) -> Future[object]:
    with self._futures_lock:
        fut = Future()  # pyre-fixme[29]: is not a function
        self._futures[op_id] = _FutureMetadata(future=fut, stream=stream)
        assert self._pipe is not None
        self._pipe.send(("future", op_id))

    # TODO: return correct tensor instead of None
    return fut
```

We will later on manipulate this new future safed in `self._futures[op_id]` to ensure proper synchronization. 

Now, back to `_get_future`:

This communicates with the `_worker` subprocess, which executes: 

```python
metadata.work.get_future().add_done_callback(
    lambda fut: callback(fut, metadata)
)
```

Note that `metadata.work.get_future()` gets the future associated with the work. 

Now, the callback is where the core of the synchronization logic happens:

```python
def callback(fut: Future[object], metadata: _OpMetadata) -> None:
    try:
        # create an event after the collective has been issued
        # to wait on this before we call "future"
        with metadata.set_stream():
            fut.wait()
            event = (
                torch.cuda.current_stream().record_event(
                    torch.cuda.Event(interprocess=True)
                )
                if metadata.stream is not None
                else None
            )

        future_pipe.send((op_id, _FUTURE_RESULT, None, event))
    except Exception as e:
        future_pipe.send((op_id, _FUTURE_EXCEPTION, e, None))
```

Here, we record a cuda event and send this event through the future pipe. Or, if the operation is not successfully enqueued, then `fut.wait()` will raise an error and we will also send this through the pipe.

Then, the `_future_handler` thread that monitors the pipe can retrieve the result and wait for the event + wait for the future!

So, to summarize:

There are two futures around:

1. A pytorch future associated with a _BabyWork object, where the work is an MPI call.
2. future() defined by ourselves and returned to the main `train.py` thread, and which it waits on.

We handle the creation and enqueing of the pytorch future in the _worker subprocess, which may seem strange. Why do we do so? The answer is in the [torchft design doc](https://docs.google.com/document/d/1OZsOsz34gRDSxYXiKkj4WqcD9x0lP9TcsfBeu_SsOY4/edit?tab=t.0):

```txt
NCCL is prone to deadlocks on errors as well as when calling NCCL comm abort. In OSS version some of these issues have been fixed but it's unknown to what extent at this point since I haven't used it extensively. In addition it sounds like NVIDIA is working on making NCCL safer but it's not fully ready yet.

An alternative to using NCCLs error handling is to simply run it in a subprocess. This subprocess can be managed by the parent process and on error or quorum change, killed on all nodes and recreated.
```

To explain: To prevent NCCL deadlock taking the whole `train.py` down, we handle all the errors related to NCCL inside a `_worker` subprocess. This `worker` process can be killed and reconfigured when our quorum changes or upon unresponsiveness. This prevents the deadlock taking the whole process down!

Now, this is also why we spawn out a `_future_handler` thread to handle the `event.wait()` for the `event` associated with the work that we are getting a future from. 

We do this so that the `_worker` subprocess dono't get blocked waiting for the wait. Here, our `_future_handler`'s setting of the returned future's result is actually the event that we are waiting for when we do `fut.wait()` in our main thread!

(Note that when we do `work.wait()`, we don't need this. Here we directly call `event.wait()` in the main thread in `pg._wait`. The reason here is that waiting for the work is immediately blocking, whereas waiting for the future is more tricky since we can later on wait on this future at any time. So we have a background thread that waits on the cuda event to monitor the progress of that future.)

#### Question 6: How does the checkpoint transport work?

There are two types of checkpoint transport mechanism, using the TorchFT process group, and using HTTP transport.


