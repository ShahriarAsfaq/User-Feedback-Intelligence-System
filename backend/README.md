# Backend Setup

This service handles incoming feedback, analyzes it using an LLM, stores it in MongoDB, and now sends notification emails when feedback is submitted.

## Environment Variables
Copy `.env.example` to `.env` and populate the following values:

```env
PORT=5000
MONGO_URI=mongodb://...
GEMINI_API_KEY=...

# mail configuration (required for email notifications)
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_SECURE=false   # true for port 465, otherwise false
MAIL_USER=user@example.com
MAIL_PASS=supersecret
```

Make sure `.env` is included in `.gitignore` (already is).

## Additional Notes
- Feedback creation calls the LLM and then sends a notification email to the address provided on submission.
- Check logs if the email fails; errors are caught and printed but do not prevent feedback from being stored.

### Dependencies
The project uses `nodemailer` for sending mail.  If you want type support while developing in TypeScript, add the types:

```bash
npm install --save-dev @types/nodemailer
```

(or ignore the import as the code currently does with a `// @ts-ignore` comment)
