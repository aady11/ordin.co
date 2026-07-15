import React from 'react';
import Logo from './Logo';
import { Page } from '../types';

interface TopNavbarProps {
  currentPage: Page;
  onMenuToggle: () => void;
}

const pageLabels: Record<Page, string> = {
  pulse: 'Business Pulse',
  journal: 'Decision Journal',
  insight: 'Ordin Insight',
  pricing: 'Pricing',
};

const TopNavbar: React.FC<TopNavbarProps> = ({ currentPage, onMenuToggle }) => {
  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #E2E8F0',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    }}>
      <Logo variant="light" />

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ color: '#64748B', fontSize: '13px', fontWeight: 500 }}>
          {pageLabels[currentPage]}
        </span>
        <button
          onClick={onMenuToggle}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            backgroundColor: '#F8FAFC',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            padding: '8px',
          }}
          aria-label="Open navigation menu"
        >
          <span style={{ width: '16px', height: '2px', backgroundColor: '#0F172A', borderRadius: '1px' }} />
          <span style={{ width: '16px', height: '2px', backgroundColor: '#0F172A', borderRadius: '1px' }} />
          <span style={{ width: '12px', height: '2px', backgroundColor: '#0F172A', borderRadius: '1px', alignSelf: 'flex-start' }} />
        </button>
      </div>
    </div>
  );
};

export default TopNavbar;
