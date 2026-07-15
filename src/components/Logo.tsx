import React from 'react';

interface LogoProps {
  variant?: 'sidebar' | 'light';
}

const Logo: React.FC<LogoProps> = ({ variant = 'sidebar' }) => {
  const textColor = variant === 'sidebar' ? '#FFFFFF' : '#0F172A';
  const mutedColor = variant === 'sidebar' ? '#94A3B8' : '#64748B';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {/* Hexagon icon */}
      <div style={{ position: 'relative', width: '36px', height: '36px', flexShrink: 0 }}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon
            points="18,2 33,10 33,26 18,34 3,26 3,10"
            fill="#2563EB"
          />
          <text
            x="18"
            y="23"
            textAnchor="middle"
            fill="white"
            fontSize="16"
            fontWeight="700"
            fontFamily="Inter, sans-serif"
          >
            O
          </text>
        </svg>
      </div>
      {/* Wordmark */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{
          color: textColor,
          fontWeight: 600,
          fontSize: '17px',
          letterSpacing: '-0.3px',
          fontFamily: 'Inter, sans-serif',
        }}>
          Ordin
        </span>
        <span style={{
          color: mutedColor,
          fontSize: '10px',
          fontWeight: 400,
          letterSpacing: '0.3px',
          marginTop: '2px',
          textTransform: 'uppercase' as const,
        }}>
          Manufacturing OS
        </span>
      </div>
    </div>
  );
};

export default Logo;
