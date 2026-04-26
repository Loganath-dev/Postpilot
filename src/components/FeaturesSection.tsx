import styles from './FeaturesSection.module.css';
import { features } from '@/data/features';

export default function FeaturesSection() {
  const coreFeatures = features.filter(f => f.tier === 'core');
  const supportFeatures = features.filter(f => f.tier === 'supporting');

  return (
    <section className={`section ${styles.features}`} id="features">
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Features</span>
          <h2 className="section-title">Everything You Need to Create Content That Sounds Like You</h2>
          <p className="section-subtitle">
            From raw thought to polished post — powered by your personal **Writing DNA™**.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((feature) => (
            <div key={feature.id} className={styles.card} id={`feature-${feature.id}`}>
              {feature.badge && (
                <div className={styles.cardBadge}>{feature.badge}</div>
              )}
              <div className={styles.iconWrap}>
                <span className={styles.icon}>{feature.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDesc}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
