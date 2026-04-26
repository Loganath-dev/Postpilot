import type { Metadata } from 'next';
import styles from './legal.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy — PostPilot',
  description: 'PostPilot Privacy Policy. Compliant with India\'s Digital Personal Data Protection Act 2023 (DPDP Act) and Information Technology Act 2000.',
};

export default function PrivacyPolicy() {
  return (
    <div className={styles.legalPage}>
      <div className="container">
        <article className={styles.article}>
          <header className={styles.header}>
            <span className="section-label">Legal</span>
            <h1 className={styles.title}>Privacy Policy</h1>
            <p className={styles.lastUpdated}>Last Updated: April 2026</p>
          </header>

          <div className={styles.content}>
            <section>
              <h2>1. Introduction</h2>
              <p>
                PostPilot (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting the privacy and personal data of our users (&ldquo;you&rdquo; or &ldquo;Data Principal&rdquo;). This Privacy Policy explains how we collect, use, store, and protect your personal data in compliance with the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>, the <strong>Information Technology Act, 2000 (IT Act)</strong>, and the <strong>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 (SPDI Rules)</strong>.
              </p>
              <p>
                By using PostPilot, you consent to the practices described in this Privacy Policy.
              </p>
            </section>

            <section>
              <h2>2. Data Fiduciary Information</h2>
              <p>PostPilot operates as a <strong>Data Fiduciary</strong> under the DPDP Act, 2023.</p>
              <ul>
                <li><strong>Registered Name:</strong> PostPilot Technologies Private Limited</li>
                <li><strong>Registered Address:</strong> India</li>
                <li><strong>Grievance Officer:</strong> grievance@postpilot.in</li>
                <li><strong>Contact Email:</strong> privacy@postpilot.in</li>
              </ul>
            </section>

            <section>
              <h2>3. Personal Data We Collect</h2>
              <p>We collect the following categories of personal data:</p>
              <h3>3.1 Data Provided by You</h3>
              <ul>
                <li><strong>Account Information:</strong> Name, email address, profile picture (via authentication provider)</li>
                <li><strong>Payment Information:</strong> Processed securely through Stripe. We do not store credit/debit card numbers.</li>
                <li><strong>Content Data:</strong> Posts, text content, images, and screenshots you upload for content generation</li>
                <li><strong>Style Training Data:</strong> Past posts you provide for Writing DNA™ profile creation</li>
              </ul>
              <h3>3.2 Data Collected Automatically</h3>
              <ul>
                <li><strong>Usage Data:</strong> Features used, session duration, content generated, feature interactions</li>
                <li><strong>Device Data:</strong> Browser type, operating system, device type, screen resolution</li>
                <li><strong>Log Data:</strong> IP address (anonymized), access times, referring URLs</li>
                <li><strong>Cookies:</strong> Essential cookies for authentication and session management</li>
              </ul>
            </section>

            <section>
              <h2>4. Purpose of Data Processing</h2>
              <p>We process your personal data for the following lawful purposes:</p>
              <ul>
                <li><strong>Service Delivery:</strong> To generate social media content personalized to your writing style</li>
                <li><strong>Style Training:</strong> To create and improve your personal Writing DNA™ profile using uploaded past posts</li>
                <li><strong>Account Management:</strong> Authentication, subscription management, and payment processing</li>
                <li><strong>Product Improvement:</strong> Analytics to improve features, performance, and user experience</li>
                <li><strong>Communication:</strong> Service updates, support responses, and product announcements (with opt-out)</li>
                <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes</li>
              </ul>
            </section>

            <section>
              <h2>5. Legal Basis for Processing (DPDP Act)</h2>
              <p>Under the DPDP Act, 2023, we process personal data based on:</p>
              <ul>
                <li><strong>Consent:</strong> Your explicit consent provided during registration and use of services</li>
                <li><strong>Legitimate Uses:</strong> As specified under Section 7 of the DPDP Act for performing contractual obligations</li>
                <li><strong>Legal Obligation:</strong> To comply with Indian law and regulatory requirements</li>
              </ul>
            </section>

            <section>
              <h2>6. Data Storage and Security</h2>
              <h3>6.1 Storage</h3>
              <ul>
                <li>User data is stored on <strong>Supabase</strong> cloud infrastructure with data centres providing enterprise-grade security</li>
                <li>Writing DNA™ profiles are stored as vector embeddings in PostgreSQL with pgvector</li>
                <li>Images are processed through <strong>Cloudinary</strong> with automatic encryption and CDN delivery</li>
                <li>Payment data is processed through <strong>Stripe</strong>, which is PCI DSS Level 1 compliant</li>
              </ul>
              <h3>6.2 Security Measures</h3>
              <ul>
                <li>SSL/TLS encryption for all data in transit</li>
                <li>AES-256 encryption for data at rest</li>
                <li>Row-level security (RLS) in the database</li>
                <li>Regular security audits and penetration testing</li>
                <li>Access controls with principle of least privilege</li>
                <li>Two-factor authentication for administrative access</li>
              </ul>
              <p>
                These measures comply with the <strong>reasonable security practices</strong> required under Section 8A of the IT Act, 2000 and Rule 8 of the SPDI Rules, 2011.
              </p>
            </section>

            <section>
              <h2>7. Data Sharing and Third Parties</h2>
              <p>We <strong>do not sell</strong> your personal data. We share data only with:</p>
              <ul>
                <li><strong>Anthropic (Claude API):</strong> For AI content generation. Content is processed and not stored by Anthropic for training.</li>
                <li><strong>Supabase:</strong> Database and authentication infrastructure</li>
                <li><strong>Stripe:</strong> Payment processing</li>
                <li><strong>Cloudinary:</strong> Image processing and delivery</li>
                <li><strong>Vercel:</strong> Application hosting and delivery</li>
                <li><strong>PostHog:</strong> Privacy-focused analytics (no PII tracked)</li>
              </ul>
              <p>All third-party processors are bound by data processing agreements and are contractually required to protect your data.</p>
            </section>

            <section>
              <h2>8. Your Rights (Under DPDP Act, 2023)</h2>
              <p>As a Data Principal, you have the following rights:</p>
              <ul>
                <li><strong>Right to Access:</strong> Request a summary of your personal data being processed and the processing activities (Section 11)</li>
                <li><strong>Right to Correction:</strong> Request correction or completion of inaccurate or incomplete personal data (Section 12)</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal data when it is no longer necessary for the purpose collected (Section 12)</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw previously given consent at any time (Section 6(6)). Withdrawal does not affect lawfulness of processing before withdrawal.</li>
                <li><strong>Right to Grievance Redressal:</strong> Lodge a complaint with our Grievance Officer or the Data Protection Board of India (Section 13)</li>
                <li><strong>Right to Nominate:</strong> Nominate another individual to exercise your rights in case of death or incapacity (Section 14)</li>
              </ul>
              <p>To exercise any of these rights, email: <strong>privacy@postpilot.in</strong></p>
            </section>

            <section>
              <h2>9. Data Retention</h2>
              <ul>
                <li><strong>Account data:</strong> Retained as long as your account is active</li>
                <li><strong>Generated content:</strong> Stored for 90 days after generation, then automatically deleted</li>
                <li><strong>Writing DNA™ profiles:</strong> Retained until account deletion or profile reset</li>
                <li><strong>Payment records:</strong> Retained for 8 years as required under Indian tax law</li>
                <li><strong>Analytics data:</strong> Retained for 24 months in anonymized form</li>
              </ul>
              <p>Upon account deletion, all personal data is permanently erased within 30 days, except where retention is required by Indian law.</p>
            </section>

            <section>
              <h2>10. Children&apos;s Privacy</h2>
              <p>
                PostPilot does not knowingly collect personal data from children under 18 years of age. In compliance with Section 9 of the DPDP Act, 2023, we require verifiable parental consent before processing any data of individuals below the age of 18. If we become aware that we have collected data from a minor without proper consent, we will delete it immediately.
              </p>
            </section>

            <section>
              <h2>11. Cross-Border Data Transfer</h2>
              <p>
                Your data may be processed by third-party services with servers outside India. Such transfers comply with Section 16 of the DPDP Act, 2023 and are made only to jurisdictions or entities that ensure an adequate level of data protection. We ensure appropriate contractual safeguards (Standard Contractual Clauses) are in place.
              </p>
            </section>

            <section>
              <h2>12. Cookies Policy</h2>
              <p>We use the following types of cookies:</p>
              <ul>
                <li><strong>Essential Cookies:</strong> Required for authentication, security, and basic functionality</li>
                <li><strong>Analytics Cookies:</strong> To understand usage patterns (PostHog, privacy-focused)</li>
              </ul>
              <p>We do not use advertising cookies or tracking cookies. You can manage cookie preferences through your browser settings.</p>
            </section>

            <section>
              <h2>13. Grievance Redressal</h2>
              <p>In compliance with Rule 5(9) of the SPDI Rules, 2011, and Section 13 of the DPDP Act, 2023:</p>
              <ul>
                <li><strong>Grievance Officer:</strong> Privacy Team, PostPilot</li>
                <li><strong>Email:</strong> grievance@postpilot.in</li>
                <li><strong>Response Time:</strong> Within 30 days of receipt of complaint</li>
              </ul>
              <p>
                If you are unsatisfied with our response, you may escalate your complaint to the <strong>Data Protection Board of India</strong> as established under the DPDP Act, 2023.
              </p>
            </section>

            <section>
              <h2>14. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Material changes will be communicated via email or in-app notification. Continued use of PostPilot after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2>15. Governing Law</h2>
              <p>
                This Privacy Policy is governed by the laws of India, including the Digital Personal Data Protection Act, 2023, the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011. Any disputes shall be subject to the exclusive jurisdiction of the courts in India.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
