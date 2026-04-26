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
    description: "Try all tools instantly — no account needed. 10 tokens to explore.",
    popular: false,
    features: [
      { name: "Tokens", included: true, detail: "10 Tokens (one-time)" },
      { name: "Text Generations", included: true, detail: "Up to 1 post" },
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
      { name: "Style Training", included: true, detail: "1 Permanent Profile" },
      { name: "Reddit Anti-AI Engine", included: true },
      { name: "Tweet-to-Image", included: true },
      { name: "Photo / Screenshot to Post", included: true },
      { name: "Platform", included: true, detail: "All Platforms" },
      { name: "Overage Tokens", included: true, detail: "Buy extra tokens if limit exceeded" },
    ],
    cta: "Get Starter"
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    annualPrice: 290,
    description: "For founders scaling reach. 5,000 tokens per month included.",
    popular: false,
    features: [
      { name: "Tokens / month", included: true, detail: "5,000 Tokens" },
      { name: "Text Generations", included: true, detail: "Unlimited Posts*" },
      { name: "Style Training", included: true, detail: "Unlimited Profiles" },
      { name: "Reddit Anti-AI Engine", included: true },
      { name: "Tweet-to-Image", included: true },
      { name: "Photo / Screenshot to Post", included: true },
      { name: "Platform", included: true, detail: "All Platforms" },
      { name: "Overage Tokens", included: true, detail: "Buy extra tokens if 5,000 exceeded" },
      { name: "Support", included: true, detail: "Priority Support" }
    ],
    cta: "Go Pro"
  }
];
