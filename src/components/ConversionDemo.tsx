'use client';

import { useState } from 'react';
import styles from './ConversionDemo.module.css';

interface Conversion {
  id: string;
  title: string;
  inputLabel: string;
  input: string;
  inputImage?: string;
  platform: string;
  output: string[];
  metrics: { label: string; value: string }[];
}

const conversions: Conversion[] = [
  {
    id: "tweet-to-thread",
    title: "Tweet → Thread",
    inputLabel: "One small tweet",
    input: "Just realized most businesses fail because they skip the boring stuff. Discipline > Motivation.",
    platform: "X (Twitter) Thread",
    output: [
      "🧵 Most businesses fail for one simple reason.",
      "It’s not lack of capital or 'market conditions.'",
      "It’s skipping the boring stuff.",
      "1/ Discipline > Motivation. Here's why:",
      "2/ Motivation is a feeling. It vanishes when you're tired, stressed, or bored.",
      "3/ Discipline is a system. It shows up when you don't want to. That's the differentiator.",
      "4/ Boring work (ops, taxes, cold calls) is what builds the foundation.",
      "5/ Don't wait for the 'spark.' Build the engine. Win the long game."
    ],
    metrics: [
      { label: "Engagement", value: "+412%" },
      { label: "Reach", value: "84.2k" },
      { label: "Saves", value: "1.2k" }
    ]
  },
  {
    id: "screenshot-to-linkedin",
    title: "Screenshot → Post",
    inputLabel: "iPhone Notes Screenshot",
    input: "rough thoughts on customer retention",
    inputImage: "/images/notes_screenshot.png",
    platform: "LinkedIn Story Post",
    output: [
      "I was looking through my notes from 2022 and found a hard truth about retention.",
      "We focus so much on 'The Hunt' (Acquisition) that we forget 'The Harvest' (Retention).",
      "Customer retention isn't about 'loyalty programs' or discounts.",
      "It's about the silent 2 AM experience your user has with your product.",
      "Are you building a leaky bucket or a compounding asset?",
      "Here are the 3 retention pillars we're doubling down on this year:",
      "1. Reducing the 'Time to value' to < 60 seconds.",
      "2. Proactive support before they even ask.",
      "3. Community-led feedback loops.",
      "Retention is the only real growth hack. Everything else is just noise."
    ],
    metrics: [
      { label: "Engagement", value: "+280%" },
      { label: "Reach", value: "125k" },
      { label: "Comments", value: "42" }
    ]
  },
  {
    id: "tweet-to-linkedin",
    title: "Tweet → LinkedIn",
    inputLabel: "X (Twitter) Post",
    input: "AI won't replace you. Someone using AI will.",
    platform: "LinkedIn Professional Post",
    output: [
      "The fear of AI is at an all-time high. But here's the reality check we all need:",
      "AI won't replace you. Someone using AI will.",
      "In the last 6 months, I've seen two types of professionals:",
      "Group A: Waiting for the 'hype' to die down.\nGroup B: Learning how to prompt, automate, and scale with AI.",
      "The gap between these two groups is widening every single day.",
      "It's not about being a 'tech person.' It's about being an efficient person.",
      "The choice is yours. Adapt or be replaced. Which group are you in?",
      "#FutureOfWork #AI #Productivity"
    ],
    metrics: [
      { label: "Engagement", value: "+185%" },
      { label: "Reach", value: "42.1k" },
      { label: "Shares", value: "156" }
    ]
  },
  {
    id: "tweet-to-image",
    title: "URL → Image",
    inputLabel: "Twitter / X URL",
    input: "https://x.com/naval/status/1834782109...",
    platform: "Downloadable Tweet Image",
    output: [
      "[Tweet auto-extracted from URL]",
      "",
      "Naval Ravikant @naval",
      "\"Seek wealth, not money or status. Wealth is having assets that earn while you sleep.\"",
      "",
      "— Rendered as a pixel-perfect dark Twitter card",
      "— Downloaded as high-res PNG in one click"
    ],
    metrics: [
      { label: "Extraction", value: "Auto" },
      { label: "Quality", value: "2x HD" },
      { label: "Time", value: "3 sec" }
    ]
  },
  {
    id: "idea-to-reddit",
    title: "Idea → Reddit",
    inputLabel: "Rough startup idea",
    input: "just hit $5k MRR with my SaaS after 4 months of grinding, want to share what actually worked vs what was a waste of time",
    platform: "Reddit Post (r/startups)",
    output: [
      "Title: went from $0 to $5k MRR in 4 months — here's what actually moved the needle",
      "",
      "So I've been lurking here for a while and figured I'd share my experience since a lot of the \"how I grew my SaaS\" posts are either from people with massive audiences or are just thinly veiled ads.",
      "",
      "Quick context: I'm a solo founder, no VC money, no big Twitter following. Just me, caffeine, and a lot of cold outreach.",
      "",
      "Things that actually worked: doing things that don't scale (manual onboarding every single user), posting genuinely helpful stuff in niche communities, and obsessing over churn before worrying about acquisition.",
      "",
      "Biggest waste of time? Spending 3 weeks on a landing page redesign when I had 12 users. Nobody cared about the gradient."
    ],
    metrics: [
      { label: "AI Detection", value: "0%" },
      { label: "Tone match", value: "Native" },
      { label: "Upvotes", value: "340+" }
    ]
  }
];

export default function ConversionDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const conv = conversions[activeTab];

  return (
    <section className={`section ${styles.conversions}`} id="conversions">
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Real Conversions</span>
          <h2 className="section-title">See the Transformation</h2>
          <p className="section-subtitle">
            Messy input in. Polished post out. Our <strong>Platform Intelligence System</strong> adapts your content to algorithm behavior instantly.
          </p>
        </div>

        <div className={styles.tabs}>
          {conversions.map((c, i) => (
            <button
              key={c.id}
              className={`${styles.tab} ${i === activeTab ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(i)}
              id={`conversion-tab-${c.id}`}
            >
              {c.title}
            </button>
          ))}
        </div>

        <div className={styles.demo}>
          <div className={styles.before}>
            <div className={styles.panelLabel}>
              <span className={styles.redDot}></span>
              BEFORE — {conv.inputLabel}
            </div>
            <div className={styles.panelContent}>
              {conv.inputImage ? (
                <div className={styles.imageInputWrapper}>
                  <img src={conv.inputImage} alt="Input Screenshot" className={styles.inputImage} />
                </div>
              ) : (
                <p className={styles.inputText}>{conv.input}</p>
              )}
            </div>
          </div>

          <div className={styles.arrow}>
            <div className={styles.arrowLine}></div>
            <div className={styles.arrowIcon}>⚡</div>
            <div className={styles.arrowLine}></div>
          </div>

          <div className={styles.after}>
            <div className={styles.panelLabel}>
              <span className={styles.greenDot}></span>
              AFTER — {conv.platform}
            </div>
            <div className={styles.panelContent}>
              <div className={styles.outputTextWrap}>
                {conv.output.map((line, idx) => (
                  <p key={idx} className={styles.outputLine}>{line}</p>
                ))}
              </div>
              <div className={styles.metrics}>
                {conv.metrics.map((m, i) => (
                  <div key={i} className={styles.metric}>
                    <span className={styles.metricValue}>{m.value}</span>
                    <span className={styles.metricLabel}>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.viralNote}>
          <div className={styles.viralIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z"/></svg>
          </div>
          <div>
            <strong>The Platform Intelligence Advantage:</strong> We don't just expand text. 
            We build threads for curiosity (X), stories for relatability (LinkedIn), 
            human-native posts for Reddit, and shareable image cards — all from one input.
          </div>
        </div>
      </div>
    </section>
  );
}
