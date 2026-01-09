# Skylark Magsilang's Portfolio

A modern, high-performance portfolio website built with React and Vite, featuring an AI-powered chatbot assistant.

[Live Demo](https://skylarkmagsilang.com)

## 🚀 Features

- **AI Chatbot Assistant**: Integrated "Virtual Skylark" powered by Anthropic's Claude 3 Haiku to answer queries about skills and experience.
- **Modern UI/UX**: Sleek, responsive design with dark/light mode support.
- **Performance**: Optimized for speed (99+ Lighthouse score) using Vite.
- **Interactive Elements**: Animated counters, hover effects, and smooth scrolling.
- **Secure Architecture**: API keys are protected using Vercel Serverless Functions (no client-side exposure).

## 🛠️ Tech Stack

- **Frontend**: React, Vite, CSS Modules
- **AI**: Anthropic Claude 3 API
- **Deployment**: Vercel
- **Icons**: Lucide React
- **Formatting**: Prettier, ESLint

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/5ky-lark/my-portfolio.git
   cd my-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   # Vercel Configuration (Required for Production)
   ANTHROPIC_API_KEY=your_api_key_here

   # Local Development (Optional if using Vercel CLI)
   VITE_ANTHROPIC_API_KEY=your_api_key_here
   ```

4. **Run Locally**
   ```bash
   npm run dev
   ```

## 🚀 Deployment

This project is optimized for deployment on **Vercel**.

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com).
   - Click **Add New Project** and select your repository.
   - **Important**: Add your `ANTHROPIC_API_KEY` in the Environment Variables settings.
   - Click **Deploy**.

The `api/chat.js` file will automatically be deployed as a Serverless Function to handle secure API requests.

## 📄 License

MIT © Skylark Magsilang
