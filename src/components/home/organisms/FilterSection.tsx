import React from "react";

import { RegionSelect } from "../../RegionSelect";
import {
  ProvinceOrCity,
  LocationSearchSelect,
} from "../../LocationSearchSelect";

import { IRegion, ICountryReport } from "../../../types/summary.type";

interface FilterSectionProps {
  selectedRegion: IRegion | null;
  provinceData: ICountryReport[];
  selectedLocation: ProvinceOrCity | null;
  setSelectedRegion: (region: IRegion | null) => void;
  setSelectedLocation: (location: ProvinceOrCity | null) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  provinceData,
  selectedRegion,
  selectedLocation,
  setSelectedRegion,
  setSelectedLocation,
}) => {
  return (
    <div
      className="home-select-row"
      style={{
        justifyContent:
          selectedRegion && provinceData.length > 1 ? "flex-start" : "center",
      }}
    >
      <div className="home-select-wrapper">
        <label className="home-select-label">🌍 Ülke Seçin</label>
        <RegionSelect
          value={selectedRegion}
          onChange={setSelectedRegion}
          placeholder="Ülke ara veya seç..."
        />
      </div>

      {selectedRegion && provinceData.length > 1 && (
        <div className="home-select-wrapper">
          <label className="home-select-label">🔍 Bölge / Şehir Ara</label>
          <LocationSearchSelect
            provinces={provinceData}
            value={selectedLocation}
            onChange={setSelectedLocation}
            placeholder="Bölge veya şehir ara..."
          />
        </div>
      )}
    </div>
  );
};
