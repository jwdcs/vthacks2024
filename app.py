import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv, find_dotenv
import os

load_dotenv(find_dotenv())

password = os.environ.get("MONGODB_PWD")

connection_string = f"mongodb+srv://VTHacks:{password}@cluster0.lutbf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(connection_string)
db = client['db1']
collection = db['userdata']  

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

@app.route('/api/test', methods=['GET'])
def test_connection():
    return jsonify(message='Working')

if __name__ == '__main__':
    app.run()
