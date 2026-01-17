import React, { useState, useRef, useEffect } from 'react';
import { ICity } from '../../types/summary.type';

interface CitySelectProps {
  cities: ICity[];
  value: ICity | null;
  onChange: (city: ICity | null) => void;
  placeholder?: string;
}

export const CitySelect: React.FC<CitySelectProps> = ({
  cities,
  value,
  onChange,
  placeholder = 'Şehir ara...',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (city: ICity) => {
    onChange(city);
    setSearchTerm('');
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange(null);
    setSearchTerm('');
  };

  const styles = {
    container: {
      position: 'relative' as const,
      width: '100%',
    },
    inputWrapper: {
      display: 'flex',
      alignItems: 'center',
      background: 'rgba(30, 30, 45, 0.8)',
      border: `2px solid ${isOpen ? 'rgba(34, 197, 94, 0.5)' : 'rgba(34, 197, 94, 0.2)'}`,
      borderRadius: '12px',
      padding: '12px 16px',
      transition: 'all 0.2s ease',
      cursor: 'text',
      gap: '8px',
      overflow: 'hidden',
    },
    icon: {
      flexShrink: 0,
      fontSize: '18px',
      color: '#4ade80',
    },
    input: {
      flex: 1,
      minWidth: '60px',
      background: 'transparent',
      border: 'none',
      outline: 'none',
      color: '#fff',
      fontSize: '15px',
      fontWeight: 500,
    },
    selectedBadge: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%)',
      padding: '6px 12px',
      borderRadius: '8px',
      flexShrink: 0,
      maxWidth: '200px',
    },
    selectedText: {
      color: '#4ade80',
      fontSize: '14px',
      fontWeight: 600,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap' as const,
      maxWidth: '120px',
    },
    clearButton: {
      background: 'rgba(239, 68, 68, 0.2)',
      border: 'none',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: '#f87171',
      fontSize: '12px',
    },
    dropdown: {
      position: 'absolute' as const,
      top: '100%',
      left: 0,
      right: 0,
      marginTop: '8px',
      background: 'rgba(25, 25, 38, 0.98)',
      border: '1px solid rgba(34, 197, 94, 0.3)',
      borderRadius: '12px',
      maxHeight: '280px',
      overflowY: 'auto' as const,
      zIndex: 100,
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
    },
    option: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 16px',
      cursor: 'pointer',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      transition: 'background 0.15s ease',
    },
    optionName: {
      color: '#fff',
      fontSize: '14px',
      fontWeight: 500,
    },
    optionStats: {
      display: 'flex',
      gap: '12px',
      fontSize: '12px',
    },
    statBadge: (color: string) => ({
      padding: '2px 8px',
      borderRadius: '6px',
      background: `${color}20`,
      color: color,
      fontWeight: 600,
    }),
    emptyState: {
      padding: '24px',
      textAlign: 'center' as const,
      color: 'rgba(255, 255, 255, 0.4)',
      fontSize: '14px',
    },
    count: {
      fontSize: '12px',
      color: 'rgba(255, 255, 255, 0.4)',
      flexShrink: 0,
      whiteSpace: 'nowrap' as const,
    },
  };

  return (
    <div ref={containerRef} style={styles.container}>
      <style>{`
        .city-option:hover { background: rgba(34, 197, 94, 0.1) !important; }
        .city-dropdown::-webkit-scrollbar { width: 6px; }
        .city-dropdown::-webkit-scrollbar-track { background: transparent; }
        .city-dropdown::-webkit-scrollbar-thumb { background: rgba(34, 197, 94, 0.3); border-radius: 3px; }
      `}</style>

      <div
        style={styles.inputWrapper}
        onClick={() => {
          setIsOpen(true);
          inputRef.current?.focus();
        }}
      >
        <span style={styles.icon}>🏙️</span>

        {value ? (
          <div style={styles.selectedBadge}>
            <span style={styles.selectedText}>{value.name}</span>
            <button
              style={styles.clearButton}
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
            >
              ✕
            </button>
          </div>
        ) : null}

        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={value ? '' : placeholder}
          style={styles.input}
        />

        {!value && <span style={styles.count}>{cities.length} şehir</span>}
      </div>

      {isOpen && (
        <div className="city-dropdown" style={styles.dropdown}>
          {filteredCities.length > 0 ? (
            filteredCities.map((city, index) => (
              <div
                key={`${city.name}-${index}`}
                className="city-option"
                style={styles.option}
                onClick={() => handleSelect(city)}
              >
                <span style={styles.optionName}>{city.name}</span>
                <div style={styles.optionStats}>
                  <span style={styles.statBadge('#60a5fa')}>
                    {city.confirmed.toLocaleString()} vaka
                  </span>
                  <span style={styles.statBadge('#f87171')}>
                    {city.deaths.toLocaleString()} ölüm
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div style={styles.emptyState}>
              Şehir bulunamadı
            </div>
          )}
        </div>
      )}
    </div>
  );
};
