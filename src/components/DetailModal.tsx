import React, { useState } from 'react';

interface IProps {
  itemCounty: string;
  itemNewConfirmed: number;
  itemTotalConfirmed: number;
  itemNewDeaths: number;
  itemTotalDeaths: number;
}

const DetailModal: React.FC<IProps> = ({
  itemCounty,
  itemNewConfirmed,
  itemTotalConfirmed,
  itemTotalDeaths,
  itemNewDeaths,
}) => {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    button: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 20px',
      borderRadius: '10px',
      border: 'none',
      background: isHovered
        ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
        : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
      color: '#fff',
      fontSize: '13px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      transform: isHovered ? 'scale(1.02)' : 'scale(1)',
      boxShadow: isHovered
        ? '0 10px 20px -5px rgba(99, 102, 241, 0.4)'
        : '0 4px 12px -2px rgba(99, 102, 241, 0.3)',
    },
    overlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      animation: 'fadeIn 0.2s ease',
    },
    modal: {
      background: 'linear-gradient(135deg, rgba(25,25,40,0.98) 0%, rgba(15,15,30,0.99) 100%)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '24px',
      padding: '32px',
      maxWidth: '500px',
      width: '90%',
      boxShadow: '0 40px 80px -20px rgba(0,0,0,0.8)',
      animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '28px',
    },
    titleSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
    },
    titleIcon: {
      width: '52px',
      height: '52px',
      borderRadius: '14px',
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.15) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
    },
    title: {
      fontSize: '22px',
      fontWeight: 700,
      color: '#fff',
    },
    closeButton: {
      width: '36px',
      height: '36px',
      borderRadius: '10px',
      border: 'none',
      background: 'rgba(255,255,255,0.05)',
      color: '#9ca3af',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px',
      marginBottom: '28px',
    },
    statCard: (bgColor: string, borderColor: string) => ({
      padding: '20px',
      borderRadius: '16px',
      background: bgColor,
      border: `1px solid ${borderColor}`,
    }),
    statLabel: {
      fontSize: '12px',
      fontWeight: 600,
      color: 'rgba(255,255,255,0.5)',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
      marginBottom: '8px',
    },
    statValue: (color: string) => ({
      fontSize: '28px',
      fontWeight: 700,
      color: color,
    }),
    footer: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    closeModalButton: {
      padding: '12px 28px',
      borderRadius: '12px',
      border: 'none',
      background: 'rgba(255,255,255,0.08)',
      color: '#fff',
      fontSize: '14px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
  };

  const stats = [
    {
      label: 'New Cases',
      value: `+${itemNewConfirmed.toLocaleString()}`,
      color: '#60a5fa',
      bgColor: 'rgba(59, 130, 246, 0.1)',
      borderColor: 'rgba(59, 130, 246, 0.2)',
    },
    {
      label: 'Total Cases',
      value: itemTotalConfirmed.toLocaleString(),
      color: '#a78bfa',
      bgColor: 'rgba(139, 92, 246, 0.1)',
      borderColor: 'rgba(139, 92, 246, 0.2)',
    },
    {
      label: 'New Deaths',
      value: `+${itemNewDeaths.toLocaleString()}`,
      color: '#f87171',
      bgColor: 'rgba(239, 68, 68, 0.1)',
      borderColor: 'rgba(239, 68, 68, 0.2)',
    },
    {
      label: 'Total Deaths',
      value: itemTotalDeaths.toLocaleString(),
      color: '#9ca3af',
      bgColor: 'rgba(107, 114, 128, 0.1)',
      borderColor: 'rgba(107, 114, 128, 0.2)',
    },
  ];

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      <button
        style={styles.button}
        onClick={() => setOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        View Details
      </button>

      {open && (
        <div style={styles.overlay} onClick={() => setOpen(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.header}>
              <div style={styles.titleSection}>
                <div style={styles.titleIcon}>🌍</div>
                <span style={styles.title}>{itemCounty}</span>
              </div>
              <button
                style={styles.closeButton}
                onClick={() => setOpen(false)}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
                  e.currentTarget.style.color = '#f87171';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.color = '#9ca3af';
                }}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div style={styles.statsGrid}>
              {stats.map((stat, index) => (
                <div key={index} style={styles.statCard(stat.bgColor, stat.borderColor)}>
                  <div style={styles.statLabel}>{stat.label}</div>
                  <div style={styles.statValue(stat.color)}>{stat.value}</div>
                </div>
              ))}
            </div>

            <div style={styles.footer}>
              <button
                style={styles.closeModalButton}
                onClick={() => setOpen(false)}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailModal;
