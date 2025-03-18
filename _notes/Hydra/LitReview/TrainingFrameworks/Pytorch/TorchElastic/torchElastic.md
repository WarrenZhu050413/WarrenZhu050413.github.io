#### TorchRun
https://pytorch.org/tutorials/beginner/ddp_series_fault_tolerance.html#:~:text=In%20distributed%20training%2C%20a%20single,the%20course%20of%20the%20job
"

"When a failure occurs, torchrun logs the errors and attempts to automatically restart all the processes from the last saved “snapshot” of the training job."

Rank and Worldsize passed as environmental variables
![TorchElastic Environmental Variables](./TorchElastic/TorchElastciEnvironmentalVariables.png)

**Terminology**
![TorchElastic Terminology](./TorchElastic/TorchElasticTerminology.png)

**Snapshot**:
1. Model State
2. Number of epochs run
3. Optimizer States
4. Other stateful attributes

1. Rendezvous
2. Store
3. Elastic Agent