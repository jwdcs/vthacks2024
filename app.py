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
    "Lebanon": "https://restcountries.com/v3.1/name/lebanon?fullText=true",
    "Vietnam": "https://restcountries.com/v3.1/name/vietnam?fullText=true",
    "Argentina": "https://restcountries.com/v3.1/name/argentina?fullText=true",
    "Portugal": "https://restcountries.com/v3.1/name/portugal?fullText=true",
    "Brazil": "https://restcountries.com/v3.1/name/brazil?fullText=true",
    "Morocco": "https://restcountries.com/v3.1/name/morocco?fullText=true",
    "Belgium": "https://restcountries.com/v3.1/name/belgium?fullText=true"
}

@app.route('/start_game', methods=['GET'])
def start_game():
    try:
        cards = []
        for country, url in countries.items():
            response = requests.get(url)
            
            if not response.ok:
                return jsonify({'error': f'Failed to fetch country data for {country}'}), 500
            
            try:
                data = response.json()[0]
                nationality = data.get('demonyms', {}).get('eng', {}).get('m', 'Unknown')
                image_url = data.get('flags', {}).get('png', 'https://via.placeholder.com/140')
                
                cards.append({
                    'name': country,
                    'nationality': nationality,
                    'imageUrl': image_url
                })
            except (IndexError, KeyError, TypeError):
                return jsonify({'error': f'Unexpected data format for {country}'}), 500

        random.shuffle(cards)
        
        return jsonify({'card1': cards[0], 'card2': cards[1]})
    except requests.exceptions.RequestException as e:
        return jsonify({'error': f'Request failed: {str(e)}'}), 500
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500


@app.route('/select_winner', methods=['POST'])
def select_winner():
    data = request.json
    winner = data.get('winner')
    loser = data.get('loser')

    if winner and loser:
        return jsonify({
            'current': {
                'name': winner,
                'flag': ''  
            },
            'losers': [loser]
        })
    return jsonify({'error': 'Invalid input'}), 400

if __name__ == '__main__':
    app.run()
