import React from "react";

import { StatBox } from "../atoms/StatBox";
import { ProvinceOrCity } from "../../LocationSearchSelect";

interface LocationDetailCardProps {
  location: ProvinceOrCity;
}

export const LocationDetailCard: React.FC<LocationDetailCardProps> = ({
  location,
}) => {
  if (location.type === "province" && location.province) {
    const p = location.province;
    return (
      <div className="home-location-card province-card-border">
        <div className="home-location-header">
          <div className="home-location-icon province-icon-bg">🏛️</div>
          <div>
            <div className="home-location-name">
              {p.region.province || p.region.name}
            </div>
            <div className="home-location-meta">
              📅 {p.date} • Ölüm Oranı: {(p.fatality_rate * 100).toFixed(2)}%
            </div>
          </div>
        </div>

        <div className="home-stats-grid">
          <StatBox
            label="Toplam Vaka"
            value={p.confirmed.toLocaleString()}
            color="blue"
            diff={p.confirmed_diff}
          />
          <StatBox
            label="Toplam Ölüm"
            value={p.deaths.toLocaleString()}
            color="red"
            diff={p.deaths_diff}
          />
          <StatBox
            label="Aktif Vaka"
            value={p.active.toLocaleString()}
            color="yellow"
          />
          <StatBox
            label="İyileşen"
            value={p.recovered.toLocaleString()}
            color="green"
          />
        </div>
      </div>
    );
  }

  if (location.type === "city" && location.city) {
    const c = location.city;
    const fatalityRate = c.confirmed > 0 ? c.deaths / c.confirmed : 0;
    return (
      <div className="home-location-card city-card-border">
        <div className="home-location-header">
          <div className="home-location-icon city-icon-bg">🏙️</div>
          <div>
            <div className="home-location-name">{c.name}</div>
            <div className="home-location-meta">
              📅 {c.date} •{" "}
              {location.parentProvince && `📍 ${location.parentProvince}`}
            </div>
          </div>
        </div>

        <div className="home-stats-grid">
          <StatBox
            label="Toplam Vaka"
            value={c.confirmed.toLocaleString()}
            color="blue"
            diff={c.confirmed_diff}
          />
          <StatBox
            label="Toplam Ölüm"
            value={c.deaths.toLocaleString()}
            color="red"
            diff={c.deaths_diff}
          />
          <StatBox
            label="Ölüm Oranı"
            value={`${(fatalityRate * 100).toFixed(2)}%`}
            color="purple"
          />
          <StatBox
            label="Son Güncelleme"
            value={new Date(c.last_update).toLocaleString("tr-TR")}
            color="yellow"
            size="xs"
          />
        </div>
      </div>
    );
  }

  return null;
};
