# ReonAI
A Flask powered Web Application showcasing different AI Models from [Hugging Face](https://huggingface.co), in which I have only showcased 3 different AI models and planning to add in the future releases.

## Current AI Models inside the Web App
### Conversational AI Model (DialoGPT ChatBot)
Simple chatbot capable of simple conversations, nothing complicated like ChatGPT3 since DialoGPT is based on GPT2.
### Document Question Answering (LayoutLM)
It focuses on identifying the information in the image and then answers the question fed by the user based on the available information from the given document. It is capable of answering different kinds of documents, including invoices and account information sheets. It can be inaccurate at some times depending on the quality of the image and the prompt fed to the model.
### Text Summarizer (BART)
AI model that can be used to summarize text. You can adjust the maximum and minimum words to output by the model. I advice to put generous amounts of number of words, especially for very large quantity of text to summarize, because sometimes the output text will be cut-offed depending on the maximum amount of words that the user sets. 


