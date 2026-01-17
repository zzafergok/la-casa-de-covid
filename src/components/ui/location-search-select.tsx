import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ICountryReport, ICity } from '../../types/summary.type';

interface ProvinceOrCity {
  type: 'province' | 'city';
  name: string;
  province?: ICountryReport;
  city?: ICity;
  parentProvince?: string;
}

interface LocationSearchSelectProps {
  provinces: ICountryReport[];
  value: ProvinceOrCity | null;
  onChange: (item: ProvinceOrCity | null) => void;
  placeholder?: string;
}

export const LocationSearchSelect: React.FC<LocationSearchSelectProps> = ({
  provinces,
  value,
  onChange,
  placeholder = 'Bölge veya şehir ara...',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Combine all provinces and cities into searchable items
  const allItems = useMemo(() => {
    const items: ProvinceOrCity[] = [];
    
    provinces.forEach((province) => {
      // Add province
      items.push({
        type: 'province',
        name: province.region.province || province.region.name,
        province: province,
      });
      
      // Add cities from this province
      if (province.region.cities && province.region.cities.length > 0) {
        province.region.cities.forEach((city) => {
          items.push({
            type: 'city',
            name: city.name,
            city: city,
            parentProvince: province.region.province || province.region.name,
          });
        });
      }
    });
    
    // Sort by name
    return items.sort((a, b) => a.name.localeCompare(b.name));
  }, [provinces]);

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

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return allItems;
    const term = searchTerm.toLowerCase();
    return allItems.filter((item) => item.name.toLowerCase().includes(term));
  }, [allItems, searchTerm]);

  const handleSelect = (item: ProvinceOrCity) => {
    onChange(item);
    setSearchTerm('');
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange(null);
    setSearchTerm('');
  };

  const provinceCount = provinces.length;
  const cityCount = allItems.filter(i => i.type === 'city').length;

  const styles = {
    container: {
      position: 'relative' as const,
      width: '100%',
    },
    inputWrapper: {
      display: 'flex',
      alignItems: 'center',
      background: 'rgba(30, 30, 45, 0.8)',
      border: `2px solid ${isOpen ? 'rgba(139, 92, 246, 0.5)' : 'rgba(139, 92, 246, 0.2)'}`,
      borderRadius: '12px',
      padding: '12px 16px',
      transition: 'all 0.2s ease',
      cursor: 'text',
      gap: '10px',
      overflow: 'hidden',
    },
    icon: {
      flexShrink: 0,
      fontSize: '18px',
      color: '#a78bfa',
    },
    input: {
      flex: 1,
      minWidth: '80px',
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
      padding: '6px 12px',
      borderRadius: '8px',
      flexShrink: 0,
      maxWidth: '220px',
    },
    provinceBadge: {
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0.1) 100%)',
    },
    cityBadge: {
      background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%)',
    },
    selectedText: {
      fontSize: '14px',
      fontWeight: 600,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap' as const,
      maxWidth: '140px',
    },
    typeLabel: {
      fontSize: '10px',
      fontWeight: 700,
      textTransform: 'uppercase' as const,
      padding: '2px 6px',
      borderRadius: '4px',
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
      flexShrink: 0,
    },
    dropdown: {
      position: 'absolute' as const,
      top: '100%',
      left: 0,
      right: 0,
      marginTop: '8px',
      background: 'rgba(25, 25, 38, 0.98)',
      border: '1px solid rgba(139, 92, 246, 0.3)',
      borderRadius: '12px',
      maxHeight: '320px',
      overflowY: 'auto' as const,
      zIndex: 100,
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
    },
    optionGroup: {
      padding: '8px',
    },
    option: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 14px',
      cursor: 'pointer',
      borderRadius: '8px',
      marginBottom: '4px',
      transition: 'background 0.15s ease',
    },
    optionLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      flex: 1,
      minWidth: 0,
    },
    optionName: {
      color: '#fff',
      fontSize: '14px',
      fontWeight: 500,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap' as const,
    },
    optionParent: {
      fontSize: '11px',
      color: 'rgba(255,255,255,0.4)',
    },
    emptyState: {
      padding: '24px',
      textAlign: 'center' as const,
      color: 'rgba(255, 255, 255, 0.4)',
      fontSize: '14px',
    },
    count: {
      fontSize: '11px',
      color: 'rgba(255, 255, 255, 0.4)',
      flexShrink: 0,
      whiteSpace: 'nowrap' as const,
    },
  };

  return (
    <div ref={containerRef} style={styles.container}>
      <style>{`
        .location-option:hover { background: rgba(139, 92, 246, 0.15) !important; }
        .location-dropdown::-webkit-scrollbar { width: 6px; }
        .location-dropdown::-webkit-scrollbar-track { background: transparent; }
        .location-dropdown::-webkit-scrollbar-thumb { background: rgba(139, 92, 246, 0.3); border-radius: 3px; }
      `}</style>

      <div
        style={styles.inputWrapper}
        onClick={() => {
          setIsOpen(true);
          inputRef.current?.focus();
        }}
      >
        <span style={styles.icon}>🔍</span>

        {value ? (
          <div style={{
            ...styles.selectedBadge,
            ...(value.type === 'province' ? styles.provinceBadge : styles.cityBadge),
          }}>
            <span style={{
              ...styles.typeLabel,
              background: value.type === 'province' ? 'rgba(99, 102, 241, 0.3)' : 'rgba(34, 197, 94, 0.3)',
              color: value.type === 'province' ? '#818cf8' : '#4ade80',
            }}>
              {value.type === 'province' ? '🏛️ Bölge' : '🏙️ Şehir'}
            </span>
            <span style={{
              ...styles.selectedText,
              color: value.type === 'province' ? '#818cf8' : '#4ade80',
            }}>
              {value.name}
            </span>
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

        {!value && (
          <span style={styles.count}>
            {provinceCount} bölge • {cityCount} şehir
          </span>
        )}
      </div>

      {isOpen && (
        <div className="location-dropdown" style={styles.dropdown}>
          <div style={styles.optionGroup}>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <div
                  key={`${item.type}-${item.name}-${index}`}
                  className="location-option"
                  style={styles.option}
                  onClick={() => handleSelect(item)}
                >
                  <div style={styles.optionLeft}>
                    <span style={{
                      ...styles.typeLabel,
                      background: item.type === 'province' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                      color: item.type === 'province' ? '#818cf8' : '#4ade80',
                    }}>
                      {item.type === 'province' ? '🏛️' : '🏙️'}
                    </span>
                    <div>
                      <div style={styles.optionName}>{item.name}</div>
                      {item.type === 'city' && item.parentProvince && (
                        <div style={styles.optionParent}>{item.parentProvince}</div>
                      )}
                    </div>
                  </div>
                  {item.type === 'province' && item.province && (
                    <span style={{ ...styles.count, color: '#60a5fa' }}>
                      {item.province.confirmed.toLocaleString()} vaka
                    </span>
                  )}
                  {item.type === 'city' && item.city && (
                    <span style={{ ...styles.count, color: '#4ade80' }}>
                      {item.city.confirmed.toLocaleString()} vaka
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div style={styles.emptyState}>
                "{searchTerm}" ile eşleşen sonuç bulunamadı
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export type { ProvinceOrCity };
