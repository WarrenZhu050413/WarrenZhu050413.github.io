---
layout: post
title: "Formatting Your Syllabus in Another Way"
description: "Most course reading schedules are broken. They have two pieces of information: the week + the reading of that week."
date: 2025-09-05 14:06:54 +0800
categories: [ai-tricks]
---

# Formatting Your Syllabus in Another Way

Most course reading schedules are broken. (Note: The following is a fictional syllabus for an LLM course used as an example.)

They have two pieces of information:

---

## 1. The week + the reading of that week:

### WEEK 2
8 September 2025 (Mon): Introduction to Large Language Models
Required Readings:

    Jurafsky & Martin, Chapter 10: "Sequence Processing with RNNs" (pp. 187-210)
    Goodfellow et al., Chapter 10: "Sequence Modeling" (pp. 367-415)

Module:

    "Foundations of Sequential Models"

FIRST SECTION: 10/11 September 2025 (Wed/Thurs) Section: How Do LLMs Learn?
Required Readings:

    Jurafsky & Martin, Chapter 11: "Transformers and Pre-trained Language Models" (pp. 211-245)
    Russell & Norvig, Chapter 23.1-23.3: "Natural Language Processing" (pp. 823-847)

---

....

---

## 2. The Required Text


    Jurafsky & Martin. Speech and Language Processing, 3rd ed. (Draft chapters online, 2024)
    Goodfellow, Bengio, and Courville. Deep Learning. MIT Press, 2016. Chapters 10-12.
    Russell & Norvig. Artificial Intelligence: A Modern Approach, 4th ed. Pearson, 2021. (Selected chapters on NLP)
    OpenAI Technical Reports Collection. Available online. Referred to as "OpenAI Papers" in schedule.
    Anthropic Research Papers. Constitutional AI and RLHF papers. (Course packet on Canvas)

---

## The Problem

See the problem? It is actually quite difficult to understand how we are traversing through each required text across time in the course :(. 

This is helpful for us to get a sense of a) how much of each book we are actually reading (and so whether we should buy them), b) the trajectory of the course, and c) To know which part of the book we should continue reading when we have a spare weekend.

It is quite easy for LLMs to format this for you, though it took a few iteration of prompts for me to understand what I wanted:

---

## Prompt:

```
@test.md

May you please reformat the readings so that we have a table of the reading sources 
that I am to consult on the left, and the portions of it that we have to read on the right. Use markdown and pandoc.

For each reading source, I want you to list out all the weeks in which we have to read that reading source. Order this in chronological order. The portions should be arranged in chronological order. Make sure each week's readings is on a separate line for the optimal viewing experience.

You should first identify the left hand side of the table. Then go through it week by week and put the reading sources to the right reading sources for the optimal result.

At the end, launch a subagent to double check your results, and make sure that it is visually appealing and easy to scan.Launch these subagents until it returns that everything is correct.

Write things into test.pdf and open it for me to see.
``` 

> Note the few important parts of this prompt:
>
> 1. Specifying clearly how you want the final table to be presented (in markdown, what the left hand side and the right hand side are). I found that if we are not precise, the LLM typically goes back to presentation style 1, albeit a better formatted version.
>
> 2. Telling it to present the information in a visually appealing way (on separate lines). It is common sense for us, but I found that LLMs (at least Claude) often complete its job without making it easy to scan.
>
> 3. Making sure that it launches a verification sub-agent continuously until no problem is found-—this is super important to make sure that nothing is lost in the reformatting. (From my testing, it typically takes 1 extra check to get it right.)
>
> 4. However... even when explicitly telling it to put each week on a separate line, the LLM often just does not do it until you ask it again :(
>
> 5. Let it open the pdf after finishing makes it easier to verify their output.
>
---

## Result:

### Reading Sources Table

| Reading Source | Portions by Week |
|----------------|------------------|
| **Jurafsky & Martin:** *Speech and Language Processing* | **Week 2:** Chapter 10 (pp. 187-210)<br>**Week 2 Section:** Chapter 11 (pp. 211-245)<br>**Week 3:** Chapter 11.4-11.6 (pp. 246-268)<br>**Week 4:** Chapter 12 (pp. 269-295)<br>**Week 4:** Chapter 13 (pp. 296-320)<br>**Week 5:** Chapter 14 (pp. 321-345)<br>**Week 5:** Chapter 15 (pp. 346-378) |
| **Goodfellow, Bengio, and Courville:** *Deep Learning* | **Week 2:** Chapter 10 (pp. 367-415)<br>**Week 3:** Chapter 11 (pp. 416-435)<br>**Week 3:** Chapter 12.1-12.3 (pp. 436-462)<br>**Week 4:** Chapter 12.4-12.5 (pp. 463-487)<br>**Week 5:** Chapter 12.6 (pp. 488-510) |
| **Russell & Norvig:** *Artificial Intelligence: A Modern Approach* | **Week 2 Section:** Chapter 23.1-23.3 (pp. 823-847)<br>**Week 3:** Chapter 23.4-23.6 (pp. 848-875)<br>**Week 4:** Chapter 24.1-24.3 (pp. 876-901)<br>**Week 5:** Chapter 24.4-24.6 (pp. 902-925) |

