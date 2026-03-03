"""
Email subscription endpoint for Financially Sovereign Academy.
Vercel Serverless Function — accepts POST with email and stores to KV/logs.
"""
import json
import os
from http.server import BaseHTTPRequestHandler
from datetime import datetime, timezone


class handler(BaseHTTPRequestHandler):
    """Handles email subscription requests."""

    def _cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def do_OPTIONS(self):
        self.send_response(200)
        self._cors_headers()
        self.end_headers()

    def do_POST(self):
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)
            data = json.loads(body) if body else {}

            email = data.get("email", "").strip().lower()
            source = data.get("source", "unknown")
            page = data.get("page", "/")

            if not email or "@" not in email or "." not in email.split("@")[-1]:
                self.send_response(400)
                self._cors_headers()
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Invalid email address"}).encode())
                return

            # Log the subscription (visible in Vercel function logs)
            timestamp = datetime.now(timezone.utc).isoformat()
            print(f"[FSA-SUBSCRIBE] email={email} source={source} page={page} time={timestamp}")

            # If RESEND_API_KEY is configured, send a welcome email
            resend_key = os.environ.get("RESEND_API_KEY")
            if resend_key:
                try:
                    import urllib.request
                    req = urllib.request.Request(
                        "https://api.resend.com/emails",
                        data=json.dumps({
                            "from": "FSA <noreply@financiallysovereign.academy>",
                            "to": [email],
                            "subject": "Welcome to Financially Sovereign Academy",
                            "html": (
                                "<h2>You're in! 🎉</h2>"
                                "<p>Thanks for subscribing to Financially Sovereign Academy.</p>"
                                "<p>You'll receive weekly tips on building real financial skills — "
                                "budgeting, investing, debt strategy, and more.</p>"
                                "<p>No fluff. No spam. Just practical money knowledge.</p>"
                                "<br><p>— The FSA Team</p>"
                            ),
                        }).encode(),
                        headers={
                            "Authorization": f"Bearer {resend_key}",
                            "Content-Type": "application/json",
                        },
                    )
                    urllib.request.urlopen(req, timeout=5)
                    print(f"[FSA-SUBSCRIBE] Welcome email sent to {email}")
                except Exception as e:
                    print(f"[FSA-SUBSCRIBE] Welcome email failed: {e}")

            # If KV_REST_API_URL is configured, persist to Vercel KV
            kv_url = os.environ.get("KV_REST_API_URL")
            kv_token = os.environ.get("KV_REST_API_TOKEN")
            if kv_url and kv_token:
                try:
                    import urllib.request
                    kv_key = f"fsa:subscriber:{email}"
                    kv_data = json.dumps({
                        "email": email,
                        "source": source,
                        "page": page,
                        "subscribed_at": timestamp,
                    })
                    req = urllib.request.Request(
                        f"{kv_url}/set/{kv_key}/{kv_data}",
                        headers={"Authorization": f"Bearer {kv_token}"},
                    )
                    urllib.request.urlopen(req, timeout=5)
                    print(f"[FSA-SUBSCRIBE] Stored in KV: {email}")
                except Exception as e:
                    print(f"[FSA-SUBSCRIBE] KV storage failed: {e}")

            self.send_response(200)
            self._cors_headers()
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({
                "success": True,
                "message": "Subscribed successfully",
            }).encode())

        except Exception as e:
            print(f"[FSA-SUBSCRIBE] Error: {e}")
            self.send_response(500)
            self._cors_headers()
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Server error"}).encode())
