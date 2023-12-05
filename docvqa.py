from transformers import pipeline
from PIL import Image

document_qa = pipeline(model="impira/layoutlm-document-qa")

def get_answer(prompt):
    image = Image.open("test1.jpg")
    result = document_qa(
    image=image,
    question=prompt,
)
    return result