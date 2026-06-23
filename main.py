import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import load_dotenv
from fastapi import FastAPI, Form, Request, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel

# Load environment variables
load_dotenv()

app = FastAPI(title="Suprith M M - Portfolio")

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Templates setup
templates = Jinja2Templates(directory="templates")

class ContactForm(BaseModel):
    name: str
    email: str
    message: str

def send_email_notification(name: str, sender_email: str, message_content: str):
    smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    sender_user = os.getenv("SENDER_EMAIL")
    sender_password = os.getenv("EMAIL_PASSWORD")
    receiver_email = os.getenv("RECEIVER_EMAIL", "supreethm763@gmail.com")

    # If credentials are not set, log and skip sending
    if not sender_user or not sender_password:
        print("[WARNING] Email credentials not configured. Skipping email send.")
        return False

    try:
        # Create message container
        msg = MIMEMultipart()
        msg['From'] = f"Portfolio Contact Form <{sender_user}>"
        msg['To'] = receiver_email
        msg['Subject'] = f"New Portfolio Message from {name}"

        # Design a clean HTML email body
        html_body = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #00f0ff;">New Portfolio Submission</h2>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {sender_email}</p>
                <p><strong>Message:</strong></p>
                <div style="background: #f4f4f4; padding: 15px; border-left: 4px solid #bc13fe; margin-top: 10px;">
                    {message_content.replace(chr(10), '<br>')}
                </div>
            </body>
        </html>
        """
        msg.attach(MIMEText(html_body, 'html'))

        # Set up SMTP connection
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()  # Upgrade connection to secure TLS
        server.login(sender_user, sender_password)
        server.sendmail(sender_user, receiver_email, msg.as_string())
        server.quit()
        print(f"[SUCCESS] Email sent successfully to {receiver_email}")
        return True
    except Exception as e:
        print(f"[ERROR] Failed to send email notification: {str(e)}")
        return False

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse(
        request=request, name="index.html"
    )

@app.post("/api/contact")
async def contact_form(contact: ContactForm):
    # Print submission in terminal logs
    print(f"Received message from {contact.name} ({contact.email}): {contact.message}")
    
    # Try sending email notification
    email_sent = send_email_notification(contact.name, contact.email, contact.message)
    
    # Return success response
    return {"message": "Message sent successfully!"}
