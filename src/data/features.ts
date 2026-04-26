export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  tier: 'core' | 'supporting';
  badge?: string;
}

export const features: Feature[] = [
  {
    id: "style-training",
    title: "Style Training Engine",
    description: "Paste your past posts OR provide direct instructions on exactly how you want to sound. AI analyses your rules, vocabulary, and personality to create a custom Writing DNA™ profile.",
    icon: "🧬",
    tier: "core"
  },
  {
    id: "platform-intelligence",
    title: "Platform Intelligence System",
    description: "Don't just convert content — adapt to algorithm behavior. Twitter gets curiosity gaps and short lines. LinkedIn gets storytelling and relatability. Your content, perfectly calibrated.",
    icon: "🧠",
    tier: "core"
  },
  {
    id: "image-to-post",
    title: "Multimodal Transformation",
    description: "Upload a photo, a screenshot of a tweet, hand-written notes, or someone else's post. Our app extracts the essence and transforms it into a custom LinkedIn post, X post, or viral Thread.",
    icon: "📸",
    tier: "core"
  },
  {
    id: "tweet-to-thread",
    title: "Tweet → Viral Thread",
    description: "The real upgrade. Take one small tweet and convert it into a full, high-engagement thread. We expand your short thought into a structured narrative that's built to spread.",
    icon: "🧵",
    tier: "core"
  },
  {
    id: "idea-machine",
    title: "Idea → Content Machine",
    description: "Give us a thought, a sentence, or a story. We generate a full LinkedIn post, X post, and Thread alternatives instantly, all in your personal Writing DNA™.",
    icon: "💡",
    tier: "core"
  },
  {
    id: "hook-generator",
    title: "Hook Generator",
    description: "First line = 80% of virality. Input any topic and receive 10–15 hooks tailored to platform algorithms. From story-openers to curiosity gaps.",
    icon: "🪝",
    tier: "core"
  },
  {
    id: "ai-chat-agent",
    title: "AI Chat Agent Interface",
    description: "Instead of filling forms, talk to an agent. It ask smart questions and guides you from a raw thought to a final, platform-optimized post naturally.",
    icon: "🤖",
    tier: "core"
  },
  {
    id: "platform-selector",
    title: "Platform Selection",
    description: "User-chosen platforms. Whether you need a professional LinkedIn story or a punchy X thread, the system adapts formatting and length dynamically.",
    icon: "🔄",
    tier: "supporting"
  },
  {
    id: "tone-switch",
    title: "Tone Switch",
    description: "4 modes: Influencer, CEO, Storyteller, Academic. Applied on top of your Writing DNA™ profile to match the exact vibe you need for a specific post.",
    icon: "🎭",
    tier: "supporting"
  }
];
