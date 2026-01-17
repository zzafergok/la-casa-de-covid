import React from 'react';

interface Props {
  siteName?: string;
  image?: string;
}

const Header: React.FC<Props> = ({ siteName, image }) => {
  const styles = {
    header: {
      background: 'linear-gradient(135deg, rgba(15,15,25,0.98) 0%, rgba(25,25,40,0.95) 100%)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '16px 0',
      position: 'sticky' as const,
      top: 0,
      zIndex: 100,
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logoSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
    },
    logoWrapper: {
      width: '44px',
      height: '44px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 8px 20px -4px rgba(245, 158, 11, 0.4)',
    },
    logo: {
      width: '28px',
      height: '28px',
      objectFit: 'contain' as const,
    },
    siteName: {
      fontSize: '20px',
      fontWeight: 700,
      background: 'linear-gradient(135deg, #fff 0%, #a1a1aa 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      letterSpacing: '-0.5px',
    },
    badge: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      borderRadius: '50px',
      background: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid rgba(239, 68, 68, 0.2)',
    },
    badgeDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: '#ef4444',
      animation: 'pulse 2s ease-in-out infinite',
    },
    badgeText: {
      fontSize: '12px',
      fontWeight: 600,
      color: '#f87171',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
    },
  };

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
      `}</style>
      <header style={styles.header}>
        <div style={styles.container}>
          <div style={styles.logoSection}>
            <div style={styles.logoWrapper}>
              {image ? (
                <img alt="logo" src={image} style={styles.logo} />
              ) : (
                <span style={{ fontSize: '20px' }}>🦠</span>
              )}
            </div>
            <span style={styles.siteName}>{siteName || 'COVID Tracker'}</span>
          </div>
          
          <div style={styles.badge}>
            <div style={styles.badgeDot} />
            <span style={styles.badgeText}>Live Data</span>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
