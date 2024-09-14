from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

@app.route('/api/test', methods=['GET'])
def test_connection():
    return jsonify(message='Working')

if __name__ == '__main__':
    app.run()