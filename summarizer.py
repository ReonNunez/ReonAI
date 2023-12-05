from transformers import pipeline

import torch

summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

def get_answer(prompt, minlength, maxlength):
    result = summarizer(prompt, min_length=minlength, max_length=maxlength)
    return result