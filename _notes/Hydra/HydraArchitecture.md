
https://chatgpt.com/c/67d80c4b-6138-800b-8006-6a79e9e58ba7

Coordinator:
- Flag unavailable process groups

# Hydra


## Terminology
**Machines**: Computation Engines (e.g. GPU)
**Replica Group**: A group of machines that hosts an entire model and is able to do a forward pass on a separate slice of data without communicating with external machines.

## Assumptions/Observations

We assume large model training where each server has at most one replica group.

We also assume that in Language Model training only 

From [llama3](./LitReview/llama3/llama3FailureCause.png) we classify failures into GPU failures, Network failures, Host failures, Unplanned Maintenance failures, and Dependency failures.

(GPU Failures can be detected by intra-host agents)
GPU Failures: Faulty GPU, GPU HBM3 Memory, GPU SRAM Memory, GPU System Processor, Silent Data Corruption, GPU Thermal Interface + Sensor

Dependency Failures: Software Bug, Dependency

Host Failures: NIC, SSD, Power Supply, Server Chassis, IO Expansion Board

Network: Network Switch/Cable

Maintenance Failures: Host Maintenance Failures



GPU Failures
## Behavior Specification {#behavior-specification}
Failure Types and responses:

1. Single GPU Failure
      1. Goal:
            1. Replace one process without tearing down the entire training job.
            2. (What does tearing down the entire training job mean??)
      2. Behavior:
            1. Upon failure:
                  1. The entire replica group drops out.
                  2. The failed GPU.
                  3. For the non-failed machines in the replica group, zero out its tensors during CCL
                  4. They should still be in sync with other replica groups through still doing CCL
            1. When the failed machine restart and is healthy again
                  1. Fetches checkpoints from other running processes
                  2. Continues participating in all-reduce (SYNCRONIZATION?)
2. Server Failure
      1. 
      2. Detects failures through heartbeat and missing communications
      3. Flag groups as unavailable
      4. The entire replica group drops out

## Barriers
- Key observation 1: Only need to barrier before every single optimizer step
- Key observation 2: The gradient step is taken in synchrony within each replica group, because gradients can only be calculated after 
  - Since optimizer step is what changes the model state and optimizer state
- Barrier needs to ensure that before the optimizer step, the set of models that determine themselves to be "healthy" has
  - 1. the most up to date model weights in the data parallel group
  

## Failure Detection and Monitoring

Generally:
1. Collective Operations should be wrapped in an error handling hook
2. Error swallowing. Whenever a collective operations fail, returns not an error but a "Dummy". Only truly drops out when the machine fails.


Three scopes of monitoring: intra-server, within-group, and cross-group.

1. Intra-Server Agents
   1. Description:
      1. One Agent/Server
      2. Runs on the server CPU (true??)
      3. See [ElasticAgent](https://pytorch.org/docs/stable/elastic/agent.html) (TODO)
   2. Detection Mechanism
      1. Heartbeat from the process in each machine (how?? torchFT has a managerclient. But this is still on the CPU side?? Not sure how to really get the heartbeat from the GPU)
      2. Monitor network links (can it??)
      3. OS/hardware alerts (what is it??)
      4. Proactively check GPU health (ECC memory errors/GPU OOM events, and others how to do so??)
   3. Types of Failures that it can detect:
      1. TODO
   4.Response
      2. Local remidiation
         1. Restarting a crashed worker process
         2. What are other things to do??
      3. Report to the broader system of the machine failure


2. Within-Group Detection
   1. Description
      1. When groups span multiple servesrs, we need some way for intra-server agents to communicate with each other
      2. According to (#behavior-specification), the intra-server agents will report the failure to the broader system
   2. Collective operations wrapped in an error-handling hook
   3. Intra-server Agents need to communicate with each other
      1. Either through a centralized publish/subscribe model
      2. Or through decentralize p2p message passing
      3. (Which one to choose??)

3. Cross-Group Coordination
   1. Description
      1. How to keep different replica groups in sync (same model and optimizer weights)
      2. Key about data parallel groups is that when one member fails, all the members should re-form the process group and keep going.
      3. Give flexibility of the granularity of data parallel groups (e.g., maybe DDP for every pipelined stage rather than DDP for the whole model)
   2. Detection Mechanism 
      1. Heartbeat
      2. Quorum?
      3. Built in elasticity with the quorum mechanism
         1. As long as you choose to join, you can join at any time
   3. Responses
      1. Restart process group
      2. Live checkpoint recovery when receives a quorum/heartbeat from another server

## Recovery
Two ways:
1. Checkpoint-based
- For every x-steps, saves a checkpoint
- Uses SOTA checkpointing methods: overlapping checkpointing with the forward and backward pass
- This checkpoint is used in a full restart
- DLRover "Flash Checkpointing"

1. Live Recovery
   1. Activated when failure happens
   2. Quorum detects that some groups are lagging behind
   3. Uses NCCL based send/receive (or is there a faster send and receive? E.g. using a checkpoint server? (?))
   4. "Targeted/


## Advanced Features
- Hooks in the optimizer that changes the optimizer state (lr, etc.) based on the number of groups participating in the collective operation






## Synchronization Points

1. Synchronize  