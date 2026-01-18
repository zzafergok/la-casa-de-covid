import React from "react";

import { StatBox } from "../atoms/StatBox";
import { FatalityBadge } from "../atoms/FatalityBadge";

import { ICountryReport } from "../../../types/summary.type";

interface ProvinceCardProps {
  data: ICountryReport;
}

export const ProvinceCard: React.FC<ProvinceCardProps> = ({ data }) => {
  return (
    <div className="home-province-card">
      <div className="home-province-header">
        <div>
          <div className="home-province-name">
            {data.region.province || data.region.name}
          </div>
          <div className="home-province-date">📅 {data.date}</div>
        </div>
        <FatalityBadge rate={data.fatality_rate} />
      </div>

      <div className="home-stats-row">
        <StatBox
          label="Vaka"
          value={data.confirmed.toLocaleString()}
          color="blue"
          size="sm"
        />
        <StatBox
          label="Ölüm"
          value={data.deaths.toLocaleString()}
          color="red"
          size="sm"
        />
        <StatBox
          label="Aktif"
          value={data.active.toLocaleString()}
          color="yellow"
          size="sm"
        />
        <StatBox
          label="İyileşen"
          value={data.recovered.toLocaleString()}
          color="green"
          size="sm"
        />
      </div>
    </div>
  );
};
