export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  quote: string;
  platform: 'LinkedIn' | 'X (Twitter)' | 'Both';
  metric: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Arjun Mehta",
    role: "Computer Science Student",
    avatar: "AM",
    rating: 5,
    quote: "I uploaded my exam failure tweet and got a LinkedIn post that got 400+ reactions. My classmates asked if I hired a ghostwriter. Nope — just PostPilot. It read exactly like how I write, but polished to perfection.",
    platform: "LinkedIn",
    metric: "400+ reactions on first post"
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Startup Founder, SaaS",
    avatar: "PS",
    rating: 5,
    quote: "PostPilot turned a random coffee-and-laptop photo into a Twitter thread that got me 2,000 followers in a week. The Style Training feature is insane — it actually captures how I write, not some generic corporate tone.",
    platform: "X (Twitter)",
    metric: "2,000 followers in one week"
  },
  {
    id: 3,
    name: "Rahul Verma",
    role: "Marketing Manager at a Fortune 500",
    avatar: "RV",
    rating: 5,
    quote: "The Style Training feature is scary good. My team ran a blind test — 3 posts by me, 3 by PostPilot. Nobody could tell the difference. That's never happened with any AI tool I've tried.",
    platform: "Both",
    metric: "100% pass rate in blind style test"
  },
  {
    id: 4,
    name: "Sneha Agarwal",
    role: "Content Creator, 50K+ followers",
    avatar: "SA",
    rating: 5,
    quote: "I was spending 2 hours crafting each LinkedIn post. Now it takes me 5 minutes — and the output is better than what I was writing manually. PostPilot doesn't make me sound like everyone else. It makes me sound like the best version of myself.",
    platform: "LinkedIn",
    metric: "From 2 hours to 5 minutes per post"
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Tech Lead & Open Source Contributor",
    avatar: "VS",
    rating: 5,
    quote: "The Hook Generator alone is worth the subscription. I went from struggling with the first line of every post to having 15 options that all hit. My LinkedIn engagement went up 300% in the first month.",
    platform: "LinkedIn",
    metric: "300% increase in engagement"
  },
  {
    id: 6,
    name: "Ananya Krishnan",
    role: "Freelance Designer & Writer",
    avatar: "AK",
    rating: 5,
    quote: "Finally an AI tool that doesn't make me sound like a robot or a LinkedIn influencer bro. My clients noticed the quality jump in my social presence. PostPilot captures my actual writing personality — dry humor, short sentences, no fluff.",
    platform: "Both",
    metric: "3 new clients from social content"
  },
  {
    id: 7,
    name: "James Chen",
    role: "Indie Hacker",
    avatar: "JC",
    rating: 5,
    quote: "I pasted my chaotic midnight Notion brain-dumps into PostPilot, and out came three razor-sharp Twitter threads that went viral. It's like having a top 1% ghostwriter sitting on my desktop.",
    platform: "X (Twitter)",
    metric: "1.2M impressions in 48 hours"
  },
  {
    id: 8,
    name: "Sara Livingston",
    role: "B2B Sales Director",
    avatar: "SL",
    rating: 5,
    quote: "I don't have time to write 'Broetry' on LinkedIn, but I know it converts. I just dumped a rough voice memo transcript into PostPilot, and it built the perfect relatable storytelling post without losing my actual insights.",
    platform: "LinkedIn",
    metric: "45 high-intent inbound leads"
  },
  {
    id: 9,
    name: "David Osei",
    role: "Product Manager",
    avatar: "DO",
    rating: 5,
    quote: "Other AI tools hallucinate hashtags and use emojis like a teenager. PostPilot's Style Training understood that I write extremely dry, data-driven content. The X thread it generated matched my tone flawlessly.",
    platform: "Both",
    metric: "Zero manual edits needed"
  },
  {
    id: 10,
    name: "Maya Patel",
    role: "Agency Owner",
    avatar: "MP",
    rating: 5,
    quote: "I use this to manage 4 different clients. By creating 4 distinct Writing DNA profiles, I can take one source article and generate completely different, highly-personalized styles for each client in 10 seconds.",
    platform: "Both",
    metric: "Saves 15 hours per week"
  },
  {
    id: 11,
    name: "Chris Jensen",
    role: "Fitness Coach",
    avatar: "CJ",
    rating: 5,
    quote: "Took a screenshot of a client's transformation text message, uploaded it, and PostPilot turned it into an incredible, emotional LinkedIn story and a punchy X post. It's literally my entire marketing team.",
    platform: "LinkedIn",
    metric: "12 new client sign-ups"
  }
];
