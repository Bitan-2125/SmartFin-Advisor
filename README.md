# SmartFin Advisor

SmartFin Advisor is an AI-powered financial planning assistant that provides users with personalized, actionable financial advice based on their profile and goals. The application leverages advanced language models to deliver concise, easy-to-understand plans for achieving financial milestones such as buying a home, saving for retirement, or building an emergency fund.

---

## Features

- **Personalized Financial Planning:** Users input their age, income, expenses, financial goal, and risk appetite to receive a tailored plan.
- **AI-Powered Advice:** Uses NVIDIA's DeepSeek AI model for generating financial advice.
- **Interactive Chat:** Users can ask follow-up questions and receive instant, context-aware responses.
- **Modern UI:** Built with Tailwind CSS for a clean, responsive interface.

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

## DEMO

   ![{6E789F7C-ECE6-4088-B220-C86961CC3BAF}](https://github.com/user-attachments/assets/f85b4e31-b068-4059-8f98-b5e00bd2bf04)
   ![{63B04BE0-5EF1-49C5-A860-DFFFDD5D0C94}](https://github.com/user-attachments/assets/5b4f53f2-75e0-47d3-96d3-88f88b2e453b)
   ![{67A89160-7FDC-4F4F-91C4-CA9E290A8CDA}](https://github.com/user-attachments/assets/913dff2b-5dfe-40f0-b9fe-c7a56560fd34)
   ![{7AA14689-5016-46F3-9D80-BC16686F53CF}](https://github.com/user-attachments/assets/f24ebd5e-2ee5-4e68-a6a3-61d51105feaa)
   ![{B2F46908-3EFF-4CC8-BEC0-8ED9CA5856B2}](https://github.com/user-attachments/assets/bf51ae6e-f082-485f-8ae5-b9124e475e25)
   ![{D9962CBB-8BBC-46C6-A593-BABC3AD0E7BE}](https://github.com/user-attachments/assets/56444245-6e49-49f8-8ac7-f95f1f8a0f8d)







---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/bitan-2125/smartfin-advisor.git
cd smartfin-advisor
```

### 2. Backend Setup

```bash

python -m venv venv
venv\Scripts\activate  # On Windows
# or
source venv/bin/activate  # On Mac/Linux

pip install -r requirements.txt
```

- Create a `.env` file in the main directory and add your NVIDIA API key:
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



## Acknowledgements

- [NVIDIA DeepSeek AI](https://catalog.ngc.nvidia.com/orgs/nvidia/teams/deepseek/models/deepseek-r1)
- [Flask](https://flask.palletsprojects.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Font Awesome](https://fontawesome.com/)

---

