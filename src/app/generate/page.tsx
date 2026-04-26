'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import styles from './generate.module.css';
import { createClient } from '@/utils/supabase/client';

const PostToImage = dynamic(() => import('@/components/PostToImage'), { ssr: false });
const RedditGenerator = dynamic(() => import('@/components/RedditGenerator'), { ssr: false });

interface GeneratedContent {
  linkedin?: { post: string; hooks: string[] };
  twitter?: { post: string; hooks: string[] };
  thread?: { tweets: string[]; hooks: string[] };
}

const TONES = [
  { id: 'default', label: 'Natural' },
  { id: 'influencer', label: 'Influencer' },
  { id: 'ceo', label: 'CEO' },
  { id: 'storyteller', label: 'Storyteller' },
  { id: 'academic', label: 'Academic' },
];

const PLATFORMS = [
  { id: 'all', label: 'All Platforms' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'twitter', label: 'X (Twitter)' },
  { id: 'thread', label: 'Thread' },
];

type TopTab = 'generator' | 'post-to-image' | 'reddit';

export default function GeneratePage() {
  const [topTab, setTopTab] = useState<TopTab>('generator');
  const [input, setInput] = useState('');
  const [writingDNA, setWritingDNA] = useState('');
  const [tone, setTone] = useState('default');
  const [platform, setPlatform] = useState('all');
  const [loading, setLoading] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const router = useRouter();

  // Auth guard — redirect to login if not signed in
  useEffect(() => {
    const supabase = createClient();
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }
      setAuthChecking(false);
    };
    checkAuth();
  }, [router]);
  const [result, setResult] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [showDNA, setShowDNA] = useState(false);
  const [activeTab, setActiveTab] = useState<'linkedin' | 'twitter' | 'thread'>('linkedin');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (PNG, JPG, WEBP).');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be under 10MB.');
      return;
    }
    setImageName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result as string);
      setError('');
    };
    reader.readAsDataURL(file);
  }

  function removeImage() {
    setUploadedImage(null);
    setImageName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function handleGenerate() {
    if (!input.trim() && !uploadedImage) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: input.trim() || 'Extract the content from this image and transform it.',
          platform,
          tone: tone !== 'default' ? tone : undefined,
          writingDNA: writingDNA.trim() || undefined,
          image: uploadedImage || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        return;
      }

      if (data.success && data.data) {
        setResult(data.data);
        
        // Auto-switch to the selected platform tab
        if (platform === 'linkedin') setActiveTab('linkedin');
        if (platform === 'twitter') setActiveTab('twitter');
        if (platform === 'thread') setActiveTab('thread');
        // If 'all' is selected, default to the first one available
        if (platform === 'all') {
          if (data.data.linkedin) setActiveTab('linkedin');
          else if (data.data.twitter) setActiveTab('twitter');
          else if (data.data.thread) setActiveTab('thread');
        }

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

  if (authChecking) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <span className="section-label">Tools</span>
          <h1 className={styles.title}>
            PostPilot
            <br />
            <span className={styles.titleAccent}>Creative Studio</span>
          </h1>
          <p className={styles.subtitle}>
            Generate platform-native content, create shareable post images, or craft human-sounding Reddit posts.
          </p>
        </div>

        {/* Top-Level Tab Navigation */}
        <div className={styles.topTabs}>
          <button
            className={`${styles.topTab} ${topTab === 'generator' ? styles.topTabActive : ''}`}
            onClick={() => setTopTab('generator')}
          >
            <span className={styles.topTabIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m13 2-2 10h8L7 22l2-10H1L13 2z"/></svg>
            </span>
            Content Generator
          </button>
          <button
            className={`${styles.topTab} ${topTab === 'post-to-image' ? styles.topTabActive : ''}`}
            onClick={() => setTopTab('post-to-image')}
          >
            <span className={styles.topTabIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
            </span>
            Tweet to Image
          </button>
          <button
            className={`${styles.topTab} ${topTab === 'reddit' ? styles.topTabActive : ''}`}
            onClick={() => setTopTab('reddit')}
          >
            <span className={styles.topTabIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
            </span>
            Reddit Generator
          </button>
        </div>

        {/* ==================== TAB 1: Content Generator ==================== */}
        {topTab === 'generator' && (
          <div className={styles.generator}>
            <div className={styles.inputSection}>
              {/* Main Integrated Input */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>Your raw input</label>
                <div className={styles.integratedInput}>
                  <textarea
                    className={styles.integratedTextarea}
                    placeholder="Paste your thought, tweet, screenshot text, or raw idea here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />

                  {uploadedImage && (
                    <div className={styles.imagePreview}>
                      <img src={uploadedImage} alt="Uploaded" className={styles.previewImg} />
                      <div className={styles.imageInfo}>
                        <span className={styles.imageName}>{imageName}</span>
                        <button className={styles.removeBtn} onClick={removeImage}>
                          ✕ Remove
                        </button>
                      </div>
                    </div>
                  )}

                  <div className={styles.integratedFooter}>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleImageUpload}
                      className={styles.fileInput}
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className={styles.integratedUploadBtn}>
                      <span className={styles.integratedUploadIcon}>+</span> 
                      {uploadedImage ? 'Change Image' : 'Add Image'}
                    </label>
                    <div className={styles.charCount}>{input.length} characters</div>
                  </div>
                </div>
              </div>

              {/* Writing DNA Toggle */}
              <button
                className={styles.dnaToggle}
                onClick={() => setShowDNA(!showDNA)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '6px'}}><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
                {showDNA ? 'Hide' : 'Add'} Writing DNA™ Profile
              </button>

              {showDNA && (
                <div className={styles.inputGroup}>
                  <label className={styles.label}>
                    Writing DNA™ — Paste 5–10 of your past posts
                  </label>
                  <textarea
                    className={styles.textarea}
                    placeholder="Paste examples of your previous posts here. The AI will analyse your writing style and match it in the output..."
                    value={writingDNA}
                    onChange={(e) => setWritingDNA(e.target.value)}
                    rows={6}
                  />
                </div>
              )}

              {/* Tone Selection */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>Tone</label>
                <div className={styles.toneGrid}>
                  {TONES.map((t) => (
                    <button
                      key={t.id}
                      className={`${styles.toneBtn} ${tone === t.id ? styles.toneBtnActive : ''}`}
                      onClick={() => setTone(t.id)}
                    >
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Platform Selection */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>Target Platform</label>
                <div className={styles.platformGrid}>
                  {PLATFORMS.map((p) => (
                    <button
                      key={p.id}
                      className={`${styles.platformBtn} ${platform === p.id ? styles.platformBtnActive : ''}`}
                      onClick={() => setPlatform(p.id)}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                className={`btn btn-primary btn-lg ${styles.generateBtn}`}
                onClick={handleGenerate}
                disabled={loading || (!input.trim() && !uploadedImage)}
              >
                {loading ? (
                  <>
                    <span className={styles.spinner}></span>
                    Generating...
                  </>
                ) : (
                  <>Generate Content ⚡</>
                )}
              </button>

              {error && <div className={styles.error}>{error}</div>}
            </div>

            {/* Results Section */}
            {result && (
              <div className={styles.results} ref={resultRef}>
                <h2 className={styles.resultsTitle}>Your Content is Ready</h2>

                {/* Tabs */}
                <div className={styles.resultTabs}>
                  {result.linkedin && (
                    <button
                      className={`${styles.resultTab} ${activeTab === 'linkedin' ? styles.resultTabActive : ''}`}
                      onClick={() => setActiveTab('linkedin')}
                    >
                      LinkedIn
                    </button>
                  )}
                  {result.twitter && (
                    <button
                      className={`${styles.resultTab} ${activeTab === 'twitter' ? styles.resultTabActive : ''}`}
                      onClick={() => setActiveTab('twitter')}
                    >
                      X Post
                    </button>
                  )}
                  {result.thread && (
                    <button
                      className={`${styles.resultTab} ${activeTab === 'thread' ? styles.resultTabActive : ''}`}
                      onClick={() => setActiveTab('thread')}
                    >
                      Thread
                    </button>
                  )}
                </div>

                {/* LinkedIn Output */}
                {activeTab === 'linkedin' && result.linkedin && (
                  <div className={styles.outputCard}>
                    <div className={styles.outputHeader}>
                      <span>💼 LinkedIn Post</span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          className={styles.copyBtn}
                          onClick={() => copyToClipboard(result.linkedin!.post, 'linkedin')}
                        >
                          {copied === 'linkedin' ? '✓ Copied' : 'Copy'}
                        </button>
                        <a
                          href="https://www.linkedin.com/feed/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.shareBtn}
                          onClick={() => copyToClipboard(result.linkedin!.post, 'linkedin')}
                        >
                          Share on LinkedIn
                        </a>
                      </div>
                    </div>
                    <div className={styles.outputBody}>
                      <p className={styles.outputText}>{result.linkedin.post}</p>
                    </div>
                    {result.linkedin.hooks?.length > 0 && (
                      <div className={styles.hooksSection}>
                        <span className={styles.hooksLabel}>Alternative Hooks</span>
                        {result.linkedin.hooks.map((hook, i) => (
                          <div key={i} className={styles.hookItem}>
                            <span className={styles.hookNum}>{i + 1}</span>
                            <span>{hook}</span>
                            <button
                              className={styles.copySmall}
                              onClick={() => copyToClipboard(hook, `lh-${i}`)}
                            >
                              {copied === `lh-${i}` ? '✓' : '⎘'}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Twitter Output */}
                {activeTab === 'twitter' && result.twitter && (
                  <div className={styles.outputCard}>
                    <div className={styles.outputHeader}>
                      <span>🐦 X (Twitter) Post</span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          className={styles.copyBtn}
                          onClick={() => copyToClipboard(result.twitter!.post, 'twitter')}
                        >
                          {copied === 'twitter' ? '✓ Copied' : 'Copy'}
                        </button>
                        <a
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(result.twitter!.post)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.shareBtn}
                        >
                          Share on X
                        </a>
                      </div>
                    </div>
                    <div className={styles.outputBody}>
                      <p className={styles.outputText}>{result.twitter.post}</p>
                      <span className={styles.charBadge}>
                        {result.twitter.post.length}/280
                      </span>
                    </div>
                    {result.twitter.hooks?.length > 0 && (
                      <div className={styles.hooksSection}>
                        <span className={styles.hooksLabel}>Alternative Hooks</span>
                        {result.twitter.hooks.map((hook, i) => (
                          <div key={i} className={styles.hookItem}>
                            <span className={styles.hookNum}>{i + 1}</span>
                            <span>{hook}</span>
                            <button
                              className={styles.copySmall}
                              onClick={() => copyToClipboard(hook, `th-${i}`)}
                            >
                              {copied === `th-${i}` ? '✓' : '⎘'}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Thread Output */}
                {activeTab === 'thread' && result.thread && (
                  <div className={styles.outputCard}>
                    <div className={styles.outputHeader}>
                      <span>🧵 Viral Thread</span>
                      <button
                        className={styles.copyBtn}
                        onClick={() =>
                          copyToClipboard(result.thread!.tweets.join('\n\n'), 'thread')
                        }
                      >
                        {copied === 'thread' ? '✓ Copied All' : 'Copy All'}
                      </button>
                    </div>
                    <div className={styles.outputBody}>
                      {result.thread.tweets.map((tweet, i) => (
                        <div key={i} className={styles.threadTweet}>
                          <span className={styles.tweetNum}>{i + 1}/</span>
                          <p>{tweet}</p>
                          <button
                            className={styles.copySmall}
                            onClick={() => copyToClipboard(tweet, `tt-${i}`)}
                          >
                            {copied === `tt-${i}` ? '✓' : '⎘'}
                          </button>
                        </div>
                      ))}
                    </div>
                    {result.thread.hooks?.length > 0 && (
                      <div className={styles.hooksSection}>
                        <span className={styles.hooksLabel}>Alternative Thread Openers</span>
                        {result.thread.hooks.map((hook, i) => (
                          <div key={i} className={styles.hookItem}>
                            <span className={styles.hookNum}>{i + 1}</span>
                            <span>{hook}</span>
                            <button
                              className={styles.copySmall}
                              onClick={() => copyToClipboard(hook, `tth-${i}`)}
                            >
                              {copied === `tth-${i}` ? '✓' : '⎘'}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 2: Post to Image ==================== */}
        {topTab === 'post-to-image' && <PostToImage />}

        {/* ==================== TAB 3: Reddit Generator ==================== */}
        {topTab === 'reddit' && <RedditGenerator />}
      </div>
    </div>
  );
}
