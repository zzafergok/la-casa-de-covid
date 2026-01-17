import React from 'react';
import { ISummariesData } from '../types/summary.type';

interface IProps {
  summariesData?: ISummariesData;
}

const CovidGlobal: React.FC<IProps> = ({ summariesData }) => {
  const formatNumber = (num: number | undefined) => {
    if (num === undefined) return '-';
    return num.toLocaleString();
  };

  const formatDiff = (num: number | undefined) => {
    if (num === undefined) return '-';
    const prefix = num > 0 ? '+' : '';
    return prefix + num.toLocaleString();
  };

  const styles = {
    container: {
      marginBottom: '48px',
    },
    dateCard: {
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
      border: '1px solid rgba(99, 102, 241, 0.2)',
      borderRadius: '16px',
      padding: '20px 32px',
      marginBottom: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
    },
    dateIcon: {
      width: '24px',
      height: '24px',
      color: '#818cf8',
    },
    dateText: {
      fontSize: '18px',
      fontWeight: 600,
      color: '#c7d2fe',
      letterSpacing: '-0.3px',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '20px',
    },
    statCard: (gradient: string, borderColor: string) => ({
      background: `linear-gradient(135deg, ${gradient})`,
      border: `1px solid ${borderColor}`,
      borderRadius: '20px',
      padding: '28px',
      position: 'relative' as const,
      overflow: 'hidden',
    }),
    statCardGlow: (color: string) => ({
      position: 'absolute' as const,
      top: '-50%',
      right: '-50%',
      width: '100%',
      height: '100%',
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      opacity: 0.15,
      pointerEvents: 'none' as const,
    }),
    statHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '16px',
    },
    statIcon: (bgColor: string) => ({
      width: '40px',
      height: '40px',
      borderRadius: '12px',
      background: bgColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    statLabel: {
      fontSize: '14px',
      fontWeight: 500,
      color: 'rgba(255,255,255,0.7)',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
    },
    statValue: {
      fontSize: '32px',
      fontWeight: 700,
      color: '#fff',
      lineHeight: 1.2,
      marginBottom: '8px',
    },
    statDiff: (color: string, bgColor: string) => ({
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding: '4px 10px',
      borderRadius: '8px',
      background: bgColor,
      fontSize: '13px',
      fontWeight: 600,
      color: color,
    }),
  };

  const stats = [
    {
      label: 'Total Confirmed',
      value: formatNumber(summariesData?.Global.confirmed),
      diff: formatDiff(summariesData?.Global.confirmed_diff),
      gradient: 'rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.1) 100%',
      borderColor: 'rgba(59, 130, 246, 0.3)',
      iconBg: 'rgba(59, 130, 246, 0.2)',
      glowColor: '#3b82f6',
      diffColor: '#60a5fa',
      diffBg: 'rgba(59, 130, 246, 0.15)',
      icon: (
        <svg width="20" height="20" fill="none" stroke="#60a5fa" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      label: 'Total Deaths',
      value: formatNumber(summariesData?.Global.deaths),
      diff: formatDiff(summariesData?.Global.deaths_diff),
      gradient: 'rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.1) 100%',
      borderColor: 'rgba(239, 68, 68, 0.3)',
      iconBg: 'rgba(239, 68, 68, 0.2)',
      glowColor: '#ef4444',
      diffColor: '#f87171',
      diffBg: 'rgba(239, 68, 68, 0.15)',
      icon: (
        <svg width="20" height="20" fill="none" stroke="#f87171" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: 'Active Cases',
      value: formatNumber(summariesData?.Global.active),
      diff: formatDiff(summariesData?.Global.active_diff),
      gradient: 'rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.1) 100%',
      borderColor: 'rgba(245, 158, 11, 0.3)',
      iconBg: 'rgba(245, 158, 11, 0.2)',
      glowColor: '#f59e0b',
      diffColor: '#fbbf24',
      diffBg: 'rgba(245, 158, 11, 0.15)',
      icon: (
        <svg width="20" height="20" fill="none" stroke="#fbbf24" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      label: 'Recovered',
      value: formatNumber(summariesData?.Global.recovered),
      diff: formatDiff(summariesData?.Global.recovered_diff),
      gradient: 'rgba(34, 197, 94, 0.15) 0%, rgba(22, 163, 74, 0.1) 100%',
      borderColor: 'rgba(34, 197, 94, 0.3)',
      iconBg: 'rgba(34, 197, 94, 0.2)',
      glowColor: '#22c55e',
      diffColor: '#4ade80',
      diffBg: 'rgba(34, 197, 94, 0.15)',
      icon: (
        <svg width="20" height="20" fill="none" stroke="#4ade80" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div style={styles.container}>
      {/* Date Card */}
      <div style={styles.dateCard}>
        <svg style={styles.dateIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span style={styles.dateText}>
          {summariesData?.Global.date || 'Loading...'}
        </span>
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} style={styles.statCard(stat.gradient, stat.borderColor)}>
            <div style={styles.statCardGlow(stat.glowColor)} />
            <div style={styles.statHeader}>
              <div style={styles.statIcon(stat.iconBg)}>
                {stat.icon}
              </div>
              <span style={styles.statLabel}>{stat.label}</span>
            </div>
            <div style={styles.statValue}>{stat.value}</div>
            <span style={styles.statDiff(stat.diffColor, stat.diffBg)}>
              {stat.diff} today
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CovidGlobal;
