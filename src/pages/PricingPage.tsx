import React, { useEffect, useState } from 'react';

const plans = [
  {
    name: 'Starter',
    monthlyPrice: '15,000',
    annualPrice: '1,80,000',
    badge: null,
    tagline: 'For businesses with 20 to 100 employees',
    features: [
      'Business Pulse (up to 10 alerts)',
      'Decision Journal (unlimited)',
      'Basic Insights (monthly)',
      'Compliance Tracker (5 deadlines)',
      'Email support',
    ],
    ctaLabel: 'Start Free Trial',
    ctaStyle: 'outline' as const,
  },
  {
    name: 'Growth',
    monthlyPrice: '35,000',
    annualPrice: '4,20,000',
    badge: 'MOST POPULAR',
    tagline: 'For businesses with 100 to 300 employees',
    features: [
      'Everything in Starter',
      'Advanced Insights (weekly)',
      'Vendor Intelligence module',
      'Decision DNA report (quarterly)',
      'Priority support',
      'Up to 5 team members',
    ],
    ctaLabel: 'Start Free Trial',
    ctaStyle: 'filled' as const,
  },
  {
    name: 'Enterprise',
    monthlyPrice: '75,000',
    annualPrice: '9,00,000',
    badge: null,
    tagline: 'For businesses with 300+ employees',
    features: [
      'Everything in Growth',
      'Custom AI Department Modules',
      'Dedicated onboarding manager',
      'On-premise deployment option',
      'SLA guarantee',
      'Unlimited team members',
      'Monthly strategy call',
    ],
    ctaLabel: 'Contact Sales',
    ctaStyle: 'dark' as const,
  },
];

const trustBadges = [
  { icon: '🎯', label: '30-Day Free Trial' },
  { icon: '🔄', label: 'Refund Guarantee' },
  { icon: '✓', label: 'No Setup Fee' },
  { icon: '🚪', label: 'Cancel Anytime' },
];

const PricingPage: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(8px)',
      transition: 'opacity 250ms ease, transform 250ms ease',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#0F172A',
          letterSpacing: '-0.5px',
          marginBottom: '10px',
        }}>
          Simple, honest pricing.
        </h1>
        <p style={{ color: '#64748B', fontSize: '15px', maxWidth: '440px', margin: '0 auto', lineHeight: 1.6 }}>
          Start with one workflow. Expand as Ordin proves its value to your business.
        </p>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: '#F0FDF4',
          border: '1px solid #BBF7D0',
          borderRadius: '20px',
          padding: '5px 14px',
          marginTop: '14px',
        }}>
          <span style={{ color: '#059669', fontSize: '13px', fontWeight: 600 }}>✓ All prices billed annually in Indian Rupees</span>
        </div>
      </div>

      {/* Pricing cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '36px',
        alignItems: 'start',
      }}>
        {plans.map((plan) => {
          const isFilled = plan.ctaStyle === 'filled';
          const isDark = plan.ctaStyle === 'dark';
          const isPopular = !!plan.badge;

          return (
            <div
              key={plan.name}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                boxShadow: isPopular
                  ? '0 4px 24px rgba(37,99,235,0.15), 0 1px 3px rgba(0,0,0,0.08)'
                  : '0 1px 3px rgba(0,0,0,0.08)',
                border: isPopular ? '2px solid #2563EB' : '1px solid #F1F5F9',
                padding: '28px 24px',
                position: 'relative',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = isPopular
                  ? '0 8px 32px rgba(37,99,235,0.2), 0 2px 8px rgba(0,0,0,0.08)'
                  : '0 4px 16px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = isPopular
                  ? '0 4px 24px rgba(37,99,235,0.15), 0 1px 3px rgba(0,0,0,0.08)'
                  : '0 1px 3px rgba(0,0,0,0.08)';
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#2563EB',
                  color: '#FFFFFF',
                  fontSize: '10.5px',
                  fontWeight: 700,
                  padding: '4px 14px',
                  borderRadius: '20px',
                  letterSpacing: '0.5px',
                  whiteSpace: 'nowrap',
                }}>
                  {plan.badge}
                </div>
              )}

              {/* Plan name */}
              <div style={{ marginBottom: '16px' }}>
                <h2 style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#0F172A',
                  marginBottom: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  {plan.name}
                </h2>
                <p style={{ color: '#64748B', fontSize: '12.5px' }}>{plan.tagline}</p>
              </div>

              {/* Price */}
              <div style={{ marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '14px', color: '#64748B', fontWeight: 500 }}>Rs</span>
                  <span style={{
                    fontSize: '34px',
                    fontWeight: 800,
                    color: '#0F172A',
                    letterSpacing: '-1px',
                    lineHeight: 1,
                  }}>
                    {plan.monthlyPrice}
                  </span>
                  <span style={{ fontSize: '14px', color: '#94A3B8', fontWeight: 400 }}>/month</span>
                </div>
                <p style={{ color: '#94A3B8', fontSize: '12px' }}>
                  Billed annually as <span style={{ color: '#64748B', fontWeight: 600 }}>Rs {plan.annualPrice}/year</span>
                </p>
              </div>

              {/* Features */}
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 24px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}>
                {plan.features.map((feature, idx) => (
                  <li key={idx} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    fontSize: '13.5px',
                    color: '#374151',
                    lineHeight: 1.4,
                  }}>
                    <span style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: isPopular ? '#EFF6FF' : '#F0FDF4',
                      color: isPopular ? '#2563EB' : '#059669',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 700,
                      flexShrink: 0,
                      marginTop: '1px',
                    }}>
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA button */}
              <button
                style={{
                  width: '100%',
                  padding: '11px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.15s ease',
                  letterSpacing: '0.1px',
                  ...(isFilled ? {
                    backgroundColor: '#2563EB',
                    color: '#FFFFFF',
                    border: 'none',
                  } : isDark ? {
                    backgroundColor: '#0F172A',
                    color: '#FFFFFF',
                    border: 'none',
                  } : {
                    backgroundColor: 'transparent',
                    color: '#2563EB',
                    border: '1.5px solid #2563EB',
                  }),
                }}
                onMouseEnter={(e) => {
                  if (isFilled) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1D4ED8';
                  else if (isDark) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1E293B';
                  else (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#EFF6FF';
                }}
                onMouseLeave={(e) => {
                  if (isFilled) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#2563EB';
                  else if (isDark) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#0F172A';
                  else (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                }}
              >
                {plan.ctaLabel}
              </button>
            </div>
          );
        })}
      </div>

      {/* Guarantee box */}
      <div style={{
        backgroundColor: '#F8FAFC',
        border: '1px solid #E2E8F0',
        borderRadius: '10px',
        padding: '24px 28px',
        marginBottom: '24px',
        textAlign: 'center',
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#EFF6FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 12px',
          fontSize: '18px',
        }}>
          🛡
        </div>
        <p style={{
          color: '#374151',
          fontSize: '14.5px',
          lineHeight: 1.7,
          maxWidth: '600px',
          margin: '0 auto',
        }}>
          <strong style={{ color: '#0F172A' }}>Not sure which plan is right for you?</strong> Every plan starts with a{' '}
          <strong style={{ color: '#059669' }}>30-day free trial</strong>. If Ordin does not save you more than it costs in
          6 months — we refund the difference. No questions asked.
        </p>
      </div>

      {/* Trust badges */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        {trustBadges.map((badge, idx) => (
          <div key={idx} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '10px 18px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}>
            <span style={{ fontSize: '16px' }}>{badge.icon}</span>
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#374151' }}>{badge.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
