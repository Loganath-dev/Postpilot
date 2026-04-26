'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './PricingSection.module.css';
import { pricingTiers } from '@/data/pricing';

export default function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className={`section ${styles.pricing}`} id="pricing">
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Pricing</span>
          <h2 className="section-title">Simple, Transparent Pricing</h2>
          <p className="section-subtitle">
            Free forever. Upgrade when you want your content to sound like <em>you</em>.
          </p>

          <div className={styles.toggle}>
            <span className={`${styles.toggleLabel} ${!annual ? styles.activeLabel : ''}`}>Monthly</span>
            <button
              className={`${styles.toggleSwitch} ${annual ? styles.toggleActive : ''}`}
              onClick={() => setAnnual(!annual)}
              aria-label="Toggle annual billing"
              id="billing-toggle"
            >
              <span className={styles.toggleKnob} />
            </button>
            <span className={`${styles.toggleLabel} ${annual ? styles.activeLabel : ''}`}>
              Annual <span className={styles.saveBadge}>Save 2 months</span>
            </span>
          </div>
        </div>

        <div className={styles.grid}>
          {pricingTiers.map((tier) => (
            <div key={tier.id} className={`${styles.card} ${tier.popular ? styles.popular : ''}`} id={`pricing-${tier.id}`}>
              {tier.popular && <div className={styles.popularBadge}>Most Popular</div>}

              <div className={styles.cardHeader}>
                <h3 className={styles.tierName}>{tier.name}</h3>
                <div className={styles.price}>
                  <span className={styles.currency}>₹</span>
                  <span className={styles.amount}>
                    {tier.price === 0 ? '0' : annual ? Math.round(tier.annualPrice / 12) : tier.price}
                  </span>
                  <span className={styles.period}>/mo</span>
                </div>
                {annual && tier.price > 0 && (
                  <div className={styles.annualTotal}>₹{tier.annualPrice}/year</div>
                )}
                <p className={styles.tierDesc}>{tier.description}</p>
              </div>

              <ul className={styles.featureList}>
                {tier.features.map((f, i) => (
                  <li key={i} className={`${styles.featureItem} ${!f.included ? styles.excluded : ''}`}>
                    <span className={styles.featureIcon}>
                      {f.included ? '✓' : '—'}
                    </span>
                    <span className={styles.featureName}>{f.name}</span>
                    {f.detail && <span className={styles.featureDetail}>{f.detail}</span>}
                  </li>
                ))}
              </ul>

              <Link 
                href="/signup" 
                className={`btn ${tier.popular ? 'btn-primary' : 'btn-secondary'} ${styles.ctaBtn}`}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                {tier.cta}
              </Link>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
