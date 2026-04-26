export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: 1,
    question: "What is PostPilot and how does it work?",
    answer: "PostPilot is the elite social media ghostwriter for founders. It turns photos, screenshots, tweets, and raw ideas into polished LinkedIn posts, X threads, and now human-like Reddit posts. Simply upload your input — a photo, a screenshot, a tweet URL, or a rough thought — and PostPilot generates platform-ready content that sounds like YOU, not a robot."
  },
  {
    id: 2,
    question: "How does the Reddit Anti-AI generator work?",
    answer: "Reddit moderators are strict about AI-generated content. Our Reddit Engine uses specialized 'Behavioral Analysis' prompts that mimic the specific slang, formatting quirks, and conversational uncertainty of real Redditors. It avoids the 'perfect' structure of standard AI to ensure your posts blend in and spark genuine discussion in any community."
  },
  {
    id: 3,
    question: "What is \"Style Training\" (Writing DNA™)?",
    answer: "Style Training is our core differentiator. You can provide 5–10 of your past posts, OR provide direct instructions on exactly what your style is and how you want your content structured. Our AI builds a personal Writing DNA™ profile based on your inputs. Every post generated after that is personalized — so the output reads like you wrote it yourself, just with more punch."
  },
  {
    id: 4,
    question: "What is the URL-to-Image feature?",
    answer: "Turn any X (Twitter) URL into a beautiful, shareable image card in seconds. It’s perfect for cross-posting your best tweets to LinkedIn or Instagram without a ugly screenshot. It extracts the content and wraps it in a premium design automatically."
  },
  {
    id: 5,
    question: "How do Tokens work?",
    answer: "PostPilot uses a simple token system. Every action costs tokens — text generation costs 10 tokens, image generation costs 50 tokens. Free users get 100 tokens to try everything. Starter plans include 2,000 tokens/month, and Pro plans include 5,000 tokens/month. If you run out on a paid plan, you can purchase additional tokens at $4 per 1,000."
  },
  {
    id: 6,
    question: "Can I upload photos or screenshots as input?",
    answer: "Yes! PostPilot is multimodal. You can click the '+' icon in the generator to upload selfies, event photos, or even screenshots of interesting tweets or articles. The AI 'sees' the image, extracts the context, and turns it into a high-conversion social post."
  },
  {
    id: 7,
    question: "What are the Pricing Plans?",
    answer: "Free ($0): 100 tokens with all tools unlocked — no account required. Starter ($11.99/mo): 2,000 tokens/month, 1 Writing DNA profile, all platforms. Pro ($29/mo): 5,000 tokens/month, unlimited DNA profiles, advanced Gemini 2.0 Flash AI model, and priority support. Both Starter and Pro plans can purchase extra tokens at $4 per 1,000 if they exceed their monthly limit."
  },
  {
    id: 8,
    question: "Is my data safe and private?",
    answer: "Absolutely. PostPilot is fully compliant with India's Digital Personal Data Protection Act 2023 (DPDP Act) and the IT Act 2000. Your uploaded content and Writing DNA™ profiles are encrypted, stored securely, and never shared with or sold to third parties."
  },
  {
    id: 9,
    question: "Does PostPilot work for non-English content?",
    answer: "PostPilot is currently optimized for English to ensure the highest quality style matching. Support for multi-language personalizations is coming in version 1.2."
  },
  {
    id: 10,
    question: "I have a specific question, how can I reach you?",
    answer: "We are here to help! You can reach out to our team anytime at smartonboardai@gmail.com for support, feature requests, or billing inquiries."
  }
];
