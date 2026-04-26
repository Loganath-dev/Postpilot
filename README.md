# PostPilot — AI-Powered Social Media Content Engine

**PostPilot** is a SaaS platform that transforms raw ideas, screenshots, and messy notes into high-performing, platform-native social media content. Built for founders, creators, and marketers who need to post consistently across LinkedIn, X (Twitter), and Reddit — without sounding like a robot.

Unlike generic AI writing tools, PostPilot uses **Writing DNA™** technology to clone your unique voice from past posts, and a specialized **Reddit Anti-AI Engine** that generates human-native posts designed to bypass AI detection and blend into any subreddit's culture. The platform also includes a **Tweet-to-Image** tool that converts any X post URL into a premium, downloadable image card with custom backgrounds and gradients.

PostPilot runs on a token-based pricing model: **Free (100 tokens)**, **Starter (2,000 tokens/mo)**, and **Pro (5,000 tokens/mo)** with overage available at $4/1,000 tokens. Pro users get access to the advanced **Gemini 2.0 Flash** AI model for superior content quality.

---

## Features

- **Content Generator** — Paste any raw thought and get optimized LinkedIn posts, X tweets, and viral threads in one click
- **Writing DNA™** — Upload past posts or describe your style; the AI clones your exact voice, pacing, and vocabulary
- **Reddit Anti-AI Engine** — Generates Reddit posts that read like a real human typed them, with subreddit-specific cultural adaptation
- **Tweet-to-Image** — Convert any X/Twitter URL into a beautiful, shareable image card with custom backgrounds
- **Multi-Tone System** — Switch between Natural, Influencer, CEO, Storyteller, and Academic personas
- **Photo/Screenshot Input** — Upload images and the AI extracts content to transform into social posts
- **Tiered AI Models** — Free users get Gemini 2.0 Flash Lite; Pro users unlock Gemini 2.0 Flash for deeper intelligence

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Auth & Database**: Supabase
- **AI**: Google Gemini API (2.0 Flash / 2.0 Flash Lite)
- **Email**: Resend
- **Styling**: Vanilla CSS Modules

## Getting Started

```bash
# Install dependencies
npm install

# Create .env.local with your keys
# GEMINI_API_KEY=your_key
# NEXT_PUBLIC_SUPABASE_URL=your_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
# RESEND_API_KEY=your_key

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Pricing

| Plan | Tokens | Price | Overage |
|------|--------|-------|---------|
| Free | 100 (one-time) | $0 | — |
| Starter | 2,000/mo | $11.99/mo | $4 / 1,000 tokens |
| Pro | 5,000/mo | $29/mo | $4 / 1,000 tokens |

## License

Proprietary. All rights reserved.
