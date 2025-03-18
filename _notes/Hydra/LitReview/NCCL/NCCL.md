# NCCL

Aim is to understand the following about NCCL:

1. [NCCL Communicator/Initialization](Features/NCCL_comm.md)
2. [NCCL performance tuning](Features/NCCL_performance_tuning.md)
3. [NCCL Configuration Options](Features/NCCL_config.md)
4. [NCCL Streams](Features/NCCL_streams.md)

## NCCL Benefits
- Instead of launching memcpy kernels and reduction kernels separately, NCCL fuses the two kernels.