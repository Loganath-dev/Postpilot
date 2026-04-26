import HeroSection from '@/components/HeroSection';
import ConversionDemo from '@/components/ConversionDemo';
import FeaturesSection from '@/components/FeaturesSection';
import PlatformComparison from '@/components/PlatformComparison';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import PricingSection from '@/components/PricingSection';
import FAQAccordion from '@/components/FAQAccordion';
import { testimonials } from '@/data/testimonials';
import { faqs } from '@/data/faqs';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ConversionDemo />

      {/* How It Works Section */}
      <section className={`section ${styles.howItWorks}`} id="how-it-works">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
            <span className="section-label">Features</span>
            <h2 className="section-title">The Complete Social Media Arsenal</h2>
            <p className="section-subtitle">
              Built to perfectly capture and scale your unique voice.
            </p>
          </div>
          
          <div className="grid-3">
            <div className={styles.featureCard}>
              <div className={styles.featureHeader}>
                <div className={styles.featureIconWrap}>
                  <span className={styles.featureIcon}>🧬</span>
                </div>
                <span className={styles.orangeBadge}>The Moat</span>
              </div>
              <h3 className={styles.featureTitle}>Style Training Engine</h3>
              <p className={styles.featureText}>
                Paste 5–10 of your past posts. AI analyses your sentence structure, vocabulary, emotional register, and personality. A personal Writing DNA™ profile is created — every post generated afterwards sounds like you.
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureHeader}>
                <div className={styles.featureIconWrap}>
                  <span className={styles.featureIcon}>🧠</span>
                </div>
                <span className={styles.orangeBadge}>New</span>
              </div>
              <h3 className={styles.featureTitle}>Platform Intelligence System</h3>
              <p className={styles.featureText}>
                Don't just convert content — adapt to algorithm behavior. Twitter gets curiosity gaps and short lines. LinkedIn gets storytelling and relatability. Your content, perfectly calibrated.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureHeader}>
                <div className={styles.featureIconWrap}>
                  <span className={styles.featureIcon}>📸</span>
                </div>
                <span className={styles.orangeBadge}>Viral Upgrade</span>
              </div>
              <h3 className={styles.featureTitle}>Multimodal Transformation</h3>
              <p className={styles.featureText}>
                Upload a photo, a screenshot of a tweet, hand-written notes, or someone else's post. Our app extracts the essence and transforms it into a custom LinkedIn post, X post, or viral Thread.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FeaturesSection />
      <PlatformComparison />

      {/* Testimonials */}
      <section className={`section ${styles.testimonials}`} id="testimonials">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
            <span className="section-label">Testimonials</span>
            <h2 className="section-title">Loved by Creators Who Demand Authenticity</h2>
            <p className="section-subtitle">
              Real users. Real results. Real writing styles preserved.
            </p>
          </div>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      <PricingSection />

      {/* FAQ Section */}
      <section className={`section ${styles.faqSection}`} id="faq">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
            <span className="section-label">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Everything you need to know about PostPilot.
            </p>
          </div>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* Final CTA */}
      <section className={`section ${styles.finalCta}`} id="cta">
        <div className="container">
          <div className={styles.ctaCard}>
            <div className={styles.ctaOrbs}>
              <div className="orb orb-1"></div>
              <div className="orb orb-2"></div>
            </div>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>
                Ready to Create Content That
                <br />
                <span className="text-gradient">Sounds Like You?</span>
              </h2>
              <p className={styles.ctaText}>
                Start free. No credit card. No robot output. Just your ideas, polished to perfection.
              </p>
              <div className={styles.ctaButtons}>
                <a href="/generate" className="btn btn-primary btn-lg">
                  Get Started — Free
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 9H13M13 9L9.5 5.5M13 9L9.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
                <a href="#conversions" className="btn btn-secondary btn-lg">
                  Watch Demos
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
