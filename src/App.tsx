import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import BusinessPulsePage from './pages/BusinessPulsePage';
import DecisionJournalPage from './pages/DecisionJournalPage';
import OrdinInsightPage from './pages/OrdinInsightPage';
import PricingPage from './pages/PricingPage';
import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';
import { Page } from './types';

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('ordin_authenticated') === 'true';
    } catch {
      return false;
    }
  });

  const [currentPage, setCurrentPage] = useState<Page>('pulse');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pageKey, setPageKey] = useState(0);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigate = (page: Page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      setPageKey((k) => k + 1);
    }
    setMobileMenuOpen(false);
  };

  const handleSignOut = () => {
    try {
      localStorage.removeItem('ordin_authenticated');
    } catch {
      // ignore
    }
    setAuthenticated(false);
    setCurrentPage('pulse');
    setMobileMenuOpen(false);
  };

  const handleLogin = () => {
    setAuthenticated(true);
  };

  if (!authenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'pulse': return <BusinessPulsePage key={pageKey} />;
      case 'journal': return <DecisionJournalPage key={pageKey} />;
      case 'insight': return <OrdinInsightPage key={pageKey} />;
      case 'pricing': return <PricingPage key={pageKey} />;
      default: return <BusinessPulsePage key={pageKey} />;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F8FAFC',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    }}>
      {/* Sidebar — desktop fixed, mobile drawer */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onSignOut={handleSignOut}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      {/* Main content area */}
      <div style={{
        marginLeft: '0',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
      className="main-content"
      >
        {/* Mobile top bar */}
        <div className="lg:hidden">
          <TopNavbar
            currentPage={currentPage}
            onMenuToggle={() => setMobileMenuOpen(true)}
          />
        </div>

        {/* Page content */}
        <main style={{
          flex: 1,
          padding: '32px 32px',
          maxWidth: '1200px',
          width: '100%',
        }}
        className="page-main"
        >
          {renderPage()}
        </main>
      </div>

      {/* Responsive layout styles */}
      <style>{`
        @media (min-width: 1024px) {
          .main-content {
            margin-left: 240px !important;
          }
          .page-main {
            padding: 36px 40px !important;
          }
        }
        @media (max-width: 640px) {
          .page-main {
            padding: 20px 16px !important;
          }
        }
        @media (max-width: 1023px) and (min-width: 641px) {
          .page-main {
            padding: 24px 24px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
