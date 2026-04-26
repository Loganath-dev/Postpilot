import Link from 'next/link';
import { blogPosts } from '@/data/blogs';
import type { Metadata } from 'next';
import styles from './blog.module.css';

export const metadata: Metadata = {
  title: 'Blog — PostPilot',
  description: 'Tips, strategies, and insights on social media content creation, personal branding, and AI-powered writing.',
};

export default function BlogPage() {
  return (
    <div className={styles.blogPage}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Blog</span>
          <h1 className="section-title">Insights & Strategies</h1>
          <p className="section-subtitle">
            Tips on content creation, personal branding, and making AI work for your writing style.
          </p>
        </div>

        <div className={styles.grid}>
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.card}>
              <div className={styles.cardContent}>
                <div className={styles.meta}>
                  <span className={styles.categoryBadge}>{post.category}</span>
                  <span>·</span>
                  <span>{new Date(post.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className={styles.cardTitle}>{post.title}</h2>
                <p className={styles.cardExcerpt}>{post.excerpt}</p>
                <div className={styles.readMore}>
                  Read article →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
