import threading
from django.core.mail import send_mail
from django.conf import settings


def send_kudos_email(receiver_email, giver_name, message):
    subject = f"You received Kudos from {giver_name} 🎉"
    body = f"{giver_name} says:\n\n{message}"

    def _send():
        try:
            send_mail(
                subject,
                body,
                settings.DEFAULT_FROM_EMAIL,
                [receiver_email],
                fail_silently=False  # You can set this True to suppress all exceptions
            )
        except Exception as e:
            print(f"[EMAIL ERROR] {e}")

    # Run email sending in background thread
    threading.Thread(target=_send).start()
