from flask import Flask, jsonify, request
from flask_cors import CORS
import random
import requests
from propelauth_fastapi import init_auth, User
from fastapi import Depends
import openai
import json
import os
from dotenv import load_dotenv

# auth = init_auth("https://45264341.propelauthtest.com", "589e9cd8e93f5c992b0be9aae4b75e968b033bf86f089cdce694a2f4a02bed2740455ce3e6de475ef96ad48b6d6d916d")

# Load environment variables from the .env file
load_dotenv()

# Set your API key from the environment variable
openai.api_key = os.getenv('OPENAI_API_KEY')

app = Flask(__name__)
cors = CORS(app)

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
    "Belgium": "https://restcountries.com/v3.1/name/belgium?fullText=true"
}

preferences = {}


@app.route('/save_preferences', methods=['POST'])
def save_preferences():
    global preferences
    try:
        preferences = request.json
        return jsonify({'status': 'success', 'message': 'Preferences saved successfully'})
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500


@app.route('/preferences', methods=['GET'])
def get_preferences():
    try:
        return jsonify(preferences)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


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
                nationality = data.get('demonyms', {}).get(
                    'eng', {}).get('m', 'Unknown')
                image_url = data.get('flags', {}).get(
                    'png', 'https://via.placeholder.com/140')

                cards.append({
                    'name': country,
                    'nationality': nationality,
                    'imageUrl': image_url
                })
            except (IndexError, KeyError, TypeError):
                return jsonify({'error': f'Unexpected data format for {country}'}), 500

        random.shuffle(cards)

        return jsonify(cards)
    except requests.exceptions.RequestException as e:
        return jsonify({'error': f'Request failed: {str(e)}'}), 500
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500


@app.route("/getRecipes/<prompt>")
def getRecipes(prompt: str) -> None:
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an AI assistant that helps generate food recipes. You will generate at least 5 different recipes based on the given content preferences: cuisine type, allergens, calorie amount, protein amount, and dietary restrictions. The output should be a json object with the recipe name, recipe description, recipe ingredients, as well as recipe instructions."},
                {"role": "user", "content": prompt}
            ]
        )

        # Extract the content of the response
        recipes_content = response['choices'][0]['message']['content']

        # Parse the response content into a JSON object
        recipes_json = json.loads(recipes_content)

        # Save the JSON object to a file (will overwrite if the file exists)
        print(recipes_json)
        return recipes_json
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


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
