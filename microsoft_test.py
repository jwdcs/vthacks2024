#Testing OpenAI generated recipes, and storing in a json file

import os
from openai import AzureOpenAI
from dotenv import load_dotenv
import json

# Load environment variables from the .env file
load_dotenv()

endpoint = os.getenv("ENDPOINT_URL", "https://ai-abhayhub114963167881.openai.azure.com/")
deployment = os.getenv("DEPLOYMENT_NAME", "gpt-35-turbo")
subscription_key = os.getenv('MICROSOFT_KEY')

# Initialize Azure OpenAI client with key-based authentication
client = AzureOpenAI(
    azure_endpoint = endpoint,
    api_key = subscription_key,
    api_version = "2024-05-01-preview",
)

completion = client.chat.completions.create(
    model=deployment,
    messages= [
    {
        "role": "system",
        "content": "You are an AI assistant that helps generate food recipes. You will generate at least 5 different recipes based on the given content preferences: cuisine type, allergens, calorie amount, protein amount, and dietary restrictions. The output should contain the recipe name, recipe description, recipe ingredients, as well as recipe instructions."
    },
    {
        "role": "user",
        "content": "French, high protein, medium calories, no peanuts"
    }
],
   #past_messages=10,
    max_tokens=800,
    temperature=0.7,
    top_p=0.95,
    frequency_penalty=0,
    presence_penalty=0,
    stop=None,
    stream=False
)

msg = completion.to_json()

print(msg)

with open("sample.json", "w") as outfile:
    json.dump(completion.to_json(), outfile)
