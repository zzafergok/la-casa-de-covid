import React, { useState } from 'react';
import DetailModal from '../components/DetailModal';
import { ICountriesData } from '../types/summary.type';

interface Summaries {
  datas: ICountriesData[];
}

const SummaryCard: React.FC<Summaries> = ({ datas }) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '16px',
    },
    card: (isHovered: boolean) => ({
      background: isHovered
        ? 'linear-gradient(135deg, rgba(40,40,55,0.95) 0%, rgba(30,30,45,0.98) 100%)'
        : 'linear-gradient(135deg, rgba(30,30,45,0.9) 0%, rgba(25,25,38,0.95) 100%)',
      border: isHovered 
        ? '1px solid rgba(99, 102, 241, 0.4)'
        : '1px solid rgba(255,255,255,0.08)',
      borderRadius: '20px',
      padding: '24px',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
      boxShadow: isHovered 
        ? '0 20px 40px -10px rgba(0,0,0,0.5), 0 0 0 1px rgba(99, 102, 241, 0.1)'
        : '0 10px 30px -10px rgba(0,0,0,0.3)',
    }),
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '20px',
    },
    countryInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
    },
    countryFlag: {
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.15) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
    },
    countryName: {
      fontSize: '18px',
      fontWeight: 700,
      color: '#fff',
      marginBottom: '4px',
    },
    countryDate: {
      fontSize: '13px',
      color: 'rgba(255,255,255,0.5)',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '16px',
    },
    statBox: (bgColor: string, borderColor: string) => ({
      padding: '16px',
      borderRadius: '12px',
      background: bgColor,
      border: `1px solid ${borderColor}`,
      textAlign: 'center' as const,
    }),
    statLabel: {
      fontSize: '11px',
      fontWeight: 600,
      color: 'rgba(255,255,255,0.5)',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
      marginBottom: '6px',
    },
    statValue: (color: string) => ({
      fontSize: '18px',
      fontWeight: 700,
      color: color,
    }),
    cardActions: {
      marginTop: '20px',
      paddingTop: '16px',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      display: 'flex',
      justifyContent: 'flex-end',
    },
  };

  const getCountryEmoji = (country: string): string => {
    const emojiMap: { [key: string]: string } = {
      'US': '🇺🇸', 'China': '🇨🇳', 'Japan': '🇯🇵', 'Korea, South': '🇰🇷',
      'Germany': '🇩🇪', 'France': '🇫🇷', 'Italy': '🇮🇹', 'Spain': '🇪🇸',
      'United Kingdom': '🇬🇧', 'Brazil': '🇧🇷', 'India': '🇮🇳', 'Russia': '🇷🇺',
      'Turkey': '🇹🇷', 'Canada': '🇨🇦', 'Australia': '🇦🇺', 'Mexico': '🇲🇽',
    };
    return emojiMap[country] || '🌍';
  };

  return (
    <div style={styles.container}>
      {datas.map((item: ICountriesData) => (
        <div
          key={item.iso}
          style={styles.card(hoveredCard === item.iso)}
          onMouseEnter={() => setHoveredCard(item.iso)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div style={styles.cardHeader}>
            <div style={styles.countryInfo}>
              <div style={styles.countryFlag}>
                {getCountryEmoji(item.Country)}
              </div>
              <div>
                <div style={styles.countryName}>{item.Country}</div>
                <div style={styles.countryDate}>{item.Date}</div>
              </div>
            </div>
          </div>

          <div style={styles.statsGrid}>
            <div style={styles.statBox('rgba(59, 130, 246, 0.1)', 'rgba(59, 130, 246, 0.2)')}>
              <div style={styles.statLabel}>New Cases</div>
              <div style={styles.statValue('#60a5fa')}>
                +{item.NewConfirmed.toLocaleString()}
              </div>
            </div>
            <div style={styles.statBox('rgba(139, 92, 246, 0.1)', 'rgba(139, 92, 246, 0.2)')}>
              <div style={styles.statLabel}>Total Cases</div>
              <div style={styles.statValue('#a78bfa')}>
                {item.TotalConfirmed.toLocaleString()}
              </div>
            </div>
            <div style={styles.statBox('rgba(239, 68, 68, 0.1)', 'rgba(239, 68, 68, 0.2)')}>
              <div style={styles.statLabel}>New Deaths</div>
              <div style={styles.statValue('#f87171')}>
                +{item.NewDeaths.toLocaleString()}
              </div>
            </div>
            <div style={styles.statBox('rgba(107, 114, 128, 0.1)', 'rgba(107, 114, 128, 0.2)')}>
              <div style={styles.statLabel}>Total Deaths</div>
              <div style={styles.statValue('#9ca3af')}>
                {item.TotalDeaths.toLocaleString()}
              </div>
            </div>
          </div>

          <div style={styles.cardActions}>
            <DetailModal
              itemCounty={item.Country}
              itemNewConfirmed={item.NewConfirmed}
              itemTotalConfirmed={item.TotalConfirmed}
              itemNewDeaths={item.NewDeaths}
              itemTotalDeaths={item.TotalDeaths}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCard;
