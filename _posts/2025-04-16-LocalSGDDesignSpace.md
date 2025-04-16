---
layout: post
title: "LocalSGD Design Space"
date: 2025-04-16 12:00:00 -0400
categories: [distributedsystems, hierarchicalml, distributedml, mlalgorithms]
---

LocalSGD has been an area with a lot of exciting work. Here's my lit review that may be helpful for others!
# 1. Summary Table (o1 Pro)

| **Design Element**                        | **Explanation**                                                                                                                                                                                                                                                                                                     | **Reference**                                                                                                                         |
|-------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| **Aperiodic LocalSGD**                    | Proposes decreasing synchronization frequency over time, rather than using a fixed periodic schedule. Suggests that synchronizing less often as training progresses can improve convergence. Experimentally shows potential benefits, though there has been limited follow-up work.                                                                       | [Aperiodic LocalSGD (2021)](https://dl.acm.org/doi/10.1145/3545008.3545013)                                                           |
| **Periodic LocalSGD**                     | A standard setting where local updates are performed for a fixed number of steps before synchronization. Often used as a baseline and in theoretical analyses of LocalSGD. Periodic synchronization intervals can be tuned (e.g. 1, 2, 4, etc. local steps) to balance communication cost and convergence speed.                          | Various (commonly used in local/parallel SGD literature)                                                                                 |
| **Heterogeneous Period**                  | In practice, workers might have different local-batch sizes or computational speeds, leading to varying local update counts (heterogeneous period). This can require dynamic adjustment of synchronization intervals to handle stragglers or faster workers.                                                              | (Mentioned in [Aperiodic LocalSGD](https://dl.acm.org/doi/10.1145/3545008.3545013) and various heterogeneity-focused works)            |
| **Synchronous LocalSGD (DiLoCo)**         | DiLoCo uses synchronous local steps followed by a global synchronization. Key findings: (1) Outer optimizer with Nesterov Momentum, inner with AdamW. (2) Robust to large numbers of local steps (up to 500) with minimal stability issues. (3) Potentially scales better than standard DDP and allows higher batch sizes.           | [DiLoCo (2023–2025)](https://arxiv.org/abs/2311.08105), [Scaling Laws (placeholder)](https://arxiv.org/pdf/2503.09799?)               |
| **Asynchronous LocalSGD**                 | Builds upon DiLoCo. Workers do local updates asynchronously without waiting for others. Requires handling stale momentum updates (e.g., delaying Nesterov updates until sufficient local steps have been aggregated) and dynamically adjusting steps per worker to maintain similar progress. Can outperform synchronous DiLoCo. | [Asynchronous DiLoCo (2024 Jan)](https://arxiv.org/abs/2401.09135)                                                                 |
| **FedAvg**                                | Classic federated learning algorithm using periodic averaging of local model parameters. Originally proposed for on-device training across many clients. Can be seen as a special case of LocalSGD with possibly large or heterogeneous local update periods.                                                                 | [FedAvg (2016)](https://arxiv.org/pdf/1602.05629)                                                                                     |
| **Muon Optimizer**                        | A scalable optimizer (tested up to 16B MoE models) that approximates the matrix of accumulated gradients via SVD-like updates, controlling RMS norm. Shown to outperform AdamW in certain regimes. Designed primarily for large linear layers.                                                                    | [Muon (2024)](https://arxiv.org/pdf/2502.16982)                                                                                       |
| **PowerSGD**                              | Communicates low-rank approximations of gradients. Uses a random projection (rank-k) to reduce communication overhead. Common approach in communication-efficient distributed SGD.                                                                                                                                 | [PowerSGD (2020)](https://arxiv.org/abs/1905.13727) (originally 2019/2020)                                                             |
| **SkipPipe**                              | A pipeline-parallel method that can skip parts of the pipeline, motivated by LayerSkip. Reorders or omits certain pipeline stages to reduce overhead, especially under heterogeneous network conditions.                                                                                                               | [SkipPipe (2025 Feb)](https://arxiv.org/pdf/2502.19913), [LayerSkip (2024 Oct)](https://arxiv.org/pdf/2404.16710)                    |
| **Data Parallelism (DiLoCo context)**     | DiLoCo uses data-parallel workers that locally compute gradients and periodically synchronize. Shown experimentally to handle long local intervals and large batch sizes better than standard DDP.                                                                                                                  | [DiLoCo (2023–2025)](https://arxiv.org/abs/2311.08105)                                                                                 |
| **Branch-Train-Mix**                      | Trains multiple branches of a model independently (from a shared seed) and later merges them into a single MoE model. Attention layers are averaged, MLP layers become “experts.” A form of ensemble/distillation approach that can leverage specialized training pathways.                                                                               | [Branch-Train-Mix (2024 March)](https://arxiv.org/pdf/2403.07816), [Branch-Train-Merge (2022 Aug)](https://arxiv.org/pdf/2208.03306) |
| **HDEE (Heterogeneous Domain Expert Ens.)** | Adapts more compute to “harder” domains by training domain-specific experts in an ensemble. Larger or more specialized experts are allocated more resources. Improves performance over uniform allocation.                                                                                                           | [HDEE (2025 Feb)](https://arxiv.org/pdf/2502.19385)                                                                                   |
| **Prime-Intellect Ring Optimization**     | A ring-based communication optimization using a prime-based scheduling to reduce contention and overhead in large-scale distributed training. Proposed as a tech report focusing on ring-based all-reduce enhancements.                                                                                             | [Intellect-1 Tech Report (2024 Dec)](https://arxiv.org/pdf/2412.01152v1)                                                              |
| **Decoupled Momentum Optimization**       | Communicates high-frequency (high-energy) gradient components using, e.g., DCT, while locally accumulating and updating low-frequency components. Reduces communication load by focusing on the most significant gradient changes first.                                                                                 | [Decoupled Momentum (2024 Nov)](https://arxiv.org/abs/2411.19870)                                                                     |
| **Top-K SGD and Sketching**               | Classic communication-compression approach that selects the top-K largest gradient components for transmission. Sketch-based approaches maintain approximate gradient information between updates. Significantly reduces bandwidth at the cost of some approximation.                                                                               | [Top-K SGD (2019)](https://arxiv.org/pdf/1911.08772), [Sketching approach (2019)](https://proceedings.neurips.cc/paper/2019/file/75da5036f659fe64b53f3d9b39412967-Paper.pdf) |
| **Overlapping Communication & Computation** | Methods to hide communication overhead by performing gradient synchronization in chunks or asynchronously while local computation continues. Some designs apply partial updates as chunks arrive or blend local and global gradients.                                                                                  | [Communication Overlap 1 (2025?)](https://arxiv.org/pdf/2501.18512), [Communication Overlap 2 (2025?)](https://arxiv.org/pdf/2502.12996) |

*Note:* Many of these works build on or reference each other (e.g., DiLoCo and its asynchronous variant, or Branch-Train-Merge vs. Branch-Train-Mix). The years in parentheses reflect either publication year or the manuscript date provided in the summary. Links may be placeholders for future or preprint references.

----


# 2. Design Space for Local-SGD

## 1. Aperiodic/Periodic/Heterogeneous Period (across devices)

**Aperiodic LocalSGD** (https://dl.acm.org/doi/10.1145/3545008.3545013): Found that in theory the optimal synchronization schedule should not be uniform, but localSGD should synchronize less and less often (though didn't derive any specific formula or decay rate). Shows experimentally that this leads to better convergence.

- Not sure how much to believe this work. Two years ago and there hasn't been much follow up work since around this topic.

## 2. Asynchronous/Synchronous

### 2.1 Synchronous

(2023-2025) DiLoCo (https://arxiv.org/abs/2311.08105), with Scaling Laws (https://arxiv.org/pdf/2503.09799?). 

Three main findings:

- Outer optimizer using Nesterov Momentum and inner optimizer using AdamW is the best
- LocalSGD when tuned correctly resistent to inner step (up to 500). Analysis shows that the gradients converge to similar directions later on in training, which may be why longer inner interations don't impact training stability remarkably little
- DiLoCo type training scales better, may be even better than DDP even when only one DiLoCo replica, also increases the optimal batch size, and the outer learning rate is constant with respect to model size. 

(Note: Slightly skeptical about the result since the claims are strong, and if true, important. But I feel like need more experimental validation and the results are honestly a bit weird. Feels a bit fake.)


### 2.2 Asynchronous Training
Analysis of asynchronous training (2024 Jan) following up from DiloCo (https://arxiv.org/abs/2401.09135). 

Found that 

- Outer optimizer should be Nesterov Momentum, Inner should be AdamW, just like DiLoCo. However, to match the performance of synchronous DiLoCo, need to 
- Delay Nesterov momentum updates by waiting for more samples to come in, updating using the stale momentum term in the mean time, and 
- Dynamically adjust worker steps to ensure that they complete in similar time. If adopt these two, can be even better than DiLoCo.

FedAvg: Classic Algorithm from 2016 (https://arxiv.org/pdf/1602.05629)

## 3. Different Optimizers

### 3.1 For different types of layers

Muon (2024) is shown scalable (https://arxiv.org/pdf/2502.16982) to 16B MoE model with 2x more computational efficiency compared with AdamW in the compute optimal setting, introducing Weight Decay and RMS Norm stabilization.

- The Muon optimizer (https://kellerjordan.github.io/posts/muon/) approximates the $UV$ matrix of the momentum-acculumated gradient computed from SVD $(G = U \Sigma V)$ using Newton-Schultz iteration. This is shown to have better results than the pure gradient, potentially because it manages to control the RMSnorm properly (https://jeremybernste.in/writing/deriving-muon). However, it is specifically designed for linear layers (i.e. Matrix Multiplications).

- PowerSGD communicates two low-rank matrices that, when multiplied together, recovers the averaged gradient projected onto a random low-rank subspace

### 3.2 For different stages of synchronization

See DiLoCO above 

## 4. Pipeline Paralleism vs. Data Parallelism vs. Branch+Mix

### 4.1 Pipeline Parallelism

(2025 Feb) SkipPipe: Partial and Reordered Pipelining Framework for Training LLMs in Heterogeneous Networks (https://arxiv.org/pdf/2502.19913). Trains a model that can skip parts of the pipe, inspired by (2024 Oct) LayerSkip (https://arxiv.org/pdf/2404.16710) which uses this optimization for self-speculative decoding.

### 4.2 Data Parallelism
(2023) DiLoCo (https://arxiv.org/abs/2311.08105)—see above.

### 4.3 Branching
(2024 March) Branch-Train-Mix (https://arxiv.org/pdf/2403.07816): 
1. Start from a shared seed model. 
2. Train multiple models from this seed model on different data without synchronization. 
3. Distill the seprate models into 1 MoE model (average Attention layers, and make the MLP layers experts).
- Related to (2022 Aug) Branch-Train-Merge (https://arxiv.org/pdf/2208.03306) which doesn't use MoE, then ensembled/averaged into a single model.
- Another recent related work: (2025 Feb) HDEE: Heterogeneous Domain Expert Ensemble (https://arxiv.org/pdf/2502.19385). Explores training heterogeneous ensembles by using a larger model/more computing time to "harder" domains (here the difficulty is judged by humans), and found it performs better than uniform compute (sort of obvious(?)).

# Communication Optimizations

## 1. Prime-Intellect Ring Optimization
(2024 Dec) Intellect-1 Tech Report (https://arxiv.org/pdf/2412.01152v1)

## 2. Communication Efficient Optimizers 
- Typically use low-rank structure + error-feedback like methods.
Recent New Optimizers:
(2024 Nov) *"Decoupled Momentum Optimization", from one of the author of Adam (https://arxiv.org/abs/2411.19870)
- (2019) Top-K SGD, older, is in a similar vein (https://arxiv.org/pdf/1911.08772)
- (2019) More efficient Top-K using sketches to maintain the top-K gradients (https://proceedings.neurips.cc/paper/2019/file/75da5036f659fe64b53f3d9b39412967-Paper.pdf)

*Uses DCT to find the highest-energy ("fast-moving") components of the gradient and all-reduce those, whilst locally accumulating the low-energy ("slow-moving") components of the gradient. The low-energy components will eventually be sent out too through accumulation.

## 3. Overlapping Communication and Computation

Communication Savings:

Due to the long communication time and the long computation time between each communication, there are a lot of opportunities for overlapping computation and communication. However, this requires some change in semantics.

There are two approaches, proposed in the papers below:
- Split the gradient synchronization into distinct chunks. Separate the chunks out when communicating, and update as the chunks arrive.
- As we are doing communication, continue computing. Then, update with a convex combination of the globally reduced gradient and the new, locally acquired ones.

https://arxiv.org/pdf/2501.18512?
https://arxiv.org/pdf/2502.12996

