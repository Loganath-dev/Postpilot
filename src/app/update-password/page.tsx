'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import styles from '../auth.module.css';

export default function UpdatePassword() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Check if the user is actually in a recovery session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError('Your password reset link is invalid or has expired.');
      }
    };
    checkSession();
  }, [supabase.auth]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setMessage('Password updated successfully! Redirecting...');
      setTimeout(() => {
        router.push('/generate');
      }, 2000);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h1 className={styles.title}>Set New Password</h1>
        
        {error && <div className={styles.error}>{error}</div>}
        {message && <div className={styles.success} style={{ color: '#059669', backgroundColor: '#d1fae5', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.9rem', border: '1px solid #34d399' }}>{message}</div>}

        {!error || error.includes('invalid') === false ? (
          <form onSubmit={handleUpdate}>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="password">New Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
                minLength={6}
              />
            </div>
            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}
