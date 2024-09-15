import openai
import json

# Set your API key
openai.api_key = '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'

# Example call to the ChatGPT model
response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are an AI assistant that helps generate food recipes. You will generate at least 5 different recipes based on the given content preferences: cuisine type, allergens, calorie amount, protein amount, and dietary restrictions. The output should be a json object with the recipe name, recipe description, recipe ingredients, as well as recipe instructions."},
        {"role": "user", "content": "Italian, high protein, medium calories, no peanuts"}
    ]
)

# Extract the content of the response
recipes_content = response['choices'][0]['message']['content']

# Parse the response content into a JSON object
recipes_json = json.loads(recipes_content)

# Save the JSON object to a file
with open('recipes.json', 'w') as json_file:
    json.dump(recipes_json, json_file, indent=4)

print("Recipes saved to recipes.json")
