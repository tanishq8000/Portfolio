// EmailJS Configuration
// Keys are loaded from environment variables for security
// See .env.example for the template

export const EMAILJS_CONFIG = {
    SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}

// Instructions to set up EmailJS:
// 1. Copy .env.example to .env
// 2. Go to https://www.emailjs.com/ and create a free account
// 3. Add an email service (Gmail, Outlook, etc.)
// 4. Create an email template with these variables:
//    - {{from_name}} - Sender's name
//    - {{from_email}} - Sender's email
//    - {{message}} - Message content
// 5. Copy your Service ID, Template ID, and Public Key to the .env file
// 6. IMPORTANT: Never commit the .env file to git!
