import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoIcon}>⚡</span>
              <span className={styles.logoText}>PostPilot</span>
            </Link>
            <p className={styles.description}>
              Turn any input into content that sounds like you. Photos, screenshots, tweets, and rough ideas
              → polished LinkedIn posts and X threads.
            </p>
          </div>

          {/* Product Column */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Product</h4>
            <Link href="/#features" className={styles.footerLink}>Features</Link>
            <Link href="/#pricing" className={styles.footerLink}>Pricing</Link>
            <Link href="/#conversions" className={styles.footerLink}>See Demos</Link>
            <Link href="/#style-training" className={styles.footerLink}>Style Training</Link>
          </div>

          {/* Company Column */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Resources</h4>
            <Link href="/blog" className={styles.footerLink}>Blog</Link>
            <Link href="/faq" className={styles.footerLink}>FAQ</Link>
            <a href="mailto:smartonboardai@gmail.com" className={styles.footerLink}>Contact</a>
          </div>

          {/* Legal Column */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Legal</h4>
            <Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link>
            <Link href="/terms" className={styles.footerLink}>Terms &amp; Conditions</Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} PostPilot. All rights reserved. Made in India 🇮🇳
          </p>
          <div className={styles.socials}>
            <a href="https://twitter.com/postpilot" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Twitter">
              𝕏
            </a>
            <a href="https://linkedin.com/company/postpilot" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
              in
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
