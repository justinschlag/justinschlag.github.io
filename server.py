# File: server.py

from flask import Flask, request, jsonify
import openai
import os

app = Flask(__name__)

# 🔒 Store your API key securely as an environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")

# Replace this with your real Assistant ID from OpenAI
ASSISTANT_ID = os.getenv("OPENAI_ASSISTANT_ID")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"error": "Missing message"}), 400

    try:
        response = openai.beta.threads.create_and_run(
            assistant_id=ASSISTANT_ID,
            thread={"messages": [{"role": "user", "content": user_message}]},
        )
        thread_id = response.thread_id

        # Wait for completion (simplified; ideally poll status)
        run = openai.beta.threads.runs.retrieve(thread_id=thread_id, run_id=response.id)
        messages = openai.beta.threads.messages.list(thread_id=thread_id)

        last_message = messages.data[0]
        return jsonify({"reply": last_message.content[0].text.value})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
