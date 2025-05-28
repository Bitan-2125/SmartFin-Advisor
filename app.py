from flask import Flask, render_template, request, session, jsonify
from flask_cors import CORS
from langchain_nvidia_ai_endpoints import ChatNVIDIA
from dotenv import load_dotenv
import os
import pathlib
import markdown2

load_dotenv()

# Paths
current_file_path = pathlib.Path(__file__).parent.resolve()
project_root = current_file_path.parent
frontend_path = project_root / "frontend"

# Flask App Setup
app = Flask(__name__, template_folder=frontend_path, static_folder=frontend_path)
CORS(app, resources={r"/*": {"origins": ["http://127.0.0.1:5000", "http://localhost:5000"]}})
app.secret_key = os.getenv('NVIDIA_API_KEY')

# NVIDIA Chat Setup
llm = ChatNVIDIA(
    model="deepseek-ai/deepseek-r1",
    api_key=os.getenv('NVIDIA_API_KEY'),
    temperature=0.6,
    top_p=0.7,
    max_tokens=5000,
)

@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

@app.route("/submit_profile", methods=["POST"])
def submit_profile():
    if "chat_history" not in session:
        session["chat_history"] = []

    age = request.form["age"]
    income = float(request.form["income"])
    expenses = float(request.form["expenses"])
    goal = request.form["goal"]
    risk = request.form["risk"]

    savings = income - expenses

    prompt = f"""
You are SmartFin, an intelligent and friendly AI financial advisor.

Provide concise financial advice  based on the user's profile. Focus on how long it will take to reach the goal and a monthly savings plan. End with: " you can ask followup question."

User Profile:
- Age: {age}
- Monthly Income: ${income}
- Monthly Expenses: ${expenses}
- Monthly Savings: ${savings}
- Financial Goal: {goal}
- Risk Appetite: {risk}
"""

    session["chat_history"] = [{"role": "user", "content": prompt}]

    msg = ""
    for chunk in llm.stream(session["chat_history"]):
        msg += chunk.content

    session["chat_history"].append({"role": "assistant", "content": msg})

    # Convert markdown to HTML for user-friendly output
    html_msg = markdown2.markdown(msg)

    return jsonify({"response": html_msg})

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.form["message"]

    if "chat_history" not in session:
        session["chat_history"] = []

    if user_input == "__check_session__":
        last_msg = session.get("chat_history", [])[-1]["content"] if session.get("chat_history") else "__session_not_found__"
        return jsonify({"response": last_msg})

    session["chat_history"].append({"role": "user", "content": user_input})

    reply = ""
    for chunk in llm.stream(session["chat_history"]):
        reply += chunk.content

    session["chat_history"].append({"role": "assistant", "content": reply})
    # Convert markdown to HTML for user-friendly output
    html_reply = markdown2.markdown(reply)
    return jsonify({"response": html_reply})

@app.route("/reset", methods=["POST"])
def reset():
    session.clear()
    return jsonify({"status": "success"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)