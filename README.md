# 🚀 Creative Developer Portfolio

A modern, interactive portfolio website featuring stunning 3D graphics, smooth animations, and an immersive user experience. Built with React, Three.js, and cutting-edge web technologies.

🔗 Check out Live : https://portfolio-phi-flax-76.vercel.app/

## ✨ Features

- **3D Interactive Graphics** - Powered by Three.js and React Three Fiber
- **Smooth Animations** - Seamless transitions using Framer Motion and GSAP
- **Responsive Design** - Optimized for all devices and screen sizes
- **Contact Form** - Integrated with EmailJS for direct communication
- **Modern UI/UX** - Clean, premium design with smooth scrolling (Lenis)
- **Fast Performance** - Built with Vite for lightning-fast development and optimized builds
- **Post-Processing Effects** - Advanced visual effects using React Three Postprocessing

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **3D Graphics:** Three.js, React Three Fiber, React Three Drei
- **Animation:** Framer Motion, GSAP
- **Routing:** React Router DOM
- **Smooth Scrolling:** Lenis
- **Email Integration:** EmailJS
- **Build Tool:** Vite
- **Styling:** Custom CSS

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm (comes with Node.js)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file and fill in your EmailJS credentials:

```bash
cp .env.example .env
```

Edit the `.env` file with your actual EmailJS configuration:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

> **Note:** To get your EmailJS credentials, sign up at [EmailJS.com](https://www.emailjs.com/) and create a service and template.

### 4. Run the Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173` (or another port if 5173 is occupied).

## 📦 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally

## 🏗️ Project Structure

```
Portfolio/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable React components
│   ├── config/          # Configuration files (EmailJS, etc.)
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components (Home, About, etc.)
│   ├── styles/          # CSS stylesheets
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Application entry point
├── .env.example         # Example environment variables
├── index.html           # HTML template
├── package.json         # Project dependencies and scripts
└── vite.config.js       # Vite configuration
```

## 🌐 Deployment

This project is optimized for deployment on platforms like:
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

Or connect your GitHub repository to Vercel for automatic deployments.

> **Important:** Remember to add your environment variables (`VITE_EMAILJS_*`) in your deployment platform's settings.

## 🎨 Customization

1. **Content:** Update the content in the `src/pages/` components
2. **Styling:** Modify styles in `src/styles/index.css`
3. **3D Elements:** Customize 3D components in the `src/components/` directory
4. **Colors & Theme:** Update CSS variables in the stylesheet

## 📧 Contact Form Setup

The contact form uses EmailJS. To set it up:

1. Sign up at [EmailJS.com](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Copy your Service ID, Template ID, and Public Key
5. Add them to your `.env` file

## 🔒 Security Notes

- Never commit your `.env` file to version control
- The `.env.example` file is provided as a template
- Make sure `.env` is listed in `.gitignore`

## 🐛 Troubleshooting

### Development server won't start
- Ensure Node.js is installed: `node --version`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

### Contact form not working
- Verify your EmailJS credentials in `.env`
- Check browser console for errors
- Ensure environment variables are prefixed with `VITE_`

### Build errors
- Clear the dist folder: `rm -rf dist`
- Rebuild: `npm run build`

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 👨‍💻 Author

**Tanishq Khandelwal**

---

⭐ If you found this project helpful, please consider giving it a star!
