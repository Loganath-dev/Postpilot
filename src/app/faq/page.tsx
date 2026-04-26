import FAQAccordion from '@/components/FAQAccordion';
import { faqs } from '@/data/faqs';
import type { Metadata } from 'next';
import styles from './faq.module.css';

export const metadata: Metadata = {
  title: 'FAQ — PostPilot',
  description: 'Frequently asked questions about PostPilot — the AI-powered social media post generator that creates content in your unique writing style.',
};

export default function FAQPage() {
  return (
    <div className={styles.faqPage}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">FAQ</span>
          <h1 className="section-title">Frequently Asked Questions</h1>
          <p className="section-subtitle">
            Everything you need to know about PostPilot, Style Training, pricing, and more.
          </p>
        </div>
        <FAQAccordion faqs={faqs} />

        <div className={styles.contact}>
          <h3>Still have questions?</h3>
          <p>We&apos;re here to help. Reach out to our team.</p>
          <a href="mailto:smartonboardai@gmail.com" className="btn btn-secondary">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
