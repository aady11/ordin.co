import React, { useState, useEffect } from 'react';
import { insights, patternCards } from '../data/mockData';

const metrics = [
  { label: 'Decisions Logged', value: '47' },
  { label: 'Patterns Identified', value: '3' },
  { label: 'Risk Flagged', value: 'Rs 2.1L' },
  { label: 'Accuracy', value: '91%' },
];

const OrdinInsightPage: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [insightIdx, setInsightIdx] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleNextInsight = () => {
    setTransitioning(true);
    setTimeout(() => {
      setInsightIdx((prev) => (prev + 1) % insights.length);
      setTransitioning(false);
    }, 220);
  };

  const currentInsight = insights[insightIdx];

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(8px)',
      transition: 'opacity 250ms ease, transform 250ms ease',
    }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: '#EFF6FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.5px' }}>
            Ordin Insight
          </h1>
        </div>
        <p style={{ color: '#64748B', fontSize: '14px', lineHeight: 1.6, maxWidth: '560px' }}>
          Ordin has been analysing your decision history.{' '}
          <span style={{ color: '#0F172A', fontWeight: 500 }}>Patterns identified across 47 logged decisions over 6 months.</span>
        </p>
      </div>

      {/* PRIMARY INSIGHT CARD */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        border: '1px solid #F1F5F9',
        borderLeft: '4px solid #2563EB',
        padding: '28px 28px 24px',
        marginBottom: '20px',
        opacity: transitioning ? 0 : 1,
        transform: transitioning ? 'translateY(6px)' : 'translateY(0)',
        transition: 'opacity 220ms ease, transform 220ms ease',
      }}>
        {/* Top row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '16px',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{
              backgroundColor: '#EFF6FF',
              color: '#2563EB',
              fontSize: '11px',
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: '20px',
              letterSpacing: '0.2px',
            }}>
              Primary Insight
            </span>
            <span style={{
              backgroundColor: '#F0FDF4',
              color: '#059669',
              fontSize: '11px',
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: '20px',
            }}>
              {insightIdx + 1} / {insights.length}
            </span>
          </div>
          <div style={{
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 600,
            padding: '5px 12px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <span style={{ color: '#86EFAC' }}>●</span>
            Confidence: {currentInsight.confidence}%
          </div>
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: '19px',
          fontWeight: 700,
          color: '#0F172A',
          letterSpacing: '-0.3px',
          marginBottom: '12px',
          lineHeight: 1.35,
        }}>
          {currentInsight.title}
        </h2>

        {/* Body */}
        <p style={{
          fontSize: '14.5px',
          color: '#475569',
          lineHeight: 1.7,
          marginBottom: '24px',
          maxWidth: '720px',
        }}>
          {currentInsight.body}
        </p>

        {/* Tag + Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              backgroundColor: '#F1F5F9',
              color: '#64748B',
              fontSize: '12px',
              fontWeight: 500,
              padding: '5px 12px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <span>🏷</span> {currentInsight.tag}
            </span>
            {/* Dot indicators */}
            <div style={{ display: 'flex', gap: '5px' }}>
              {insights.map((_, i) => (
                <div key={i} style={{
                  width: i === insightIdx ? '18px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  backgroundColor: i === insightIdx ? '#2563EB' : '#CBD5E1',
                  transition: 'all 0.3s ease',
                }} />
              ))}
            </div>
          </div>

          <button
            onClick={handleNextInsight}
            style={{
              padding: '10px 20px',
              backgroundColor: '#2563EB',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontSize: '13.5px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background-color 0.15s ease',
              letterSpacing: '0.1px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1D4ED8')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563EB')}
          >
            Generate Next Insight
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>

      {/* 3 pattern cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '14px',
        marginBottom: '24px',
      }}>
        {patternCards.map((card) => (
          <div
            key={card.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '10px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              border: '1px solid #F1F5F9',
              padding: '18px 20px',
              display: 'flex',
              gap: '14px',
              alignItems: 'flex-start',
              transition: 'box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)')}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              flexShrink: 0,
            }}>
              {card.icon}
            </div>
            <div>
              <h3 style={{ fontSize: '13.5px', fontWeight: 650, color: '#0F172A', marginBottom: '5px' }}>
                {card.label}
              </h3>
              <p style={{ fontSize: '12.5px', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Metrics row */}
      <div style={{
        backgroundColor: '#0F172A',
        borderRadius: '10px',
        padding: '20px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '20px',
      }}>
        {metrics.map((m, idx) => (
          <div key={idx} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.5px' }}>
              {m.value}
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '3px', fontWeight: 400 }}>
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdinInsightPage;
