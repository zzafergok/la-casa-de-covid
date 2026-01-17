import * as React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import regionDataService from "../../services/region.services";
import { IRegion } from "../../types/summary.type";

interface RegionSelectProps {
  value?: IRegion | null;
  onChange?: (region: IRegion | null) => void;
  placeholder?: string;
}

export function RegionSelect({
  value,
  onChange,
  placeholder = "Ülke ara...",
}: RegionSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [regions, setRegions] = useState<IRegion[]>([]);
  const [filteredRegions, setFilteredRegions] = useState<IRegion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch regions on mount
  useEffect(() => {
    const fetchRegions = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await regionDataService.getAll();
        // Sort A-Z by name
        const sorted = [...data].sort((a, b) => a.name.localeCompare(b.name));
        setRegions(sorted);
        setFilteredRegions(sorted);
      } catch (err) {
        setError("Bölgeler yüklenirken hata oluştu");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRegions();
  }, []);

  // Filter regions based on search
  useEffect(() => {
    if (!search.trim()) {
      setFilteredRegions(regions);
      return;
    }
    const searchLower = search.toLowerCase();
    const filtered = regions.filter(
      (region) =>
        region.name.toLowerCase().includes(searchLower) ||
        region.iso.toLowerCase().includes(searchLower)
    );
    setFilteredRegions(filtered);
  }, [search, regions]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = useCallback(
    (region: IRegion) => {
      onChange?.(region);
      setSearch("");
      setIsOpen(false);
    },
    [onChange]
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange?.(null);
      setSearch("");
    },
    [onChange]
  );

  // Styles
  const styles = {
    container: {
      position: 'relative' as const,
      width: '100%',
      maxWidth: '500px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
    trigger: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      width: '100%',
      padding: '14px 18px',
      borderRadius: '16px',
      border: '2px solid',
      borderColor: isOpen ? '#6366f1' : 'rgba(255,255,255,0.1)',
      background: 'linear-gradient(135deg, rgba(30,30,40,0.9) 0%, rgba(20,20,30,0.95) 100%)',
      backdropFilter: 'blur(20px)',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: isOpen 
        ? '0 0 0 4px rgba(99, 102, 241, 0.15), 0 20px 40px -10px rgba(0,0,0,0.5)' 
        : '0 10px 30px -5px rgba(0,0,0,0.3)',
    },
    searchIcon: {
      width: '20px',
      height: '20px',
      color: isOpen ? '#6366f1' : '#9ca3af',
      flexShrink: 0,
      transition: 'color 0.2s',
    },
    input: {
      flex: 1,
      border: 'none',
      background: 'transparent',
      color: '#fff',
      fontSize: '15px',
      fontWeight: 500,
      outline: 'none',
      minWidth: 0,
    },
    selectedValue: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
      minWidth: 0,
    },
    selectedInner: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      minWidth: 0,
    },
    isoBadge: {
      fontSize: '11px',
      fontWeight: 700,
      fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
      letterSpacing: '0.5px',
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      color: '#fff',
      padding: '5px 10px',
      borderRadius: '8px',
      textTransform: 'uppercase' as const,
    },
    countryName: {
      color: '#f3f4f6',
      fontSize: '15px',
      fontWeight: 500,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap' as const,
    },
    clearButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '28px',
      height: '28px',
      borderRadius: '8px',
      background: 'rgba(239, 68, 68, 0.1)',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    chevron: {
      width: '18px',
      height: '18px',
      color: '#9ca3af',
      flexShrink: 0,
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    },
    dropdown: {
      position: 'absolute' as const,
      zIndex: 9999,
      marginTop: '8px',
      width: '100%',
      borderRadius: '16px',
      border: '1px solid rgba(255,255,255,0.08)',
      background: 'linear-gradient(180deg, rgba(25,25,35,0.98) 0%, rgba(15,15,25,0.99) 100%)',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
      overflow: 'hidden',
      animation: 'dropdownSlide 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
    },
    dropdownList: {
      maxHeight: '320px',
      overflowY: 'auto' as const,
      padding: '8px',
    },
    dropdownItem: (isHovered: boolean, isSelected: boolean) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      padding: '12px 14px',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.15s ease',
      background: isSelected 
        ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.15) 100%)'
        : isHovered 
          ? 'rgba(255,255,255,0.05)' 
          : 'transparent',
      borderLeft: isSelected ? '3px solid #6366f1' : '3px solid transparent',
    }),
    itemIsoBadge: (isSelected: boolean) => ({
      fontSize: '10px',
      fontWeight: 700,
      fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
      letterSpacing: '0.3px',
      background: isSelected 
        ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' 
        : 'rgba(255,255,255,0.08)',
      color: isSelected ? '#fff' : '#9ca3af',
      padding: '4px 8px',
      borderRadius: '6px',
      minWidth: '48px',
      textAlign: 'center' as const,
      textTransform: 'uppercase' as const,
    }),
    itemName: {
      color: '#e5e7eb',
      fontSize: '14px',
      fontWeight: 500,
    },
    loadingContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      padding: '40px 20px',
      color: '#9ca3af',
    },
    spinner: {
      width: '24px',
      height: '24px',
      border: '3px solid rgba(99, 102, 241, 0.2)',
      borderTopColor: '#6366f1',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    },
    emptyState: {
      padding: '30px 20px',
      textAlign: 'center' as const,
      color: '#6b7280',
      fontSize: '14px',
    },
    errorState: {
      padding: '30px 20px',
      textAlign: 'center' as const,
      color: '#ef4444',
      fontSize: '14px',
    },
  };

  return (
    <>
      <style>{`
        @keyframes dropdownSlide {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .region-dropdown-list::-webkit-scrollbar {
          width: 8px;
        }
        .region-dropdown-list::-webkit-scrollbar-track {
          background: transparent;
        }
        .region-dropdown-list::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.3);
          border-radius: 4px;
        }
        .region-dropdown-list::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.5);
        }
      `}</style>
      
      <div ref={containerRef} style={styles.container}>
        {/* Trigger */}
        <div
          style={styles.trigger}
          onClick={() => {
            setIsOpen(true);
            setTimeout(() => inputRef.current?.focus(), 10);
          }}
        >
          {/* Search Icon */}
          <svg style={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          {value && !isOpen ? (
            <div style={styles.selectedValue}>
              <div style={styles.selectedInner}>
                <span style={styles.isoBadge}>{value.iso}</span>
                <span style={styles.countryName}>{value.name}</span>
              </div>
              <button
                style={styles.clearButton}
                onClick={handleClear}
                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; }}
              >
                <svg width="14" height="14" fill="none" stroke="#ef4444" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <>
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsOpen(true)}
                placeholder={placeholder}
                style={styles.input}
              />
              {loading ? (
                <div style={styles.spinner} />
              ) : (
                <svg style={styles.chevron} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </>
          )}
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div style={styles.dropdown}>
            {error ? (
              <div style={styles.errorState}>
                <svg width="32" height="32" fill="none" stroke="#ef4444" viewBox="0 0 24 24" style={{ margin: '0 auto 12px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>{error}</div>
              </div>
            ) : loading ? (
              <div style={styles.loadingContainer}>
                <div style={styles.spinner} />
                <span>Ülkeler yükleniyor...</span>
              </div>
            ) : filteredRegions.length === 0 ? (
              <div style={styles.emptyState}>
                <svg width="40" height="40" fill="none" stroke="#6b7280" viewBox="0 0 24 24" style={{ margin: '0 auto 12px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>"{search}" ile eşleşen ülke bulunamadı</div>
              </div>
            ) : (
              <div style={styles.dropdownList} className="region-dropdown-list">
                {filteredRegions.map((region, index) => (
                  <div
                    key={region.iso}
                    style={styles.dropdownItem(hoveredIndex === index, value?.iso === region.iso)}
                    onClick={() => handleSelect(region)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(-1)}
                  >
                    <span style={styles.itemIsoBadge(value?.iso === region.iso)}>
                      {region.iso}
                    </span>
                    <span style={styles.itemName}>{region.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
