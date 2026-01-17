import React, { useState } from 'react';
import SummaryCard from '../components/SummaryCard';
import { ISummariesData, ICountriesData } from '../types/summary.type';

interface IProps {
  summariesData?: ISummariesData;
}

const CovidSummary: React.FC<IProps> = ({ summariesData }) => {
  const [filteredData, setFilteredData] = useState<ICountriesData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const findCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchWord: string = event.target.value;
    setSearchTerm(searchWord);

    if (!summariesData) return;

    const newFilter = summariesData.Countries.filter((value: ICountriesData) => {
      return value.Country.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const styles = {
    container: {
      marginTop: '48px',
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '24px',
    },
    sectionIcon: {
      width: '48px',
      height: '48px',
      borderRadius: '14px',
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.15) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    sectionTitle: {
      fontSize: '24px',
      fontWeight: 700,
      color: '#fff',
      letterSpacing: '-0.5px',
    },
    sectionSubtitle: {
      fontSize: '14px',
      color: 'rgba(255,255,255,0.5)',
      marginTop: '2px',
    },
    searchWrapper: {
      position: 'relative' as const,
      marginBottom: '32px',
    },
    searchIcon: {
      position: 'absolute' as const,
      left: '18px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '20px',
      height: '20px',
      color: '#6b7280',
      pointerEvents: 'none' as const,
    },
    searchInput: {
      width: '100%',
      padding: '16px 18px 16px 52px',
      borderRadius: '14px',
      border: '2px solid rgba(255,255,255,0.08)',
      background: 'linear-gradient(135deg, rgba(30,30,40,0.8) 0%, rgba(20,20,30,0.9) 100%)',
      color: '#fff',
      fontSize: '15px',
      fontWeight: 500,
      outline: 'none',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box' as const,
    },
    searchInputFocus: {
      borderColor: '#6366f1',
      boxShadow: '0 0 0 4px rgba(99, 102, 241, 0.15)',
    },
    emptyState: {
      textAlign: 'center' as const,
      padding: '60px 20px',
    },
    emptyIcon: {
      width: '80px',
      height: '80px',
      margin: '0 auto 24px',
      borderRadius: '24px',
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyTitle: {
      fontSize: '20px',
      fontWeight: 600,
      color: '#fff',
      marginBottom: '8px',
    },
    emptySubtitle: {
      fontSize: '15px',
      color: 'rgba(255,255,255,0.5)',
      maxWidth: '400px',
      margin: '0 auto',
      lineHeight: 1.6,
    },
    resultsInfo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '20px',
      padding: '12px 16px',
      borderRadius: '10px',
      background: 'rgba(99, 102, 241, 0.1)',
      border: '1px solid rgba(99, 102, 241, 0.2)',
    },
    resultsText: {
      fontSize: '14px',
      color: '#a5b4fc',
    },
    resultsCount: {
      fontWeight: 700,
      color: '#fff',
    },
    clearButton: {
      padding: '6px 14px',
      borderRadius: '8px',
      border: 'none',
      background: 'rgba(239, 68, 68, 0.15)',
      color: '#f87171',
      fontSize: '13px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
  };

  const [inputFocused, setInputFocused] = useState(false);

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredData([]);
  };

  return (
    <div style={styles.container}>
      {/* Section Header */}
      <div style={styles.sectionHeader}>
        <div style={styles.sectionIcon}>
          <svg width="24" height="24" fill="none" stroke="#818cf8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <div style={styles.sectionTitle}>Country Statistics</div>
          <div style={styles.sectionSubtitle}>Search and explore data by country</div>
        </div>
      </div>

      {/* Search Input */}
      <div style={styles.searchWrapper}>
        <svg style={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          style={{
            ...styles.searchInput,
            ...(inputFocused ? styles.searchInputFocus : {}),
          }}
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={findCountry}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />
      </div>

      {/* Results */}
      {filteredData.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>
            <svg width="36" height="36" fill="none" stroke="#818cf8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div style={styles.emptyTitle}>
            {searchTerm ? `No results for "${searchTerm}"` : 'Search for Countries'}
          </div>
          <div style={styles.emptySubtitle}>
            {searchTerm 
              ? 'Try searching with different keywords or check the spelling'
              : 'Type a country name above to view detailed COVID-19 statistics'}
          </div>
        </div>
      ) : (
        <>
          <div style={styles.resultsInfo}>
            <span style={styles.resultsText}>
              Found <span style={styles.resultsCount}>{filteredData.length}</span> {filteredData.length === 1 ? 'country' : 'countries'}
            </span>
            <button 
              style={styles.clearButton}
              onClick={clearSearch}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.25)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
              }}
            >
              Clear
            </button>
          </div>
          <SummaryCard datas={filteredData} />
        </>
      )}
    </div>
  );
};

export default CovidSummary;
