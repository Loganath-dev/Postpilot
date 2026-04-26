import styles from './PlatformComparison.module.css';

const comparisons = [
  { dimension: "Content length", linkedin: "150–350 words per post. Story arc expected.", x: "1–5 lines per tweet. Threads: 8–12 tweets." },
  { dimension: "Hook style", linkedin: "Story opener, vulnerable admission, professional insight", x: "Curiosity gap, contrarian, bold statement" },
  { dimension: "Tone", linkedin: "Professional but human. Relatable vulnerability.", x: "Personality-forward. Wit. Directness." },
  { dimension: "Format", linkedin: "Paragraphs. Numbered lists. Bold first line.", x: "Line breaks after every 1–2 sentences. Short." },
  { dimension: "Virality driver", linkedin: "Comment volume, dwell time, saves, early likes", x: "Retweets, saves, thread format, reply engagement" },
  { dimension: "Best input types", linkedin: "Failure stories, milestones, lessons, career moments", x: "Observations, threads, hot takes, behind-the-scenes" },
  { dimension: "Hashtags", linkedin: "3–5 targeted hashtags. Niche works best.", x: "0–2 max. Often none for quality accounts." },
  { dimension: "Posting frequency", linkedin: "1× per day maximum. Quality over quantity.", x: "1–5× per day acceptable." },
];

export default function PlatformComparison() {
  return (
    <section className={`section ${styles.platform}`} id="platform-strategy">
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Platform Strategy</span>
          <h2 className="section-title">LinkedIn vs X — Two Platforms, Two Strategies</h2>
          <p className="section-subtitle">
            PostPilot automatically adapts everything — format, tone, hooks, hashtags — based on your selected platform.
          </p>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.dimCol}>Dimension</th>
                <th className={styles.platCol}>
                  <span className={styles.platBadge} style={{ background: 'rgba(0, 119, 181, 0.15)', color: '#0077b5', borderColor: 'rgba(0, 119, 181, 0.3)' }}>
                    LinkedIn
                  </span>
                </th>
                <th className={styles.platCol}>
                  <span className={styles.platBadge} style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', borderColor: 'rgba(99, 102, 241, 0.3)' }}>
                    X (Twitter)
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, i) => (
                <tr key={i}>
                  <td className={styles.dimension}>{row.dimension}</td>
                  <td className={styles.value}>{row.linkedin}</td>
                  <td className={styles.value}>{row.x}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
