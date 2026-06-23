# Suprith M M - Futuristic Personal Portfolio

A premium, futuristic, and highly interactive personal portfolio website for **Suprith M M**, built with **Python (FastAPI)** and featuring advanced **CSS Glassmorphism** & **GSAP scroll animations**. 

Designed with a sleek dark-mode startup aesthetic, this portfolio showcases technical expertise, projects, education timeline, notable achievements, and incorporates a live contact form with integrated SMTP email alerts.

---

## 🚀 Key Features

* **Futuristic Startup Theme:** Deep black background with electric blue (#00f0ff) and neon purple (#bc13fe) highlights.
* **Premium Glassmorphism:** Translucent card container designs with responsive hover effects and micro-interactions.
* **Advanced Animations:** Scroll-triggered element reveals powered by **GSAP (GreenSock)** and dynamic word typing in the hero section via **Typed.js**.
* **Animated Particle Background:** Interactive floating particles canvas rendering in the background.
* **No-Text Skills Cloud:** Minimalist tech stack showcase using high-quality logo symbols (Devicon & Boxicons) with hover tooltips.
* **Work Experience PDF Integration:** Directly links to WCAP verification documents when clicking the timeline title or detail buttons.
* **Contact Form SMTP Integration:** Submit messages asynchronously (AJAX) which triggers a secure email alert straight to your inbox.

---

## 🛠️ Tech Stack

* **Backend:** Python, FastAPI, Jinja2 (HTML Templates), Uvicorn
* **Frontend:** HTML5, Vanilla CSS3 (Custom properties), JavaScript (ES6+)
* **Animation & UI Libraries:** GSAP (ScrollTrigger), Typed.js, Boxicons, Devicon

---

## 📁 Directory Structure

```text
├── main.py                # FastAPI Application and SMTP route
├── requirements.txt       # Python Dependencies
├── .env.example           # Reference for Environment variables
├── templates/
│   └── index.html         # Main page template
└── static/
    ├── css/
    │   └── style.css      # Core Design System, Themes & Layouts
    └── js/
        └── main.js        # Dynamic features, particle effects & GSAP animations
```

---

## ⚙️ Local Setup Instructions

Follow these steps to configure and run the portfolio locally on your machine:

### 1. Clone the repository & Navigate inside
Open your terminal (PowerShell or Command Prompt) in the project folder:
```powershell
cd C:\Users\supre\mine
```

### 2. Set Up a Virtual Environment (Recommended)
Create and activate a virtual environment to isolate dependencies:
* **Create:**
  ```powershell
  python -m venv venv
  ```
* **Activate (PowerShell):**
  ```powershell
  .\venv\Scripts\Activate.ps1
  ```
* **Activate (Command Prompt):**
  ```cmd
  .\venv\Scripts\activate.bat
  ```

### 3. Install Dependencies
Install the required Python packages (FastAPI, Uvicorn, Python-dotenv, Jinja2):
```bash
pip install -r requirements.txt
```

### 4. Configure Email Notifications
Duplicate the template configuration file:
* Copy `.env.example` and name the new file `.env`
* Fill in your email information:
  ```ini
  SMTP_SERVER=smtp.gmail.com
  SMTP_PORT=587
  SENDER_EMAIL=supreethm763@gmail.com
  EMAIL_PASSWORD=your-gmail-16-digit-app-password
  RECEIVER_EMAIL=supreethm763@gmail.com
  ```
  > 💡 **Note:** `EMAIL_PASSWORD` requires a 16-character Google App Password (not your standard login password). Obtain it from **Google Account -> Security -> 2-Step Verification -> App Passwords**.

### 5. Run the Server
Launch the development server:
```bash
uvicorn main:app --reload
```
Open your browser and navigate to: **`http://127.0.0.1:8000`**

---

## 📝 Customization Guide

* **Profile Pictures:** The website uses your avatar URL from the `templates/index.html` file (lines 58 and 66). You can modify these URLs to swap your photo.
* **Resume PDF Link:** Modify the href tag on line 52 inside `templates/index.html` to update your resume location.
* **Work Experience Verification Link:** Update the verification link on line 125 and line 138 of `templates/index.html` to direct to your new certificates.
