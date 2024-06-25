from flask import Flask, request, jsonify, render_template
import spacy
import wikipediaapi
import time

app = Flask(__name__)

print("Loading spaCy model...")
start_time = time.time()
nlp = spacy.load("en_core_web_sm")
print(f"spaCy model loaded in {time.time() - start_time:.2f} seconds.")

# Specify user agent for Wikipedia API
print("Initializing Wikipedia API...")
wiki_wiki = wikipediaapi.Wikipedia(
    language='en',
    extract_format=wikipediaapi.ExtractFormat.WIKI,
    user_agent='MyBot/1.0 (https://yourwebsite.com/contact)'
)
print("Wikipedia API initialized.")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get("message")
    bot_response = generate_bot_response(user_message)
    return jsonify({"bot_message": bot_response}), 200

def generate_bot_response(user_message):
    doc = nlp(user_message.lower())
    if any(token.text in ["hello", "hi"] for token in doc):
        return "Hey! Ambic here."
    elif any(token.text in ["how", "are", "you"] for token in doc):
        return "I'm a bot, so I don't have feelings, but I'm here to help!"
    elif any(token.text in ["who", "what"] for token in doc):
        return fetch_wikipedia_summary(user_message)
    else:
        return "This is a mock response. I'm still learning!"

def fetch_wikipedia_summary(query):
    doc = nlp(query.lower())
    query_text = " ".join([token.text for token in doc if token.text not in ["who", "is", "what"]])
    page = wiki_wiki.page(query_text)
    if page.exists():
        return page.summary[0:100] + "..."  # Limit the summary length
    else:
        return "Sorry, I couldn't find any information on that."

if __name__ == '__main__':
    app.run(debug=True)
