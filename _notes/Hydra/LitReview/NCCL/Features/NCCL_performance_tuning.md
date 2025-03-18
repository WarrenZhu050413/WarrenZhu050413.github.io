[Performance tuning - NCCL performs automatic tuning based on its topology detection to save users’ tuning effort. On some socket-based systems, users may still try tuning NCCL_SOCKET_NTHREADS and NCCL_NSOCKS_PERTHREAD to increase socket network bandwidth. These two environment variables have been pre-tuned by NCCL for some cloud providers, such as AWS or GCP.](https://pytorch.org/docs/stable/distributed.html)





