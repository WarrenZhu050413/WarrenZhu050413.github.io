---
layout: page
title: Industry Experience in ML Fault Tolerance
bibliography: industryExperience.bib
---

# Industry Experiences with ML Fault Tolerance

[Alibaba HPN](https://ennanzhai.github.io/pub/sigcomm24-hpn.pdf) [@AlibabaHPN]

- Periodic, bursty flows
  - Cannot rely on randomized algorithms (e.g. ECMP) to distribute load
- Two-tier, dual-plane architecture
- ["our customers choose to generate a checkpoint only every few hours... overhead introduced by checkpointing is still around 5%)"](../checkpointing.md)
- Stacked Dual-ToR leads to vulnerabilities from "Stack Failure", version incompability from upgrading
- ["Over 40% of critical failures in our traditional data centers were caused by the abovementioned two categories of issues introduced by stacked dual-ToR in the past three years"](../faultTypes.md)
- 5.2: Rail-Optimized Network (@NVIDIADGXSuperPOD)[https://docs.nvidia.com/https:/docs.nvidia.com/dgx-superpod-reference-architecture-dgx-h100.pdf]

[C4](https://arxiv.org/pdf/2406.04594v1) [@C4dong2024]


# References

***