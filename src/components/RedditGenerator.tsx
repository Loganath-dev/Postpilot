'use client';

import { useState, useRef } from 'react';
import styles from './RedditGenerator.module.css';

const POPULAR_SUBREDDITS = [
  // 💼 Business / Startups
  { id: 'startups', label: 'r/startups', desc: 'Startup advice & growth' },
  { id: 'startup', label: 'r/startup', desc: 'Early-stage startups' },
  { id: 'Entrepreneur', label: 'r/Entrepreneur', desc: 'Entrepreneurship talk' },
  { id: 'EntrepreneurRideAlong', label: 'r/EntrepreneurRideAlong', desc: 'Founder journeys' },
  { id: 'sideproject', label: 'r/sideproject', desc: 'Indie projects' },
  { id: 'SideHustle', label: 'r/SideHustle', desc: 'Extra income ideas' },
  { id: 'passive_income', label: 'r/passive_income', desc: 'Passive income' },
  { id: 'smallbusiness', label: 'r/smallbusiness', desc: 'Small business ops' },
  { id: 'business', label: 'r/business', desc: 'General business' },
  { id: 'SaaS', label: 'r/SaaS', desc: 'SaaS growth & metrics' },
  { id: 'IndieHackers', label: 'r/IndieHackers', desc: 'Indie builders' },
  { id: 'solopreneur', label: 'r/solopreneur', desc: 'Solo founders' },
  { id: 'buildinpublic', label: 'r/buildinpublic', desc: 'Public building' },
  { id: 'Entrepreneurship', label: 'r/Entrepreneurship', desc: 'Startup ecosystem' },

  // 💰 Finance / Money
  { id: 'investing', label: 'r/investing', desc: 'Investing strategies' },
  { id: 'stocks', label: 'r/stocks', desc: 'Stock market' },
  { id: 'personalfinance', label: 'r/personalfinance', desc: 'Money management' },
  { id: 'financialindependence', label: 'r/financialindependence', desc: 'FIRE movement' },
  { id: 'cryptocurrency', label: 'r/cryptocurrency', desc: 'Crypto discussion' },

  // 👨‍💻 Tech / Programming
  { id: 'programming', label: 'r/programming', desc: 'Programming culture' },
  { id: 'learnprogramming', label: 'r/learnprogramming', desc: 'Learn coding' },
  { id: 'coding', label: 'r/coding', desc: 'General coding' },
  { id: 'webdev', label: 'r/webdev', desc: 'Web dev talk' },
  { id: 'frontend', label: 'r/frontend', desc: 'Frontend dev' },
  { id: 'backend', label: 'r/backend', desc: 'Backend dev' },
  { id: 'javascript', label: 'r/javascript', desc: 'JavaScript ecosystem' },
  { id: 'reactjs', label: 'r/reactjs', desc: 'React development' },
  { id: 'node', label: 'r/node', desc: 'Node.js' },
  { id: 'python', label: 'r/python', desc: 'Python programming' },
  { id: 'MachineLearning', label: 'r/MachineLearning', desc: 'ML research' },
  { id: 'artificial', label: 'r/artificial', desc: 'AI discussions' },
  { id: 'OpenAI', label: 'r/OpenAI', desc: 'AI tools' },
  { id: 'ChatGPT', label: 'r/ChatGPT', desc: 'Prompting & usage' },
  { id: 'technology', label: 'r/technology', desc: 'Tech news' },

  // 🎯 Marketing / Growth
  { id: 'marketing', label: 'r/marketing', desc: 'Marketing strategies' },
  { id: 'digital_marketing', label: 'r/digital_marketing', desc: 'Online marketing' },
  { id: 'socialmedia', label: 'r/socialmedia', desc: 'Social media growth' },
  { id: 'content_marketing', label: 'r/content_marketing', desc: 'Content strategy' },
  { id: 'copywriting', label: 'r/copywriting', desc: 'Copywriting tips' },
  { id: 'SEO', label: 'r/SEO', desc: 'Search optimization' },

  // 🧠 Self Improvement
  { id: 'selfimprovement', label: 'r/selfimprovement', desc: 'Personal growth' },
  { id: 'getdisciplined', label: 'r/getdisciplined', desc: 'Discipline habits' },
  { id: 'GetMotivated', label: 'r/GetMotivated', desc: 'Motivation posts' },
  { id: 'productivity', label: 'r/productivity', desc: 'Productivity tips' },
  { id: 'DecidingToBeBetter', label: 'r/DecidingToBeBetter', desc: 'Self change' },

  // 💼 Career / Freelance
  { id: 'freelance', label: 'r/freelance', desc: 'Freelancing life' },
  { id: 'jobs', label: 'r/jobs', desc: 'Job discussions' },
  { id: 'careerguidance', label: 'r/careerguidance', desc: 'Career advice' },
  { id: 'resumes', label: 'r/resumes', desc: 'Resume help' },
  { id: 'WorkOnline', label: 'r/WorkOnline', desc: 'Online work' },
  { id: 'remotework', label: 'r/remotework', desc: 'Remote jobs' },

  // 🎨 Design
  { id: 'design', label: 'r/design', desc: 'Design thinking' },
  { id: 'graphic_design', label: 'r/graphic_design', desc: 'Graphic design' },
  { id: 'UI_Design', label: 'r/UI_Design', desc: 'UI/UX design' },
  { id: 'web_design', label: 'r/web_design', desc: 'Web design' },

  // 🎮 General / Lifestyle
  { id: 'AskReddit', label: 'r/AskReddit', desc: 'Open discussions' },
  { id: 'todayilearned', label: 'r/todayilearned', desc: 'Interesting facts' },
  { id: 'LifeProTips', label: 'r/LifeProTips', desc: 'Life tips' },
  { id: 'explainlikeimfive', label: 'r/explainlikeimfive', desc: 'Simple explanations' },
  { id: 'books', label: 'r/books', desc: 'Books & reading' },
  { id: 'fitness', label: 'r/fitness', desc: 'Fitness tips' },
  { id: 'health', label: 'r/health', desc: 'Health discussions' },
  { id: 'Food', label: 'r/Food', desc: 'Food & cooking' },
  { id: 'travel', label: 'r/travel', desc: 'Travel experiences' },
  { id: 'movies', label: 'r/movies', desc: 'Movies discussion' },
  { id: 'gaming', label: 'r/gaming', desc: 'Gaming community' },
  { id: 'music', label: 'r/music', desc: 'Music discussion' },

  // 🔥 Extra High Engagement
  { id: 'startuplife', label: 'r/startuplife', desc: 'Startup lifestyle' },
  { id: 'failures', label: 'r/failures', desc: 'Failure stories' },
  { id: 'success', label: 'r/success', desc: 'Success journeys' },
  { id: 'motivation', label: 'r/motivation', desc: 'Motivation & mindset' },
];

interface RedditResult {
  title: string;
  body: string;
}

export default function RedditGenerator() {
  const [input, setInput] = useState('');
  const [subreddit, setSubreddit] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RedditResult | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const filteredSubs = POPULAR_SUBREDDITS.filter((s) =>
    s.label.toLowerCase().includes(subreddit.toLowerCase()) ||
    s.desc.toLowerCase().includes(subreddit.toLowerCase())
  );

  async function handleGenerate() {
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/reddit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: input.trim(),
          subreddit: subreddit.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        return;
      }

      if (data.success && data.data) {
        setResult(data.data);
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else {
        setError(data.error || 'Unexpected response.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  const displaySub = subreddit
    ? subreddit.startsWith('r/') ? subreddit : `r/${subreddit}`
    : 'r/general';

  return (
    <div className={styles.container}>
      <div className={styles.inputSection}>
        {/* Subreddit Selector */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>Target Subreddit</label>
          <div className={styles.subredditSelector}>
            <input
              className={styles.subredditInput}
              placeholder="Search or type a subreddit name... e.g. startups"
              value={subreddit}
              onChange={(e) => {
                setSubreddit(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            />
            {showDropdown && filteredSubs.length > 0 && (
              <div className={styles.subredditDropdown}>
                {filteredSubs.map((s) => (
                  <button
                    key={s.id}
                    className={styles.subredditOption}
                    onMouseDown={() => {
                      setSubreddit(s.id);
                      setShowDropdown(false);
                    }}
                  >
                    <span>{s.label}</span>
                    <span className={styles.subredditDesc}>— {s.desc}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Topic Input */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>Your topic or raw idea</label>
          <textarea
            className={styles.textarea}
            placeholder="What do you want to post about? A lesson, a question, a story, a rant... just dump your raw thoughts here."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={5}
          />
        </div>

        {/* Generate */}
        <button
          className={`btn btn-primary btn-lg ${styles.generateBtn}`}
          onClick={handleGenerate}
          disabled={loading || !input.trim()}
        >
          {loading ? (
            <>
              <span className={styles.spinner}></span>
              Writing like a Redditor...
            </>
          ) : (
            <>Generate Reddit Post</>
          )}
        </button>

        {error && <div className={styles.error}>{error}</div>}
      </div>

      {/* Result */}
      {result && (
        <div className={styles.resultArea} ref={resultRef}>
          <h3 className={styles.resultTitle}>Your Reddit Post</h3>

          <div className={styles.redditCard}>
            <div className={styles.redditHeader}>
              <div className={styles.redditMeta}>
                <div className={styles.redditIcon}>R</div>
                <div>
                  <div className={styles.redditSub}>{displaySub}</div>
                  <div className={styles.redditUser}>u/you · just now</div>
                </div>
              </div>
              <button
                className={styles.copyBtn}
                onClick={() =>
                  copyToClipboard(
                    `${result.title}\n\n${result.body}`,
                    'reddit-all'
                  )
                }
              >
                {copied === 'reddit-all' ? '✓ Copied' : 'Copy All'}
              </button>
            </div>

            <div className={styles.redditPostTitle}>{result.title}</div>
            <div className={styles.redditBody}>{result.body}</div>

            <div className={styles.redditFooter}>
              <span className={styles.redditAction}>⬆ Vote</span>
              <span className={styles.redditAction}>💬 Comment</span>
              <span className={styles.redditAction}>🔗 Share</span>
              <span className={styles.redditAction}>⭐ Save</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
