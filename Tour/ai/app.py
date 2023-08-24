from flask import Flask, render_template, request, jsonify
from model import chatbot
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    userText = request.args.get('msg')
    result = chatbot(userText)
    return jsonify({"answer" : result})

if __name__ == "__main__":
    print("Starting Python Flask Server For Chatbot...")
    app.run()