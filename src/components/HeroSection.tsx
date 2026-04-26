'use client';

import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.orbs}>
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <div className={`container ${styles.content}`}>
        <div className={styles.badge}>
          <span className={styles.badgeDot}></span>
          Style Training Engine — Now Live
        </div>

        <h1 className={styles.title}>
          Turn Any Input Into Content
          <br />
          That <span className={styles.highlight}>Sounds Like You</span>
        </h1>

        <p className={styles.subtitle}>
          One small Tweet → Viral Thread. Screenshot of notes → LinkedIn Post.
          <br />
          Our <strong>Platform Intelligence System</strong> adapts to algorithm behavior natively.
        </p>

        <div className={styles.ctas}>
          <a href="/generate" className={`btn btn-primary btn-lg ${styles.ctaPrimary}`}>
            Start Creating — Free
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 9H13M13 9L9.5 5.5M13 9L9.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
          <a href="#conversions" className={`btn btn-secondary btn-lg`}>
            See Live Demos
          </a>
        </div>

        <div className={styles.heroVisualWrap}>
          <div className={styles.heroVisual}>
             {/* Abstract visual of Platform Intelligence */}
             <div className={styles.visualBeam}></div>
             <div className={styles.visualInput}>
                <div className={styles.vLabel}>Input: Tweet / Photo / Note</div>
                <div className={styles.vContent}>"Motivation is fake..."</div>
             </div>
             <div className={styles.visualEngine}>
                <span className={styles.engineIcon}>🧬</span>
                <span className={styles.engineText}>Platform Intelligence™</span>
             </div>
             <div className={styles.visualOutputs}>
                <div className={`${styles.vOutput} ${styles.voX}`}>🧵 Viral Thread</div>
                <div className={`${styles.vOutput} ${styles.voLi}`}>💼 Story Post</div>
             </div>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>250</span>
            <span className={styles.statLabel}>Starter Plan Posts</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.stat}>
            <span className={styles.statValue}>∞</span>
            <span className={styles.statLabel}>Pro Plan Posts</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.stat}>
            <span className={styles.statValue}>10s</span>
            <span className={styles.statLabel}>Input to post time</span>
          </div>
        </div>
      </div>
    </section>
  );
}
