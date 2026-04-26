import type { Metadata } from 'next';
import styles from '../privacy/legal.module.css';

export const metadata: Metadata = {
  title: 'Terms & Conditions — PostPilot',
  description: 'PostPilot Terms and Conditions. Governed by Indian law including the Consumer Protection Act 2019, IT Act 2000, and DPDP Act 2023.',
};

export default function TermsAndConditions() {
  return (
    <div className={styles.legalPage}>
      <div className="container">
        <article className={styles.article}>
          <header className={styles.header}>
            <span className="section-label">Legal</span>
            <h1 className={styles.title}>Terms &amp; Conditions</h1>
            <p className={styles.lastUpdated}>Last Updated: April 2025</p>
          </header>

          <div className={styles.content}>
            <section>
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing or using PostPilot (&ldquo;the Service&rdquo;), you agree to be bound by these Terms and Conditions (&ldquo;Terms&rdquo;). If you do not agree to these Terms, you may not use the Service. These Terms constitute a legally binding agreement between you (&ldquo;User&rdquo;) and PostPilot Technologies Private Limited (&ldquo;PostPilot,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
              </p>
            </section>

            <section>
              <h2>2. Description of Service</h2>
              <p>PostPilot is a social media post generator that:</p>
              <ul>
                <li>Turns photos, screenshots, tweets, and raw ideas into polished LinkedIn posts and X (Twitter) threads</li>
                <li>Provides Style Training functionality that learns your unique writing style from your past posts</li>
                <li>Offers Hook Generation, Thread Building, Tone Switch, and AI Chat Agent features</li>
                <li>Generates content personalized to your Writing DNA™ profile (for paid users)</li>
              </ul>
              <p>PostPilot is a content generation tool. We do not post, schedule, or publish content on your behalf. You are solely responsible for the content you publish.</p>
            </section>

            <section>
              <h2>3. Eligibility</h2>
              <ul>
                <li>You must be at least 18 years of age to use PostPilot. Users below 18 require verifiable parental consent as per the DPDP Act, 2023.</li>
                <li>You must provide accurate and complete registration information.</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              </ul>
            </section>

            <section>
              <h2>4. Account Registration</h2>
              <p>To use PostPilot, you must create an account. By registering, you agree to:</p>
              <ul>
                <li>Provide accurate, current, and complete information</li>
                <li>Update your information to keep it accurate and complete</li>
                <li>Be responsible for all activity under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
              <p>We reserve the right to suspend or terminate accounts that violate these Terms.</p>
            </section>

            <section>
              <h2>5. Subscription Plans and Payments</h2>
              <h3>5.1 Plans</h3>
              <ul>
                <li><strong>Free:</strong> ₹0/month — Limited features, no Style Training</li>
                <li><strong>Starter:</strong> ₹29/month (or ₹290/year) — Style Training, both platforms, expanded features</li>
                <li><strong>Pro:</strong> ₹49/month (or ₹490/year) — Full feature access, deepest style personalisation</li>
              </ul>
              <h3>5.2 Payment Processing</h3>
              <p>All payments are processed securely through <strong>Stripe</strong>. By subscribing, you authorise Stripe to charge your payment method on a recurring basis.</p>
              <h3>5.3 Student Discount</h3>
              <p>Students with a valid .edu email address are eligible for a 50% discount on Starter and Pro plans. We reserve the right to verify student status.</p>
              <h3>5.4 Automatic Renewal</h3>
              <p>Subscriptions renew automatically at the end of each billing cycle. You may cancel at any time through your account settings. Cancellation takes effect at the end of the current billing period.</p>
            </section>

            <section>
              <h2>6. Refund Policy</h2>
              <p>In compliance with the <strong>Consumer Protection Act, 2019</strong> and <strong>Consumer Protection (E-Commerce) Rules, 2020</strong>:</p>
              <ul>
                <li>You may request a full refund within <strong>7 days</strong> of your first paid subscription if you are not satisfied with the service.</li>
                <li>Refund requests must be submitted to <strong>smartonboardai@gmail.com</strong></li>
                <li>Refunds will be processed within 5–7 business days to the original payment method.</li>
                <li>After the 7-day window, no refunds will be issued for the current billing cycle. You may cancel to prevent future charges.</li>
                <li>Annual plan refunds are prorated based on unused months, minus a 10% processing fee.</li>
              </ul>
            </section>

            <section>
              <h2>7. Acceptable Use</h2>
              <p>You agree NOT to use PostPilot to:</p>
              <ul>
                <li>Generate content that is hateful, discriminatory, threatening, or harassing</li>
                <li>Create misleading, defamatory, or fraudulent content</li>
                <li>Produce spam or unsolicited commercial content at scale</li>
                <li>Impersonate another person or entity without their consent</li>
                <li>Generate content that infringes upon intellectual property rights</li>
                <li>Violate any applicable law, including the IT Act 2000 and its amendments</li>
                <li>Attempt to reverse-engineer, decompile, or exploit the Service</li>
                <li>Use automated scripts or bots to access the Service</li>
              </ul>
              <p>Violation of acceptable use policies may result in immediate account termination without refund.</p>
            </section>

            <section>
              <h2>8. Intellectual Property</h2>
              <h3>8.1 Your Content</h3>
              <p>You retain full ownership of all content you upload to PostPilot, including past posts, images, and generated output. By uploading content, you grant PostPilot a limited, non-exclusive licence to process your content solely for the purpose of providing the Service.</p>
              <h3>8.2 Generated Content</h3>
              <p>Content generated by PostPilot using your input belongs to you. You are free to use, modify, publish, and distribute generated content without attribution to PostPilot.</p>
              <h3>8.3 PostPilot Property</h3>
              <p>The PostPilot brand, logo, website design, AI models, algorithms, and documentation are the intellectual property of PostPilot Technologies Private Limited. You may not copy, modify, or distribute any PostPilot intellectual property without written permission.</p>
            </section>

            <section>
              <h2>9. AI-Generated Content Disclaimer</h2>
              <p>PostPilot uses artificial intelligence (Anthropic Claude) to generate content. You acknowledge that:</p>
              <ul>
                <li>AI-generated content may contain inaccuracies or errors. You are responsible for reviewing and editing all output before publishing.</li>
                <li>PostPilot does not guarantee that generated content will go viral, receive engagement, or achieve any specific outcome.</li>
                <li>You are solely responsible for the content you publish on social media platforms.</li>
                <li>AI output should be reviewed for factual accuracy, appropriateness, and compliance with platform guidelines.</li>
              </ul>
            </section>

            <section>
              <h2>10. Service Availability</h2>
              <ul>
                <li>We strive for 99.9% uptime but do not guarantee uninterrupted service.</li>
                <li>Scheduled maintenance will be communicated in advance when possible.</li>
                <li>We are not liable for downtime caused by third-party services (Anthropic, Supabase, Stripe, Vercel).</li>
                <li>In case of extended outages (exceeding 72 hours), affected paid users will receive prorated credits.</li>
              </ul>
            </section>

            <section>
              <h2>11. Limitation of Liability</h2>
              <p>To the maximum extent permitted by Indian law:</p>
              <ul>
                <li>PostPilot is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, express or implied.</li>
                <li>We do not guarantee that the Service will be error-free or meet your specific requirements.</li>
                <li>Our total liability for any claim arising from the Service shall not exceed the amount you paid to PostPilot in the 12 months preceding the claim.</li>
                <li>We are not liable for indirect, incidental, special, consequential, or punitive damages.</li>
                <li>We are not liable for loss of content, data, revenue, or reputation arising from use of the Service.</li>
              </ul>
            </section>

            <section>
              <h2>12. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless PostPilot, its directors, employees, and agents from any claims, damages, losses, and expenses (including legal fees) arising from your use of the Service, violation of these Terms, or infringement of any third-party rights.
              </p>
            </section>

            <section>
              <h2>13. Termination</h2>
              <ul>
                <li><strong>By You:</strong> You may delete your account at any time from account settings. Active subscriptions will be cancelled and data deleted within 30 days.</li>
                <li><strong>By Us:</strong> We may suspend or terminate your account for violation of these Terms, with notice where practicable.</li>
                <li><strong>Effect:</strong> Upon termination, your access to the Service ceases. Data deletion follows our Privacy Policy retention schedule.</li>
              </ul>
            </section>

            <section>
              <h2>14. Dispute Resolution</h2>
              <p>In compliance with the <strong>Consumer Protection Act, 2019</strong>:</p>
              <ul>
                <li>We encourage you to contact us first at <strong>smartonboardai@gmail.com</strong> for resolution of any disputes.</li>
                <li>If informal resolution fails, disputes shall be referred to <strong>mediation</strong> before initiating legal proceedings.</li>
                <li>You may also file a complaint with the appropriate <strong>Consumer Disputes Redressal Commission</strong> under the Consumer Protection Act, 2019.</li>
                <li>Any unresolved disputes shall be subject to arbitration under the <strong>Arbitration and Conciliation Act, 1996</strong>, with the seat of arbitration in India.</li>
              </ul>
            </section>

            <section>
              <h2>15. Governing Law</h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of India, including but not limited to:
              </p>
              <ul>
                <li>The Indian Contract Act, 1872</li>
                <li>The Information Technology Act, 2000</li>
                <li>The Digital Personal Data Protection Act, 2023</li>
                <li>The Consumer Protection Act, 2019</li>
                <li>The Consumer Protection (E-Commerce) Rules, 2020</li>
              </ul>
              <p>Any disputes shall be subject to the exclusive jurisdiction of the courts in India.</p>
            </section>

            <section>
              <h2>16. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Material changes will be communicated via email or in-app notification at least 15 days before they take effect. Continued use of PostPilot after changes constitutes acceptance of the updated Terms. If you do not agree with the changes, you may discontinue use and delete your account.
              </p>
            </section>

            <section>
              <h2>17. Severability</h2>
              <p>
                If any provision of these Terms is found invalid or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect.
              </p>
            </section>

            <section>
              <h2>18. Contact Information</h2>
              <ul>
                <li><strong>General Support:</strong> smartonboardai@gmail.com</li>
                <li><strong>Billing &amp; Refunds:</strong> smartonboardai@gmail.com</li>
                <li><strong>Privacy &amp; Data:</strong> smartonboardai@gmail.com</li>
                <li><strong>Grievance Officer:</strong> smartonboardai@gmail.com</li>
              </ul>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
