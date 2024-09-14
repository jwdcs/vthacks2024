from pymongo import MongoClient
from dotenv import load_dotenv, find_dotenv
import os

load_dotenv(find_dotenv())

password = os.environ.get("MONGODB_PWD")

connection_string = f"mongodb+srv://VTHacks:{password}@cluster0.lutbf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(connection_string)
db = client['db1']
collection = db['userdata']

def insert_userdata_doc():
    test_doc = {
        "name": "Bob",
        "type": "test"
    }
    inserted_id = collection.insert_one(test_doc).inserted_id
    print(f"Inserted document ID: {inserted_id}")

if __name__ == "__main__":
    insert_userdata_doc()
