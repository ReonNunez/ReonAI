from flask import Flask, render_template, request, jsonify 
from markupsafe import escape

import chatbot
import docvqa
import summarizer

app = Flask(__name__)

@app.route("/") 
def index(): 
    return render_template('index.html')  
  
@app.route("/chatbot", methods=['POST', 'GET']) 
def query_view(): 
    if request.method == 'POST': 
        print('step1') 
        prompt = request.form['prompt'] 
        response = chatbot.get_completion(prompt) 
        print(response) 
  
        return jsonify({'response': response}) 
    return render_template('chatbot.html')

@app.route("/docvqa", methods=['POST', 'GET']) 
def answer_view(): 
    if request.method == 'POST': 
        print('step2') 
        prompt = request.form.get('prompt') 
        image = request.files.get('image')
        if image:
            image.save('test1.jpg')
        response = docvqa.get_answer(prompt) 
        print(response) 
  
        return jsonify({'response': response[0]["answer"],
                        'score': response[0]["score"]}) 
    return render_template('docvqa.html')

@app.route("/summarizer", methods=['POST', 'GET']) 
def summary_view(): 
    if request.method == 'POST': 
        print('step3') 
        prompt = request.form.get('prompt') 
        minlength = int(request.form.get('minlength'))
        maxlength = int(request.form.get('maxlength'))
        response = summarizer.get_answer(prompt, minlength, maxlength) 
        print(response) 
  
        return jsonify({'response': response[0]["summary_text"]}) 
    return render_template('summarizer.html')  
  
if __name__ == "__main__": 
    app.run(host='0.0.0.0', port=5000) 
 
