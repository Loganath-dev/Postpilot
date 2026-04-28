'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './PricingSection.module.css';
import { pricingTiers } from '@/data/pricing';
import { createClient } from '@/utils/supabase/client';

export default function PricingSection() {
  const [annual, setAnnual] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

    const handlePayment = async (tier: any) => {
  // Use the user from component state – it reflects the latest auth session
  if (!user) {
    router.push('/signup');
    return;
  }

  // Free plan – no payment needed
  if (tier.price === 0) {
    router.push('/generate');
    return;
  }

  setLoadingTier(tier.id);
  try {
    const res = await loadRazorpayScript();
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      setLoadingTier(null);
      return;
    }

    // 1. Create Order on Backend
    const amount = annual ? tier.annualPrice : tier.price;
    const orderRes = await fetch('/api/razorpay/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, planId: tier.id }),
    });
    const orderData = await orderRes.json();
    if (!orderRes.ok) throw new Error(orderData.error);

    // 2. Open Razorpay Checkout
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amount * 100,
      currency: 'INR',
      name: 'PostPilot',
      description: `${tier.name} Plan Upgrade`,
      order_id: orderData.orderId,
      handler: async function (response: any) {
        // 3. Verify Payment on Backend
        const verifyRes = await fetch('/api/razorpay/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            planId: tier.id,
          }),
        });
        if (verifyRes.ok) {
          alert('Payment Successful! Your account has been upgraded.');
          // Refresh Supabase session to get updated profile
          await supabase.auth.refreshSession();
          router.push('/dashboard');
        } else {
          const err = await verifyRes.json();
          alert('Payment verification failed: ' + (err.error || 'unknown error'));
        }
      },
      prefill: {
        email: user.email,
      },
      theme: { color: '#3b82f6' },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  } catch (error: any) {
    console.error(error);
    alert(error.message || 'Something went wrong.');
  } finally {
    setLoadingTier(null);
  }
};

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

              <button 
                onClick={() => handlePayment(tier)}
                disabled={loadingTier !== null}
                className={`btn ${tier.popular ? 'btn-primary' : 'btn-secondary'} ${styles.ctaBtn}`}
                style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                {loadingTier === tier.id ? 'Processing...' : tier.cta}
              </button>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
