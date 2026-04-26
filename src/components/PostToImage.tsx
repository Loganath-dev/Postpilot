'use client';

import { useState, useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import styles from './PostToImage.module.css';

interface TweetData {
  text: string;
  authorName: string;
  authorHandle: string;
  url: string;
}

const GRADIENTS = [
  { id: 'sunset', name: 'Sunset', value: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)' },
  { id: 'ocean', name: 'Ocean', value: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)' },
  { id: 'peach', name: 'Peach', value: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
  { id: 'purple', name: 'Purple Dream', value: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)' },
  { id: 'dark', name: 'Midnight', value: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)' }
];

const SOLIDS = [
  { id: 'white', name: 'White', value: '#ffffff' },
  { id: 'gray', name: 'Light Gray', value: '#f1f5f9' },
  { id: 'slate', name: 'Slate', value: '#0f172a' },
  { id: 'black', name: 'Black', value: '#000000' },
];

export default function PostToImage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [tweet, setTweet] = useState<TweetData | null>(null);
  const [error, setError] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);
  
  const [bgType, setBgType] = useState<'gradient' | 'solid'>('gradient');
  const [bgGradient, setBgGradient] = useState(GRADIENTS[0].value);
  const [bgSolid, setBgSolid] = useState(SOLIDS[0].value);

  async function handleExtract() {
    if (!url.trim()) return;
    setLoading(true);
    setError('');
    setTweet(null);

    try {
      const res = await fetch('/api/tweet-extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to extract tweet.');
        return;
      }

      if (data.success && data.data) {
        setTweet(data.data);
      } else {
        setError(data.error || 'Unexpected response.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement('a');
      link.download = `postpilot-tweet-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
    }
  }, []);

  const initials = tweet
    ? tweet.authorName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '';

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const dateStr = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className={styles.container}>
      <div className={styles.inputSection}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Paste a Twitter / X post URL</label>
          <input
            className={styles.input}
            placeholder="https://x.com/username/status/123456789..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleExtract()}
          />
          <span className={styles.hint}>
            Supports twitter.com and x.com links
          </span>
        </div>

        <button
          className={`btn btn-primary btn-lg ${styles.generateBtn}`}
          onClick={handleExtract}
          disabled={loading || !url.trim()}
        >
          {loading ? (
            <>
              <span className={styles.spinner}></span>
              Extracting...
            </>
          ) : (
            <>Extract & Generate Image</>
          )}
        </button>

        {error && <div className={styles.error}>{error}</div>}
      </div>

      {/* Preview */}
      {tweet && (
        <div className={styles.previewArea}>
          
          <div className={styles.controlsBar}>
            <div className={styles.controlGroup}>
              <label className={styles.controlLabel}>Background Type</label>
              <select className={styles.controlSelect} value={bgType} onChange={(e) => setBgType(e.target.value as any)}>
                <option value="gradient">Gradient</option>
                <option value="solid">Solid Color</option>
              </select>
            </div>
            
            {bgType === 'gradient' ? (
              <div className={styles.controlGroup}>
                <label className={styles.controlLabel}>Gradients</label>
                <select className={styles.controlSelect} value={bgGradient} onChange={(e) => setBgGradient(e.target.value)}>
                  {GRADIENTS.map(g => <option key={g.id} value={g.value}>{g.name}</option>)}
                </select>
              </div>
            ) : (
              <div className={styles.controlGroup}>
                <label className={styles.controlLabel}>Colors</label>
                <select className={styles.controlSelect} value={bgSolid} onChange={(e) => setBgSolid(e.target.value)}>
                  {SOLIDS.map(c => <option key={c.id} value={c.value}>{c.name}</option>)}
                </select>
              </div>
            )}

            <button className={styles.exportBtn} onClick={handleDownload} title="Download PNG">
              Export Image &gt;
            </button>
          </div>

          <div className={styles.previewWrapper}>
            <div 
              ref={cardRef} 
              className={styles.imageExportWrapper}
              style={{ background: bgType === 'gradient' ? bgGradient : bgSolid }}
            >
              <div className={styles.twitterCardLight}>
                <div className={styles.twitterHeader}>
                  <div className={styles.twitterHeaderLeft}>
                    <div className={styles.twitterAvatar}>{initials}</div>
                    <div className={styles.twitterUserInfo}>
                      <span className={styles.twitterDisplayName}>
                        {tweet.authorName}
                      </span>
                      <span className={styles.twitterHandle}>
                        {tweet.authorHandle}
                      </span>
                    </div>
                  </div>
                  <div className={styles.twitterLogo}>𝕏</div>
                </div>
                <div className={styles.twitterBody}>{tweet.text}</div>
                <div className={styles.twitterFooter}>
                  <span className={styles.twitterStat}>
                    {timeStr} · {dateStr}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
