'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './TestimonialCarousel.module.css';
import type { Testimonial } from '@/data/testimonials';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, next]);

  return (
    <div
      className={styles.carousel}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      id="testimonial-carousel"
    >
      <div className={styles.track}>
        {testimonials.map((t, i) => (
          <div
            key={t.id}
            className={`${styles.card} ${i === current ? styles.active : ''}`}
          >
            <div className={styles.stars}>
              {Array.from({ length: t.rating }, (_, j) => (
                <span key={j} className={styles.star}>★</span>
              ))}
            </div>
            <blockquote className={styles.quote}>
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className={styles.author}>
              <div className={styles.avatar}>{t.avatar}</div>
              <div className={styles.authorInfo}>
                <div className={styles.name}>{t.name}</div>
                <div className={styles.role}>{t.role}</div>
              </div>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricIcon}>📈</span>
              {t.metric}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <button className={styles.navBtn} onClick={prev} aria-label="Previous testimonial" id="testimonial-prev">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div className={styles.dots}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.activeDot : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
        <button className={styles.navBtn} onClick={next} aria-label="Next testimonial" id="testimonial-next">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  );
}
