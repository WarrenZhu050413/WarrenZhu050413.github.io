---
layout: post
title: "Homo Faber"
description: "Hannah Arendt called us Homo Faber. We are tool-makers and tool-users. For me, the promise of current generation AI is the arrival of a new category of intelligent meta-tools"
date: 2025-09-22 09:59:34 -0400
categories: [hci]
---

# Homo Faber: Or. What I want to do.

Hannah Arendt called us Homo Faber. We are tool-makers and tool-users. For me, the promise of current generation "AI" is the arrival of a new category of intelligent "meta-tools" that lowers the barriers of tool creation through [dynamic grounding](https://arxiv.org/abs/2402.07342)—these tools communicate with us in the medium we are most comfortable in. LLMs, for example, are tools that take in natural language specifications to output tools (specialized agents) that can achieve sets of tasks.

I want to create tools that make these meta-tools easier to use. Why? This makes building tools for everyday tasks possible. It enables a world where we can all build tools tailored to our needs. The distinction between tool-makers and tool-users dissolve. We become both consumers and creaters. We have "From each according to their creativity, to each according to their need." The means of production becomes the means of creation.

## How to get there?

The last major innovation on the meta-tool front was the computer. The Von-Neumann architecture decouples program from execution. Because of it, a computer can run any program. Still, it took us a few decades to build the suite of tools that help us use computers. Now, we call this an "IDE" (Integrated Development Environment).

What is the IDE for AI-meta-tools?

When tool creation becomes easy in any language or expression, we'll need tools to specify intents, elicit thoughts, and debug specifications. An "ITE" (Integrated Thinking Environment) would tackle the human task of thinking.

To be more concrete, I think about three components of working with AI-based meta-tools:

```
Specification
         |
         | (creates the tool)
         ↓
Input -(tool)-> Output
```

What are some things that we can do?

## Tool Specifications: Building Tools to Specify and Clarify Intent

With a meta-tool that can turn our intentions into reality, we are bottlenecked by our ability to specify what we want. We need ["specification compilers"](https://arxiv.org/abs/2504.09283) and "sanitizers" to debug inconsistencies or ambiguities. We need conversational tools to clarify intent. And we need more powerful primitives to program specifications. For example, we could build tools for [creating](https://github.com/WarrenZhu050413/PromptTemplates/blob/main/global%3A%3Aworkflow%3A%3Aadd-command.md) and [modifying](https://github.com/WarrenZhu050413/PromptTemplates/blob/main/global%3A%3Autility%3A%3Amodify-command.md) prompts. We need custom [writing](https://github.com/WarrenZhu050413/PromptTemplates/blob/main/writing.md) environments that help us debug and enhance our writing. We should be able to [compose prompt templates](https://github.com/anthropics/claude-code/issues/688#issuecomment-3159721526) to make specifications more programmable.

## Tool Input: Management and Observability

Current models are pure functions where input determines output. Therefore, we need to a) make it easier to compose relevant inputs by integrating information from diverse sources, and have b) observability into what the inputs are.

For a), we need to more control over our context. Segments of conversations with models should be natively referenceable. An agent's context should be a powerful data structure (compact, merge, transfer...). And our [personal knowledge base](https://github.com/WarrenZhu050413/PromptTemplates/blob/main/notes.md) should be managed by powerful tools.

For b), we need diagnostic tests that discover when agents are overwhelmed with input, a basic sense of what inputs were important to an agent's performance through, e.g., ablation tests or attention maps, and utilities to visualize the different sources of information an agent is relying on.

## Tool Output: Examining and Experiencing Results

With the abundance of tools, we need to innovate on how the output of tools is presented to us. We could build a future where we can examine outputs analytically and experience them intuitively.

For examination, we could view outputs at different resolutions (one-sentence summary → paragraph → full detail), sample multiple responses in parallel with slight perturbations to understand the idea distribution (e.g., [AlphaEvolve-style evolutions](https://github.com/WarrenZhu050413/openevolve-writing)), and trace reasoning paths beyond final outputs.

For experience, we could explore adaptive interfaces beyond text: direct rendering as interactive HTML, data visualizations, PowerPoints, videos, movies, games, music, or, most excitingly, the combination of them for the maximum transmission of insight.

