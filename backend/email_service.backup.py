import os

import resend
from dotenv import load_dotenv


# ==========================================
# Load Environment
# ==========================================

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

ENV_FILE = os.path.join(
    BASE_DIR,
    ".env"
)

load_dotenv(
    dotenv_path=ENV_FILE,
    override=True
)


# ==========================================
# Resend Configuration
# ==========================================

RESEND_API_KEY = os.getenv(
    "RESEND_API_KEY"
)

SENDER_EMAIL = os.getenv(
    "SMTP_EMAIL"
)


# ==========================================
# Debug
# ==========================================

print("==========================================")
print("Kartik AI Email Service")
print("==========================================")
print("RESEND API KEY SET:", bool(RESEND_API_KEY))
print("SENDER EMAIL:", SENDER_EMAIL)
print("==========================================")


# ==========================================
# Configure Resend
# ==========================================

if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY


# ==========================================
# Generic Email Sender
# ==========================================

def _send_email(
    recipient_email: str,
    subject: str,
    body: str
):

    if not RESEND_API_KEY:
        raise RuntimeError(
            "RESEND_API_KEY is not configured."
        )

    if not SENDER_EMAIL:
        raise RuntimeError(
            "SMTP_EMAIL is not configured."
        )

    resend.Emails.send(
        {
            "from": SENDER_EMAIL,
            "to": [recipient_email],
            "subject": subject,
            "text": body
        }
    )


# ==========================================
# Login OTP Email
# ==========================================

def send_otp_email(
    recipient_email: str,
    otp: str
):

    body = f"""
Hello,

Your Kartik AI login verification code is:

{otp}

This code will expire in 5 minutes.

If you did not attempt to log in,
you can safely ignore this email.

Regards,
Kartik AI
"""

    _send_email(
        recipient_email=recipient_email,
        subject="Your Kartik AI Login Code",
        body=body
    )


# ==========================================
# Password Reset OTP Email
# ==========================================

def send_password_reset_email(
    recipient_email: str,
    otp: str
):

    body = f"""
Hello,

We received a request to reset your Kartik AI password.

Your password reset verification code is:

{otp}

This code will expire in 5 minutes.

If you did not request this,
you can safely ignore this email.

Regards,
Kartik AI
"""

    _send_email(
        recipient_email=recipient_email,
        subject="Kartik AI Password Reset Code",
        body=body
    )