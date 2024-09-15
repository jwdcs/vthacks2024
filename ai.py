import openai
import json
from dotenv import load_dotenv
import os

# Load environment variables from the .env file
load_dotenv()

# Set your API key from the environment variable
openai.api_key = os.getenv('OPENAI_API_KEY')

# Example call to the ChatGPT model
try:
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an AI assistant that helps generate food recipes. You will generate at least 5 different recipes based on the given content preferences: cuisine type, allergens, calorie amount, protein amount, and dietary restrictions. The output should be a json object with the recipe name, recipe description, recipe ingredients, as well as recipe instructions."},
            {"role": "user", "content": "French, high protein, medium calories, no peanuts"}
        ]
    )

    # Extract the content of the response
    recipes_content = response['choices'][0]['message']['content']

    # Parse the response content into a JSON object
    recipes_json = json.loads(recipes_content)

    # Save the JSON object to a file (will overwrite if the file exists)
    with open('recipes.json', 'w') as json_file:
        json.dump(recipes_json, json_file, indent=4)

    print("Recipes saved to recipes.json")

except openai.error.OpenAIError as e:
    print(f"An error occurred: {e}")
except json.JSONDecodeError as e:
    print(f"Error decoding JSON: {e}")
except Exception as e:
    print(f"An unexpected error occurred: {e}")
