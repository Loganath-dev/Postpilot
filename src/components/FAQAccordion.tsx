'use client';

import { useState } from 'react';
import styles from './FAQAccordion.module.css';
import type { FAQ } from '@/data/faqs';

interface FAQAccordionProps {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className={styles.accordion} id="faq-accordion">
      {faqs.map((faq) => (
        <div
          key={faq.id}
          className={`${styles.item} ${openId === faq.id ? styles.open : ''}`}
        >
          <button
            className={styles.trigger}
            onClick={() => toggle(faq.id)}
            aria-expanded={openId === faq.id}
            id={`faq-trigger-${faq.id}`}
          >
            <span className={styles.question}>{faq.question}</span>
            <span className={styles.icon}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d={openId === faq.id ? "M4 10H16" : "M10 4V16M4 10H16"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </button>
          <div className={styles.content}>
            <div className={styles.answer}>{faq.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
