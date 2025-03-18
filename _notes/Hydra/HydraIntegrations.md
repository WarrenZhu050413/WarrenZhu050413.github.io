[Flight Recorder](https://pytorch.org/tutorials/prototype/flight_recorder_tutorial.html)
- Pytorch 2.5
- Debugging "stuck jobs"
- The collection portion: when enabled, information about collectives is recorded in an in-memory circular buffer. Upon job timeout, or on demand, the in-memory buffer can be retrieved or dumped to file.
- Analyzer Portion: A provided analyzer script runs known heuristics using the collected data and attempts to automatically identify the underlying issue that caused the job to stall






