# SmartFin Advisor

SmartFin Advisor is an AI-powered financial planning assistant that provides users with personalized, actionable financial advice based on their profile and goals. The application leverages advanced language models to deliver concise, easy-to-understand plans for achieving financial milestones such as buying a home, saving for retirement, or building an emergency fund.

---

## Features

- **Personalized Financial Planning:** Users input their age, income, expenses, financial goal, and risk appetite to receive a tailored plan.
- **AI-Powered Advice:** Uses NVIDIA's DeepSeek AI model for generating financial advice.
- **Interactive Chat:** Users can ask follow-up questions and receive instant, context-aware responses.
- **Modern UI:** Built with Tailwind CSS for a clean, responsive interface.

---

## Project Structure

```
smartfin-advisor/
│
├── backend/
│   ├── app.py                # Flask backend with API endpoints
│   └── requirements.txt      # Backend dependencies
│
├── frontend/
│   └── index.html            # Main frontend (HTML, Tailwind CSS, JS)
│
├── .venv/ or myenv/          # Python virtual environment (not included in repo)
│
└── docker-compose.yml        # (Optional) For containerized deployment
```

---

## APIs & Libraries Used



- **Flask**: Web framework for building the backend API.
- **Flask-CORS**: Handles Cross-Origin Resource Sharing for frontend-backend communication.
- **langchain_nvidia_ai_endpoints**: Connects to NVIDIA's DeepSeek AI model for generating financial advice.
- **python-dotenv**: Loads environment variables from a `.env` file for secure API key management.
- **markdown2**: Converts markdown-formatted AI responses to HTML for user-friendly display.


## How It Works

1. **User Profile Submission:**  
   The user fills out a form with their age, monthly income, expenses, financial goal, and risk appetite.

2. **AI Analysis:**  
   The backend sends this profile to the DeepSeek AI model via the `langchain_nvidia_ai_endpoints` library. The AI generates a concise, actionable financial plan.

3. **Interactive Chat:**  
   Users can ask follow-up questions in a chat interface. The AI responds contextually, maintaining the conversation history.

4. **User-Friendly Output:**  
   AI responses are converted from markdown to HTML for clean display in the chat window.

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/smartfin-advisor.git
cd smartfin-advisor
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # On Windows
# or
source venv/bin/activate  # On Mac/Linux

pip install -r requirements.txt
```

- Create a `.env` file in the `backend/` directory and add your NVIDIA API key:
  ```
  NVIDIA_API_KEY=your_nvidia_api_key_here
  ```

### 3. Frontend Setup

No build step is required. The frontend is a static HTML file using CDN links for Tailwind CSS and Font Awesome.

### 4. Run the Application

```bash
# In the backend directory
python app.py
```

- Visit `http://localhost:5000` in your browser.

---

## Example Usage

1. Enter your financial details and goal.
2. Receive a personalized plan and timeline.
3. Ask follow-up questions in the chat for more details or clarification.

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- [NVIDIA DeepSeek AI](https://catalog.ngc.nvidia.com/orgs/nvidia/teams/deepseek/models/deepseek-r1)
- [Flask](https://flask.palletsprojects.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Font Awesome](https://fontawesome.com/)

---

