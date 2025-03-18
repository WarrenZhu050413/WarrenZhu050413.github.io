---
layout: post
title: "Testing Academic Citations in Jekyll"
date: 2023-05-30 14:00:00 -0400
categories: [tutorial, academic]
bibliography: references.bib
---

# Academic Writing with Citations in Jekyll

This post demonstrates how to add academic citations to your Jekyll blog posts. Proper citation is essential for academic writing and helps readers trace the sources of your information.

## Background

Large language models have become increasingly prevalent in various domains. As discussed by Brown et al.  , these models exhibit remarkable few-shot learning capabilities. This has led to significant changes in how we think about task-specific fine-tuning.

## The Scaling Hypothesis

The hypothesis that neural network capabilities improve smoothly with increasing scale has been discussed extensively. Kaplan et al. {% cite kaplan2020scaling %} provided empirical evidence for this through their work on scaling laws, showing that model performance improves as a power-law with model size, dataset size, and compute.

Recent work by Hoffmann et al. {% cite hoffmann2022training %} builds on this foundation, suggesting more optimal compute allocation strategies.

## System Design for Large-Scale Training

Training large-scale models requires specialized distributed systems. The PaLM model {% cite chowdhery2022palm %} represents a significant advancement in this area, utilizing a new system architecture called Pathways.

## Memory Optimization Techniques

One of the challenges in training large models is memory optimization. ZeRO {% cite rajbhandari2020zero %} presents memory optimization techniques that enable efficient distributed training of very large models.

## References

{% bibliography %} 