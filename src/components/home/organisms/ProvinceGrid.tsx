import React from "react";

import { ProvinceCard } from "../molecules/ProvinceCard";
import { LoadingSpinner, EmptyState } from "../atoms/StatusStates";

import { IRegion, ICountryReport } from "../../../types/summary.type";

interface ProvinceGridProps {
  loading: boolean;
  selectedLocation: any;
  data: ICountryReport[];
  selectedRegion: IRegion | null;
}

export const ProvinceGrid: React.FC<ProvinceGridProps> = ({
  selectedRegion,
  selectedLocation,
  loading,
  data,
}) => {
  // Logic: only show when no specific location is selected
  if (!selectedRegion || selectedLocation) return null;

  return (
    <div className="home-container">
      <div className="home-section-header">
        <div className="home-section-icon">🏛️</div>
        <div>
          <div className="home-section-title">
            {selectedRegion.name} - Bölge Verileri
          </div>
          <div className="home-section-subtitle">
            {data.length} bölge/eyalet
          </div>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : data.length > 0 ? (
        <div className="home-province-grid">
          {data.map((province, index) => (
            <ProvinceCard
              key={`${province.region.province}-${index}`}
              data={province}
            />
          ))}
        </div>
      ) : (
        <EmptyState message="Bu ülke için veri bulunamadı" />
      )}
    </div>
  );
};
