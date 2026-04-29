'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Navbar.module.css';
import { createClient } from '@/utils/supabase/client';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async (userId: string) => {
      const { data } = await supabase.from('profiles').select('tokens, plan_type').eq('id', userId).single();
      setProfile(data);
    };

    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      if (session?.user) fetchProfile(session.user.id);
    };
    
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      if (session?.user) fetchProfile(session.user.id);
      else setProfile(null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const navLinks = [
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Blog', href: '/blog' },
    { label: 'FAQ', href: '/faq' },
  ];

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} id="navbar">
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>⚡</span>
          <span className={styles.logoText}>PostPilot</span>
        </Link>

        <div className={`${styles.links} ${mobileOpen ? styles.open : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={styles.link}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className={styles.authGroup}>
            {user ? (
              <>
                <div className={styles.tokenDisplay}>
                  <span className={styles.tokenIcon}>🪙</span>
                  <span className={styles.tokenCount}>{profile?.tokens ?? '...'} tokens</span>
                  {profile?.plan_type && profile.plan_type !== 'free' && (
                    <span className={styles.planBadge}>{profile.plan_type}</span>
                  )}
                </div>
                <Link href="/generate" className={styles.link} onClick={() => setMobileOpen(false)}>
                  Dashboard
                </Link>
                <button onClick={handleSignOut} className={styles.createAccountBtn} style={{ cursor: 'pointer' }}>
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className={styles.signInLink} onClick={() => setMobileOpen(false)}>
                  Sign In
                </Link>
                <Link href="/signup" className={styles.createAccountBtn} onClick={() => setMobileOpen(false)}>
                  Create account
                </Link>
              </>
            )}
          </div>
        </div>

        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.active : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          id="mobile-menu-toggle"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
