# Skylark Portfolio

Personal portfolio website built with React + Vite, including a server-side AI chat assistant.

Live site: https://skylarkmagsilang.com

## What Is Included

- Responsive single-page portfolio (hero, about, projects, experience, contact)
- Downloadable CV file served from public assets
- Virtual Skylark chat widget
- Serverless chat API route

## Recent Updates

- Chat backend migrated from Anthropic to Gemini
- Anti-spam added to chat API (rate limit, cooldown, temporary blocking, payload validation)
- Projects section updated with:
  - Google Maps Data Scraper
  - NEU Library Visitor Log
- Experience section updated with TaxFirmSystems (Part-time Web Developer)
- CV file in public assets replaced with latest version

## Tech Stack

- Frontend: React, Vite, CSS
- API route: Node.js serverless function
- AI provider: Google Gemini API
- Icons: Lucide React
- Deployment: Vercel

## Local Setup

1. Clone and install

```bash
git clone https://github.com/5ky-lark/my-portfolio.git
cd my-portfolio
npm install
```

2. Create .env (copy from .env.example)

```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-flash

CHAT_RATE_LIMIT_WINDOW_MS=60000
CHAT_RATE_LIMIT_MAX_REQUESTS=12
CHAT_MIN_INTERVAL_MS=1500
CHAT_BLOCK_DURATION_MS=300000
CHAT_MAX_INPUT_CHARS=1200
CHAT_MAX_HISTORY_MESSAGES=20
```

3. Run development server

```bash
npm run dev
```

4. Build for production

```bash
npm run build
```

## Deployment Notes

- Deploy on Vercel
- Add all .env values in Vercel Project Settings > Environment Variables
- The chat endpoint is served from api/chat.js

## License

MIT © Skylark Magsilang
