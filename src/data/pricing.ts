export interface PricingTier {
  id: string;
  name: string;
  price: number;
  annualPrice: number;
  description: string;
  popular: boolean;
  features: { name: string; included: boolean; detail?: string }[];
  cta: string;
}

export const pricingTiers: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    annualPrice: 0,
    description: "Try all tools instantly — no account needed. 100 tokens to explore.",
    popular: false,
    features: [
      { name: "Tokens", included: true, detail: "100 Tokens (one-time)" },
      { name: "Text Generations", included: true, detail: "Up to 10 posts" },
      { name: "Image Generations", included: true, detail: "Up to 2 images" },
      { name: "Style Training", included: true, detail: "1 Profile" },
      { name: "Reddit Anti-AI Engine", included: true },
      { name: "Tweet-to-Image", included: true },
      { name: "Photo / Screenshot to Post", included: true },
      { name: "Platform", included: true, detail: "All Platforms" },
      { name: "Overage Tokens", included: false, detail: "Not available" },
    ],
    cta: "Start Free"
  },
  {
    id: "starter",
    name: "Starter",
    price: 11.99,
    annualPrice: 119.90,
    description: "For creators who post consistently. 2,000 tokens every month.",
    popular: true,
    features: [
      { name: "Tokens / month", included: true, detail: "2,000 Tokens" },
      { name: "Text Generations", included: true, detail: "Up to 200 posts" },
      { name: "Image Generations", included: true, detail: "Up to 40 images" },
      { name: "Style Training", included: true, detail: "1 Permanent Profile" },
      { name: "Reddit Anti-AI Engine", included: true },
      { name: "Tweet-to-Image", included: true },
      { name: "Photo / Screenshot to Post", included: true },
      { name: "Platform", included: true, detail: "All Platforms" },
      { name: "Overage Tokens", included: true, detail: "$4 per 1,000 Tokens" },
    ],
    cta: "Get Starter"
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    annualPrice: 290,
    description: "For founders and agencies scaling reach. 5,000 tokens with priority AI.",
    popular: false,
    features: [
      { name: "Tokens / month", included: true, detail: "5,000 Tokens" },
      { name: "Text Generations", included: true, detail: "Up to 500 posts" },
      { name: "Image Generations", included: true, detail: "Up to 100 images" },
      { name: "Style Training", included: true, detail: "Unlimited Profiles" },
      { name: "Reddit Anti-AI Engine", included: true },
      { name: "Tweet-to-Image", included: true },
      { name: "Photo / Screenshot to Post", included: true },
      { name: "Platform", included: true, detail: "All Platforms" },
      { name: "Overage Tokens", included: true, detail: "$4 per 1,000 Tokens" },
      { name: "AI Model", included: true, detail: "Gemini 2.0 Flash (Advanced)" },
      { name: "Support", included: true, detail: "Priority Support" }
    ],
    cta: "Go Pro"
  }
];
