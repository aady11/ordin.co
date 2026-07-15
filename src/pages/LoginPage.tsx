import React, { useState } from 'react';
import Logo from '../components/Logo';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const emailValid = email.includes('@');
    const passwordValid = password.length >= 6;

    if (!emailValid || !passwordValid) {
      setError('Please enter a valid email and password.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('ordin_authenticated', 'true');
      onLogin();
      setLoading(false);
    }, 700);
  };

  const fillDemo = () => {
    setEmail('rajesh@sharmaindustries.in');
    setPassword('ordin2025');
    setError('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F8FAFC',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Inter, sans-serif',
    }}>
      {/* Background subtle pattern */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(37,99,235,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(5,150,105,0.03) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
        padding: '40px 36px',
        position: 'relative',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
          <Logo variant="light" />
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h1 style={{
            fontSize: '22px',
            fontWeight: 700,
            color: '#0F172A',
            marginBottom: '6px',
            letterSpacing: '-0.3px',
          }}>
            Welcome back
          </h1>
          <p style={{ color: '#64748B', fontSize: '14px' }}>
            Sign in to your Ordin dashboard.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 500,
              color: '#374151',
              marginBottom: '6px',
            }}>
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.in"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1.5px solid #E2E8F0',
                fontSize: '14px',
                color: '#0F172A',
                backgroundColor: '#FAFAFA',
                outline: 'none',
                transition: 'border-color 0.15s ease',
                fontFamily: 'Inter, sans-serif',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#2563EB')}
              onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 500,
              color: '#374151',
              marginBottom: '6px',
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1.5px solid #E2E8F0',
                fontSize: '14px',
                color: '#0F172A',
                backgroundColor: '#FAFAFA',
                outline: 'none',
                transition: 'border-color 0.15s ease',
                fontFamily: 'Inter, sans-serif',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#2563EB')}
              onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
            />
          </div>

          {/* Error */}
          {error && (
            <div style={{
              backgroundColor: '#FEF2F2',
              border: '1px solid #FECACA',
              borderRadius: '8px',
              padding: '10px 14px',
              marginBottom: '16px',
              color: '#DC2626',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span>⚠</span> {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '11px',
              backgroundColor: loading ? '#93C5FD' : '#2563EB',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'Inter, sans-serif',
              transition: 'background-color 0.15s ease',
              letterSpacing: '0.1px',
            }}
            onMouseEnter={(e) => {
              if (!loading) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1D4ED8';
            }}
            onMouseLeave={(e) => {
              if (!loading) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#2563EB';
            }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>

          <p style={{
            textAlign: 'center',
            color: '#94A3B8',
            fontSize: '12px',
            marginTop: '14px',
          }}>
            Don't have an account?{' '}
            <span style={{ color: '#2563EB', cursor: 'pointer', fontWeight: 500 }}>
              Request Early Access
            </span>
          </p>
        </form>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          margin: '24px 0 20px',
        }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }} />
          <span style={{ color: '#CBD5E1', fontSize: '12px', whiteSpace: 'nowrap' }}>demo credentials</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }} />
        </div>

        {/* Demo credentials */}
        <div
          onClick={fillDemo}
          style={{
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '10px',
            padding: '14px 16px',
            cursor: 'pointer',
            transition: 'border-color 0.15s ease',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = '#2563EB')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = '#E2E8F0')}
          title="Click to auto-fill demo credentials"
        >
          <p style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '6px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Click to auto-fill
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', gap: '8px', fontSize: '13px' }}>
              <span style={{ color: '#64748B', minWidth: '60px', fontWeight: 500 }}>Email:</span>
              <span style={{ color: '#0F172A', fontWeight: 500 }}>rajesh@sharmaindustries.in</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', fontSize: '13px' }}>
              <span style={{ color: '#64748B', minWidth: '60px', fontWeight: 500 }}>Password:</span>
              <span style={{ color: '#0F172A', fontWeight: 500 }}>ordin2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
