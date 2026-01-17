import React from 'react';
import Header from './Header';
import logo from '../assets/images/logo.png';

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  const styles = {
    main: {
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 24px 80px',
    },
  };

  return (
    <div style={styles.main}>
      <Header siteName={process.env.REACT_APP_WEB_SITE_TITLE || 'COVID Tracker'} image={logo} />
      <main style={styles.content}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
