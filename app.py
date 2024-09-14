from flask import Flask, jsonify, request
from flask_cors import CORS
import random
import requests

app = Flask(__name__)
CORS(app)

countries = {
    "Italy": "https://restcountries.com/v3.1/name/italy?fullText=true",
    "France": "https://restcountries.com/v3.1/name/france?fullText=true",
    "Japan": "https://restcountries.com/v3.1/name/japan?fullText=true",
    "Spain": "https://restcountries.com/v3.1/name/spain?fullText=true",
    "Mexico": "https://restcountries.com/v3.1/name/mexico?fullText=true",
    "Thailand": "https://restcountries.com/v3.1/name/thailand?fullText=true",
    "India": "https://restcountries.com/v3.1/name/india?fullText=true",
    "Greece": "https://restcountries.com/v3.1/name/greece?fullText=true",
    "Turkey": "https://restcountries.com/v3.1/name/turkey?fullText=true",
    "Peru": "https://restcountries.com/v3.1/name/peru?fullText=true",
    "China": "https://restcountries.com/v3.1/name/china?fullText=true",
    "South Korea": "https://restcountries.com/v3.1/name/south-korea?fullText=true",
    "Lebanon": "https://restcountries.com/v3.1/name/lebanon?fullText=true",
    "Vietnam": "https://restcountries.com/v3.1/name/vietnam?fullText=true",
    "Argentina": "https://restcountries.com/v3.1/name/argentina?fullText=true",
    "Portugal": "https://restcountries.com/v3.1/name/portugal?fullText=true",
    "Brazil": "https://restcountries.com/v3.1/name/brazil?fullText=true",
    "South Africa": "https://restcountries.com/v3.1/name/south-africa?fullText=true",
    "Morocco": "https://restcountries.com/v3.1/name/morocco?fullText=true",
    "Belgium": "https://restcountries.com/v3.1/name/belgium?fullText=true"
}

@app.route('/start_game', methods=['GET'])
def start_game():
    try:
        card1, card2 = random.sample(list(countries.keys()), 2)
        response1 = requests.get(countries[card1])
        response2 = requests.get(countries[card2])
        
        if not response1.ok or not response2.ok:
            return jsonify({'error': 'Failed to fetch country data'}), 500
        
        data1 = response1.json()[0]
        data2 = response2.json()[0]
        
        nationality1 = data1['demonyms']['eng']['m'] 
        nationality2 = data2['demonyms']['eng']['m']  
        
        return jsonify({
            'card1': {
                'name': card1,
                'nationality': nationality1,
                'imageUrl': data1['flags']['png']  
            },
            'card2': {
                'name': card2,
                'nationality': nationality2,
                'imageUrl': data2['flags']['png'] 
            }
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/select_winner', methods=['POST'])
def select_winner():
    data = request.json
    winner = data.get('winner')
    loser = data.get('loser')

    if winner and loser:
        return jsonify({
            'current': {
                'name': winner,
                'flag': country_flags.get(winner, '')
            },
            'losers': [loser]
        })
    return jsonify({'error': 'Invalid input'}), 400
