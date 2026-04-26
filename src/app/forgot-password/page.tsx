'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import styles from '../auth.module.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Success! Check your email for a password reset link.');
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h1 className={styles.title}>Reset Password</h1>
        <p className={styles.subtitle} style={{ marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Enter your email address and we'll send you a link to reset your password.
        </p>
        
        {error && <div className={styles.error}>{error}</div>}
        {message && <div className={styles.success} style={{ color: '#059669', backgroundColor: '#d1fae5', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.9rem', border: '1px solid #34d399' }}>{message}</div>}

        <form onSubmit={handleReset}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Sending link...' : 'Send reset link'}
          </button>
        </form>
        
        <p className={styles.linkText} style={{ marginTop: '1.5rem' }}>
          Remembered your password? <Link href="/login" className={styles.link}>Log in</Link>
        </p>
      </div>
    </div>
  );
}
