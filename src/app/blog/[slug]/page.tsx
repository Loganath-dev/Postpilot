import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts } from '@/data/blogs';
import type { Metadata } from 'next';
import styles from './blogPost.module.css';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} — PostPilot Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      if (line.startsWith('# ')) {
        // Skip the h1 since we render it separately
        i++;
        continue;
      } else if (line.startsWith('## ')) {
        elements.push(<h2 key={i} className={styles.h2}>{line.replace('## ', '')}</h2>);
      } else if (line.startsWith('### ')) {
        elements.push(<h3 key={i} className={styles.h3}>{line.replace('### ', '')}</h3>);
      } else if (line.startsWith('> *')) {
        elements.push(
          <blockquote key={i} className={styles.blockquote}>
            <em>{line.replace(/^>\s*\*/, '').replace(/\*$/, '')}</em>
          </blockquote>
        );
      } else if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={i} className={styles.blockquote}>
            {line.replace('> ', '')}
          </blockquote>
        );
      } else if (line.startsWith('- **')) {
        elements.push(
          <li key={i} className={styles.li}>
            <span dangerouslySetInnerHTML={{ __html: line.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          </li>
        );
      } else if (line.startsWith('- ')) {
        elements.push(
          <li key={i} className={styles.li}>{line.replace('- ', '')}</li>
        );
      } else if (line.startsWith('**') && line.endsWith('**')) {
        elements.push(
          <p key={i} className={styles.bold}><strong>{line.replace(/\*\*/g, '')}</strong></p>
        );
      } else if (line.trim() === '') {
        // skip empty lines
      } else {
        // Regular paragraph — handle inline bold
        elements.push(
          <p key={i} className={styles.paragraph} dangerouslySetInnerHTML={{
            __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')
          }} />
        );
      }
      i++;
    }
    return elements;
  };

  return (
    <div className={styles.blogPost}>
      <div className="container">
        <Link href="/blog" className={styles.backLink}>
          ← Back to Blog
        </Link>

        <article className={styles.article}>
          <header className={styles.header}>
            <span className={styles.category}>{post.category}</span>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.meta}>
              <span>{post.author}</span>
              <span>·</span>
              <span>{new Date(post.date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </header>

          <div className={styles.content}>
            {renderContent(post.content)}
          </div>
        </article>

        <div className={styles.cta}>
          <h3>Ready to try PostPilot?</h3>
          <p>Turn your ideas into content that sounds like you.</p>
          <Link href="/#pricing" className="btn btn-primary">Start Free</Link>
        </div>
      </div>
    </div>
  );
}
