---
layout: post
title: "LocalSGD Design Space"
description: "LocalSGD has been an area with a lot of exciting work. As OpenAI's GPT4.5 team recently said, \"semi-synchronous\" training may be how we do a collective million GPU run!"
date: 2025-04-16 12:00:00 -0400
categories: [mlsystems]
---

Note: I am not thinking about MLSystems now. But keeping these posts here for anyone curious.

LocalSGD has been an area with a lot of exciting work. As OpenAI's GPT4.5 team recently [said](https://www.youtube.com/watch?v=6nJZopACRuQ&t=10s&ab_channel=OpenAI), "semi-synchronous" training may be how we do a collective million GPU run! So here's a small lit review that I hope is helpful.

# 1. Design Space for Local-SGD

My notes will be followed by an o3-generated table.

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

- The Muon optimizer (https://kellerjordan.github.io/posts/muon/) approximates the $UV$ matrix of the momentum-acculumated gradient computed from SVD $(G = U \Sigma V)$ using Newton-Schultz iteration. 
- This is shown to have better results than the pure gradient, potentially because it manages to control the RMSnorm properly (https://jeremybernste.in/writing/deriving-muon). However, it is specifically designed for linear layers (i.e. Matrix Multiplications).

- PowerSGD communicates two low-rank matrices that, when multiplied together, recovers the averaged gradient projected onto a random low-rank subspace

### 3.2 For different stages of synchronization

See DiLoCO above 

## 4. Pipeline Paralleism vs. Data Parallelism vs. Branch+Mix

### 4.1 Pipeline Parallelism

(2025 Feb) SkipPipe: Partial and Reordered Pipelining Framework for Training LLMs in Heterogeneous Networks (https://arxiv.org/pdf/2502.19913). Trains a model that can skip parts of the pipe.

Inspired by (2024 Oct) LayerSkip (https://arxiv.org/pdf/2404.16710) which uses this optimization for self-speculative decoding.

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
(2024 Nov) "Decoupled Momentum Optimization", from one of the author of Adam (https://arxiv.org/abs/2411.19870)
- (2019) Top-K SGD, older, is in a similar vein (https://arxiv.org/pdf/1911.08772)
- (2019) More efficient Top-K using sketches to maintain the top-K gradients (https://proceedings.neurips.cc/paper/2019/file/75da5036f659fe64b53f3d9b39412967-Paper.pdf)

-Uses DCT to find the highest-energy ("fast-moving") components of the gradient and all-reduce those, whilst locally accumulating the low-energy ("slow-moving") components of the gradient. The low-energy components will eventually be sent out too through accumulation.

## 3. Overlapping Communication and Computation

Communication Savings:

Due to the long communication time and the long computation time between each communication, there are a lot of opportunities for overlapping computation and communication. However, this requires some change in semantics.

There are two approaches, proposed in the papers below:
- Split the gradient synchronization into distinct chunks. Separate the chunks out when communicating, and update as the chunks arrive.
- As we are doing communication, continue computing. Then, update with a convex combination of the globally reduced gradient and the new, locally acquired ones.

https://arxiv.org/pdf/2501.18512?
https://arxiv.org/pdf/2502.12996

# 2. Local-SGD Table (o3-generated)

| **Design Dimension** | **Variant / Approach** | **Key References (Year)** | **Main Findings / Techniques** | **Comments / Caveats** |
|----------------------|------------------------|---------------------------|--------------------------------|------------------------|
| **Sync‑Period policy** | *Aperiodic* | Bera et al., *ICS* 2022 | Optimal schedule is non‑uniform; sync frequency should decay over time → faster convergence | Little follow‑up work so far |
|                      | *Periodic (fixed k)* | – (baseline LocalSGD lit.) | Uniform local steps; well‑studied baseline for theory & systems | – |
|                      | *Heterogeneous k* | – | Device‑adaptive local step counts | Sparse empirical data |
| **Synchronization style** | *Synchronous* | **DiLoCo** (2023), Scaling‑Law study (2025) | Outer = Nesterov, inner = AdamW; robust to 500 local steps; may out‑scale DDP | Strong claims—needs broader replication |
|                      | *Asynchronous* | Async‑DiLoCo follow‑up (2024) | Delayed Nesterov updates + dynamic step scheduling -> matches / beats sync DiLoCo | Added algorithmic complexity |
|                      | *Federated* | **FedAvg** (2016) | Periodic weighted averaging across heterogeneous clients | Canonical baseline |
| **Optimizer choice** | *Layer‑specific* | **Muon** (2024) | SVD‑based UV update; 2× compute boost on 16 B MoE | Designed for linear layers only |
|                      | *Low‑rank gradient* | **PowerSGD** (2019) | Sends two rank‑r matrices that reconstruct projected gradient | Needs error feedback for bias |
|                      | *Momentum split* | **Decoupled Momentum** (2024) | DCT splits “fast” vs “slow” components; only transmit fast part | Very new, not yet widely tested |
| **Parallelism scheme** | *Pipeline* | **SkipPipe** (2025), **LayerSkip** (2024) | Partial / reordered pipeline, layer skipping for throughput | Targets heterogeneous networks |
|                      | *Data* | DiLoCo (see above) | LocalSGD inside data‑parallel replicas | – |
|                      | *Branch‑Mix* | **Branch‑Train‑Mix** (2024), **Branch‑Train‑Merge** (2022) | Independent branches → distilled / merged (MoE) | Improves sample efficiency |
|                      | *Domain‑weighted* | **HDEE** (2025) | Allocate more compute to “hard” domains; heterogeneous experts | Obvious but effective |
| **Communication optimizations** | *Ring routing* | **Intellect‑1** Tech Rep. (2024‑12) | Prime‑intellect ring for load‑balanced all‑reduce | Hardware‑aware design |
|                      | *Compression* | Top‑K SGD (2019), Sketch‑Top‑K (2019) | Transmit K largest or sketch; accumulate residuals | Classic bandwidth saving |
|                      | *Overlap C‑&‑C* | Zhu & al. (2025‑01), Lee & al. (2025‑02) | Chunked or convex‑comb updates while communicating | Requires semantic changes but hides latency |