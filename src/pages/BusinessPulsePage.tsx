import React, { useState, useEffect } from 'react';

interface AlertCard {
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  category: string;
  title: string;
  description: string;
  timestamp: string;
  actionLabel: string;
}

const alertCards: AlertCard[] = [
  {
    severity: 'CRITICAL',
    category: 'Supply Chain',
    title: 'Sharma Metals delivery overdue by 3 days',
    description: 'This is their third delay in the last 5 orders. Next scheduled delivery was 6 July. Production line at risk if not resolved by tomorrow.',
    timestamp: 'Detected 2 hours ago',
    actionLabel: 'Draft Notice',
  },
  {
    severity: 'HIGH',
    category: 'Inventory',
    title: 'Raw material stock at 11% of monthly requirement',
    description: 'Reorder point is 20%. At current consumption rate, stock runs out in 6 working days. Immediate procurement action needed.',
    timestamp: 'Updated 45 minutes ago',
    actionLabel: 'View Reorder Plan',
  },
  {
    severity: 'MEDIUM',
    category: 'Compliance',
    title: 'GST Q2 filing due in 11 days',
    description: 'Last quarter filing was submitted 2 days late resulting in Rs 12,000 penalty. Early action recommended to avoid repeat.',
    timestamp: 'Deadline: 20 July 2025',
    actionLabel: 'Initiate Filing',
  },
  {
    severity: 'MEDIUM',
    category: 'Finance',
    title: 'Cash shortfall of Rs 2.3L projected in Week 3',
    description: 'Based on current receivables and payables schedule. Three invoices totalling Rs 4.1L are pending collection from Mehta Traders.',
    timestamp: 'Forecast updated today',
    actionLabel: 'View Cashflow',
  },
];

const recommendedActions = [
  'Call Sharma Metals procurement lead and escalate delivery delay to director-level — today before 3 PM.',
  'Initiate emergency reorder for aluminium sheet stock from secondary vendor Patel Alloys — minimum 14-day buffer required.',
  'Assign one team member to begin GST Q2 documentation collation — target completion in 5 working days.',
];

const severityConfig = {
  CRITICAL: {
    bg: '#FEF2F2',
    border: '#DC2626',
    badgeBg: '#DC2626',
    badgeText: '#FFF',
    dot: '#DC2626',
  },
  HIGH: {
    bg: '#FFF7ED',
    border: '#D97706',
    badgeBg: '#D97706',
    badgeText: '#FFF',
    dot: '#D97706',
  },
  MEDIUM: {
    bg: '#FFFBEB',
    border: '#D97706',
    badgeBg: '#F59E0B',
    badgeText: '#FFF',
    dot: '#F59E0B',
  },
  LOW: {
    bg: '#F0FDF4',
    border: '#059669',
    badgeBg: '#059669',
    badgeText: '#FFF',
    dot: '#059669',
  },
};

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Good morning, Rajesh.';
  if (hour >= 12 && hour < 17) return 'Good afternoon, Rajesh.';
  if (hour >= 17 && hour < 21) return 'Good evening, Rajesh.';
  return 'Working late, Rajesh.';
}

const BusinessPulsePage: React.FC = () => {
  const [checked, setChecked] = useState<boolean[]>([false, false, false]);
  const [greeting] = useState(getGreeting);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const toggleCheck = (idx: number) => {
    setChecked((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(8px)',
      transition: 'opacity 250ms ease, transform 250ms ease',
    }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{
          fontSize: '26px',
          fontWeight: 700,
          color: '#0F172A',
          letterSpacing: '-0.5px',
          marginBottom: '6px',
        }}>
          {greeting}
        </h1>
        <p style={{ color: '#64748B', fontSize: '14px', fontWeight: 400 }}>
          Here is what needs your attention today — Wednesday, 9 July 2025
        </p>
      </div>

      {/* KPI Summary row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '12px',
        marginBottom: '28px',
      }}>
        {[
          { label: 'Active Alerts', value: '4', color: '#DC2626', bg: '#FEF2F2', icon: '🔴' },
          { label: 'Cash Position', value: 'Rs 18.4L', color: '#059669', bg: '#F0FDF4', icon: '💰' },
          { label: 'Stock Level', value: '11%', color: '#D97706', bg: '#FFF7ED', icon: '📦' },
          { label: 'Compliance', value: '11 days', color: '#64748B', bg: '#F8FAFC', icon: '📋' },
        ].map((kpi, i) => (
          <div key={i} style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            border: '1px solid #F1F5F9',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: kpi.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              flexShrink: 0,
            }}>
              {kpi.icon}
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: kpi.color, lineHeight: 1.2 }}>
                {kpi.value}
              </div>
              <div style={{ fontSize: '11.5px', color: '#94A3B8', fontWeight: 400, marginTop: '2px' }}>
                {kpi.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <span style={{
          fontSize: '12px',
          fontWeight: 600,
          color: '#64748B',
          letterSpacing: '0.6px',
          textTransform: 'uppercase',
        }}>
          Active Alerts
        </span>
        <span style={{
          backgroundColor: '#DC2626',
          color: '#FFF',
          borderRadius: '20px',
          padding: '1px 8px',
          fontSize: '11px',
          fontWeight: 700,
        }}>
          4
        </span>
      </div>

      {/* Alert cards — 2x2 grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '16px',
        marginBottom: '36px',
      }}>
        {alertCards.map((card, idx) => {
          const cfg = severityConfig[card.severity];
          return (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                border: '1px solid #F1F5F9',
                borderLeft: `4px solid ${cfg.border}`,
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                transition: 'box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
              }}
            >
              {/* Badges row */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{
                  backgroundColor: cfg.badgeBg,
                  color: cfg.badgeText,
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '4px',
                  letterSpacing: '0.5px',
                }}>
                  {card.severity}
                </span>
                <span style={{
                  backgroundColor: '#F1F5F9',
                  color: '#64748B',
                  fontSize: '11px',
                  fontWeight: 500,
                  padding: '3px 8px',
                  borderRadius: '4px',
                }}>
                  {card.category}
                </span>
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '15px',
                fontWeight: 650,
                color: '#0F172A',
                lineHeight: 1.4,
                margin: 0,
              }}>
                {card.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: '13.5px',
                color: '#475569',
                lineHeight: 1.6,
                margin: 0,
              }}>
                {card.description}
              </p>

              {/* Footer */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '4px',
              }}>
                <span style={{ color: '#94A3B8', fontSize: '12px' }}>{card.timestamp}</span>
                <button
                  style={{
                    padding: '7px 14px',
                    borderRadius: '7px',
                    border: '1.5px solid #2563EB',
                    backgroundColor: 'transparent',
                    color: '#2563EB',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    transition: 'all 0.15s ease',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#EFF6FF';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                  }}
                >
                  {card.actionLabel}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommended actions */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        border: '1px solid #F1F5F9',
        padding: '24px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '18px',
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            backgroundColor: '#EFF6FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div>
            <h2 style={{ fontSize: '15px', fontWeight: 650, color: '#0F172A', margin: 0 }}>
              Today's Recommended Actions
            </h2>
            <p style={{ fontSize: '12px', color: '#94A3B8', margin: 0 }}>
              {checked.filter(Boolean).length} of {recommendedActions.length} completed
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {recommendedActions.map((action, idx) => (
            <label
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                cursor: 'pointer',
                padding: '12px 14px',
                borderRadius: '8px',
                backgroundColor: checked[idx] ? '#F0FDF4' : '#F8FAFC',
                border: `1px solid ${checked[idx] ? '#BBF7D0' : '#E2E8F0'}`,
                transition: 'all 0.15s ease',
              }}
            >
              <input
                type="checkbox"
                checked={checked[idx]}
                onChange={() => toggleCheck(idx)}
                style={{
                  marginTop: '2px',
                  width: '16px',
                  height: '16px',
                  flexShrink: 0,
                  cursor: 'pointer',
                }}
              />
              <span style={{
                fontSize: '13.5px',
                color: checked[idx] ? '#059669' : '#374151',
                lineHeight: 1.5,
                textDecoration: checked[idx] ? 'line-through' : 'none',
                transition: 'all 0.15s ease',
              }}>
                {action}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessPulsePage;
