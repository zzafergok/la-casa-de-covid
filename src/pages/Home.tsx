import React, { useEffect, useState } from 'react';

import Layout from '../components/Layout';
import CovidGlobal from '../components/CovidGlobal';
import { RegionSelect } from '../components/ui/region-select';
import { LocationSearchSelect, ProvinceOrCity } from '../components/ui/location-search-select';

import ScrollToTop from 'react-scroll-to-top';

import { ISummariesData, IRegion, ICountryReport } from '../types/summary.type';
import SummariesDataService from '../services/summary.services';
import CountryDataService from '../services/country.services';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [countryLoading, setCountryLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summariesData, setSummariesData] = useState<ISummariesData>();
  const [selectedRegion, setSelectedRegion] = useState<IRegion | null>(null);
  const [provinceData, setProvinceData] = useState<ICountryReport[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<ProvinceOrCity | null>(null);

  // Global verileri yükle
  useEffect(() => {
    SummariesDataService.getAll()
      .then((data: ISummariesData) => {
        setSummariesData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Veri yüklenirken hata oluştu');
        setLoading(false);
        console.error(err);
      });
  }, []);

  // Ülke seçildiğinde o ülkenin verilerini getir
  useEffect(() => {
    if (!selectedRegion) {
      setProvinceData([]);
      setSelectedLocation(null);
      return;
    }

    setCountryLoading(true);
    setSelectedLocation(null);
    CountryDataService.getByIso(selectedRegion.iso)
      .then((data) => {
        setProvinceData(data);
        setCountryLoading(false);
      })
      .catch(() => {
        setProvinceData([]);
        setCountryLoading(false);
      });
  }, [selectedRegion]);

  const styles = {
    container: {
      marginTop: '32px',
    },
    selectRow: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      maxWidth: '900px',
      margin: '0 auto 40px auto',
      padding: '0 20px',
    },
    selectWrapper: {
      flex: 1,
    },
    selectLabel: {
      display: 'block',
      fontSize: '13px',
      fontWeight: 600,
      color: '#a1a1aa',
      marginBottom: '10px',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
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
      fontSize: '24px',
    },
    sectionTitle: {
      fontSize: '22px',
      fontWeight: 700,
      color: '#fff',
    },
    sectionSubtitle: {
      fontSize: '14px',
      color: 'rgba(255,255,255,0.5)',
      marginTop: '4px',
    },
    // Selected Location Card
    locationCard: {
      background: 'linear-gradient(135deg, rgba(30,30,45,0.9) 0%, rgba(25,25,38,0.95) 100%)',
      border: '1px solid rgba(139, 92, 246, 0.3)',
      borderRadius: '20px',
      padding: '32px',
      marginTop: '24px',
    },
    locationHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginBottom: '28px',
    },
    locationIcon: {
      width: '56px',
      height: '56px',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '28px',
    },
    locationName: {
      fontSize: '24px',
      fontWeight: 700,
      color: '#fff',
    },
    locationMeta: {
      fontSize: '14px',
      color: 'rgba(255,255,255,0.5)',
      marginTop: '4px',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '16px',
    },
    // Province Grid Styles
    provinceGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '20px',
    },
    provinceCard: {
      background: 'linear-gradient(135deg, rgba(30,30,45,0.9) 0%, rgba(25,25,38,0.95) 100%)',
      border: '1px solid rgba(99, 102, 241, 0.2)',
      borderRadius: '16px',
      padding: '24px',
      transition: 'all 0.3s ease',
    },
    provinceHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '20px',
    },
    provinceName: {
      fontSize: '18px',
      fontWeight: 600,
      color: '#fff',
    },
    provinceDate: {
      fontSize: '12px',
      color: 'rgba(255,255,255,0.4)',
      marginTop: '4px',
    },
    fatalityBadge: (rate: number) => ({
      padding: '4px 10px',
      borderRadius: '8px',
      fontSize: '11px',
      fontWeight: 600,
      background: rate > 0.02 ? 'rgba(239, 68, 68, 0.15)' : rate > 0.01 ? 'rgba(251, 191, 36, 0.15)' : 'rgba(34, 197, 94, 0.15)',
      color: rate > 0.02 ? '#f87171' : rate > 0.01 ? '#fbbf24' : '#4ade80',
    }),
    statsRow: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '12px',
    },
    statBox: (bgColor: string, borderColor: string) => ({
      padding: '20px',
      borderRadius: '14px',
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
      marginBottom: '8px',
    },
    statValue: (color: string) => ({
      fontSize: '24px',
      fontWeight: 700,
      color: color,
    }),
    statDiff: (positive: boolean) => ({
      fontSize: '12px',
      fontWeight: 500,
      color: positive ? '#f87171' : '#4ade80',
      marginTop: '6px',
    }),
    emptyState: {
      textAlign: 'center' as const,
      padding: '60px 20px',
      color: 'rgba(255,255,255,0.5)',
    },
    loadingSpinner: {
      width: '40px',
      height: '40px',
      margin: '40px auto',
      border: '4px solid rgba(99, 102, 241, 0.2)',
      borderTopColor: '#6366f1',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    },
  };

  // Render selected location details
  const renderSelectedLocation = () => {
    if (!selectedLocation) return null;

    if (selectedLocation.type === 'province' && selectedLocation.province) {
      const p = selectedLocation.province;
      return (
        <div style={{
          ...styles.locationCard,
          borderColor: 'rgba(99, 102, 241, 0.3)',
        }}>
          <div style={styles.locationHeader}>
            <div style={{
              ...styles.locationIcon,
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0.1) 100%)',
            }}>🏛️</div>
            <div>
              <div style={styles.locationName}>{p.region.province || p.region.name}</div>
              <div style={styles.locationMeta}>
                📅 {p.date} • Ölüm Oranı: {(p.fatality_rate * 100).toFixed(2)}%
              </div>
            </div>
          </div>

          <div style={styles.statsGrid}>
            <div style={styles.statBox('rgba(59, 130, 246, 0.1)', 'rgba(59, 130, 246, 0.2)')}>
              <div style={styles.statLabel}>Toplam Vaka</div>
              <div style={styles.statValue('#60a5fa')}>{p.confirmed.toLocaleString()}</div>
              {p.confirmed_diff !== 0 && (
                <div style={styles.statDiff(p.confirmed_diff > 0)}>
                  {p.confirmed_diff > 0 ? '+' : ''}{p.confirmed_diff.toLocaleString()} bugün
                </div>
              )}
            </div>
            <div style={styles.statBox('rgba(239, 68, 68, 0.1)', 'rgba(239, 68, 68, 0.2)')}>
              <div style={styles.statLabel}>Toplam Ölüm</div>
              <div style={styles.statValue('#f87171')}>{p.deaths.toLocaleString()}</div>
              {p.deaths_diff !== 0 && (
                <div style={styles.statDiff(p.deaths_diff > 0)}>
                  {p.deaths_diff > 0 ? '+' : ''}{p.deaths_diff.toLocaleString()} bugün
                </div>
              )}
            </div>
            <div style={styles.statBox('rgba(251, 191, 36, 0.1)', 'rgba(251, 191, 36, 0.2)')}>
              <div style={styles.statLabel}>Aktif Vaka</div>
              <div style={styles.statValue('#fbbf24')}>{p.active.toLocaleString()}</div>
            </div>
            <div style={styles.statBox('rgba(34, 197, 94, 0.1)', 'rgba(34, 197, 94, 0.2)')}>
              <div style={styles.statLabel}>İyileşen</div>
              <div style={styles.statValue('#4ade80')}>{p.recovered.toLocaleString()}</div>
            </div>
          </div>
        </div>
      );
    }

    if (selectedLocation.type === 'city' && selectedLocation.city) {
      const c = selectedLocation.city;
      const fatalityRate = c.confirmed > 0 ? (c.deaths / c.confirmed) : 0;
      return (
        <div style={{
          ...styles.locationCard,
          borderColor: 'rgba(34, 197, 94, 0.3)',
        }}>
          <div style={styles.locationHeader}>
            <div style={{
              ...styles.locationIcon,
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%)',
            }}>🏙️</div>
            <div>
              <div style={styles.locationName}>{c.name}</div>
              <div style={styles.locationMeta}>
                📅 {c.date} • {selectedLocation.parentProvince && `📍 ${selectedLocation.parentProvince}`}
              </div>
            </div>
          </div>

          <div style={styles.statsGrid}>
            <div style={styles.statBox('rgba(59, 130, 246, 0.1)', 'rgba(59, 130, 246, 0.2)')}>
              <div style={styles.statLabel}>Toplam Vaka</div>
              <div style={styles.statValue('#60a5fa')}>{c.confirmed.toLocaleString()}</div>
              {c.confirmed_diff !== 0 && (
                <div style={styles.statDiff(c.confirmed_diff > 0)}>
                  {c.confirmed_diff > 0 ? '+' : ''}{c.confirmed_diff.toLocaleString()} bugün
                </div>
              )}
            </div>
            <div style={styles.statBox('rgba(239, 68, 68, 0.1)', 'rgba(239, 68, 68, 0.2)')}>
              <div style={styles.statLabel}>Toplam Ölüm</div>
              <div style={styles.statValue('#f87171')}>{c.deaths.toLocaleString()}</div>
              {c.deaths_diff !== 0 && (
                <div style={styles.statDiff(c.deaths_diff > 0)}>
                  {c.deaths_diff > 0 ? '+' : ''}{c.deaths_diff.toLocaleString()} bugün
                </div>
              )}
            </div>
            <div style={styles.statBox('rgba(139, 92, 246, 0.1)', 'rgba(139, 92, 246, 0.2)')}>
              <div style={styles.statLabel}>Ölüm Oranı</div>
              <div style={styles.statValue('#a78bfa')}>{(fatalityRate * 100).toFixed(2)}%</div>
            </div>
            <div style={styles.statBox('rgba(251, 191, 36, 0.1)', 'rgba(251, 191, 36, 0.2)')}>
              <div style={styles.statLabel}>Son Güncelleme</div>
              <div style={{ ...styles.statValue('#fbbf24'), fontSize: '12px' }}>
                {new Date(c.last_update).toLocaleString('tr-TR')}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <Layout>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .province-card:hover { 
          transform: translateY(-4px); 
          border-color: rgba(99, 102, 241, 0.5) !important;
          box-shadow: 0 12px 40px rgba(99, 102, 241, 0.15);
        }
      `}</style>
      
      {/* Select Row */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap' as const,
        gap: '20px',
        maxWidth: '900px',
        margin: '0 auto 40px auto',
        padding: '0 20px',
        justifyContent: (selectedRegion && provinceData.length > 1) ? 'flex-start' : 'center',
      }}>
        <div style={{ flex: '1 1 300px', maxWidth: '400px' }}>
          <label style={styles.selectLabel}>🌍 Ülke Seçin</label>
          <RegionSelect
            value={selectedRegion}
            onChange={setSelectedRegion}
            placeholder="Ülke ara veya seç..."
          />
        </div>

        {selectedRegion && provinceData.length > 1 && (
          <div style={{ flex: '1 1 300px', maxWidth: '400px' }}>
            <label style={styles.selectLabel}>🔍 Bölge / Şehir Ara</label>
            <LocationSearchSelect
              provinces={provinceData}
              value={selectedLocation}
              onChange={setSelectedLocation}
              placeholder="Bölge veya şehir ara..."
            />
          </div>
        )}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '60px', color: '#fff' }}>
          <div style={styles.loadingSpinner} />
          <span style={{ fontSize: '16px', fontWeight: 500 }}>Yükleniyor...</span>
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', marginTop: '60px', color: '#f87171' }}>{error}</div>
      ) : (
        <>
          {/* Global Stats */}
          <CovidGlobal summariesData={summariesData} />

          {/* Selected Location Details */}
          {renderSelectedLocation()}

          {/* Province List - only show when no specific location is selected */}
          {selectedRegion && !selectedLocation && (
            <div style={styles.container}>
              <div style={styles.sectionHeader}>
                <div style={styles.sectionIcon}>🏛️</div>
                <div>
                  <div style={styles.sectionTitle}>{selectedRegion.name} - Bölge Verileri</div>
                  <div style={styles.sectionSubtitle}>
                    {provinceData.length} bölge/eyalet
                  </div>
                </div>
              </div>

              {countryLoading ? (
                <div style={styles.loadingSpinner} />
              ) : provinceData.length > 0 ? (
                <div style={styles.provinceGrid}>
                  {provinceData.map((province, index) => (
                    <div
                      key={`${province.region.province}-${index}`}
                      className="province-card"
                      style={styles.provinceCard}
                    >
                      <div style={styles.provinceHeader}>
                        <div>
                          <div style={styles.provinceName}>
                            {province.region.province || province.region.name}
                          </div>
                          <div style={styles.provinceDate}>
                            📅 {province.date}
                          </div>
                        </div>
                        <div style={styles.fatalityBadge(province.fatality_rate)}>
                          {(province.fatality_rate * 100).toFixed(2)}%
                        </div>
                      </div>

                      <div style={styles.statsRow}>
                        <div style={styles.statBox('rgba(59, 130, 246, 0.1)', 'rgba(59, 130, 246, 0.2)')}>
                          <div style={styles.statLabel}>Vaka</div>
                          <div style={{ ...styles.statValue('#60a5fa'), fontSize: '18px' }}>
                            {province.confirmed.toLocaleString()}
                          </div>
                        </div>

                        <div style={styles.statBox('rgba(239, 68, 68, 0.1)', 'rgba(239, 68, 68, 0.2)')}>
                          <div style={styles.statLabel}>Ölüm</div>
                          <div style={{ ...styles.statValue('#f87171'), fontSize: '18px' }}>
                            {province.deaths.toLocaleString()}
                          </div>
                        </div>

                        <div style={styles.statBox('rgba(251, 191, 36, 0.1)', 'rgba(251, 191, 36, 0.2)')}>
                          <div style={styles.statLabel}>Aktif</div>
                          <div style={{ ...styles.statValue('#fbbf24'), fontSize: '18px' }}>
                            {province.active.toLocaleString()}
                          </div>
                        </div>

                        <div style={styles.statBox('rgba(34, 197, 94, 0.1)', 'rgba(34, 197, 94, 0.2)')}>
                          <div style={styles.statLabel}>İyileşen</div>
                          <div style={{ ...styles.statValue('#4ade80'), fontSize: '18px' }}>
                            {province.recovered.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={styles.emptyState}>
                  Bu ülke için veri bulunamadı
                </div>
              )}
            </div>
          )}

          {/* Empty State */}
          {!selectedRegion && (
            <div style={styles.emptyState}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌍</div>
              <div style={{ fontSize: '18px', fontWeight: 500, color: '#fff', marginBottom: '8px' }}>
                Bir Ülke Seçin
              </div>
              <div>Detaylı COVID-19 istatistiklerini görüntülemek için yukarıdan bir ülke seçin</div>
            </div>
          )}
        </>
      )}
      <ScrollToTop smooth top={5} color='#6f00ff' />
    </Layout>
  );
};

export default App;
