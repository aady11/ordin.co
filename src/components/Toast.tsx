import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(onClose, 300);
    }, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bg = type === 'success' ? '#059669' : '#DC2626';
  const icon = type === 'success' ? '✓' : '✕';

  return (
    <div
      className={exiting ? 'toast-exit' : 'toast-enter'}
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: bg,
        color: '#fff',
        padding: '14px 20px',
        borderRadius: '10px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
        fontSize: '14px',
        fontWeight: 500,
        maxWidth: '340px',
        minWidth: '260px',
      }}
    >
      <span style={{
        width: '22px',
        height: '22px',
        background: 'rgba(255,255,255,0.25)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '13px',
        fontWeight: 700,
        flexShrink: 0,
      }}>
        {icon}
      </span>
      <span>{message}</span>
      <button
        onClick={() => { setExiting(true); setTimeout(onClose, 300); }}
        style={{
          marginLeft: 'auto',
          background: 'none',
          border: 'none',
          color: 'rgba(255,255,255,0.8)',
          cursor: 'pointer',
          fontSize: '16px',
          padding: '0',
          lineHeight: 1,
        }}
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
