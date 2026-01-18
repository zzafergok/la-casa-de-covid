import React from "react";

import {
  Zap,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  CalendarDays,
} from "lucide-react";

import { ISummariesData } from "../types/summary.type";

interface IProps {
  summariesData?: ISummariesData;
}

const CovidGlobal: React.FC<IProps> = ({ summariesData }) => {
  const formatNumber = (num: number | undefined) => {
    if (num === undefined) return "-";
    return num.toLocaleString();
  };

  const formatDiff = (num: number | undefined) => {
    if (num === undefined) return "-";
    const prefix = num > 0 ? "+" : "";
    return prefix + num.toLocaleString();
  };

  const stats = [
    {
      label: "Total Confirmed",
      value: formatNumber(summariesData?.Global.confirmed),
      diff: formatDiff(summariesData?.Global.confirmed_diff),
      cardClass: "stats-card stats-card-confirmed",
      glowColor: "rgba(59, 130, 246, 1)",
      iconClass: "icon-bg-confirmed",
      diffClass: "diff-badge diff-confirmed",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      label: "Total Deaths",
      value: formatNumber(summariesData?.Global.deaths),
      diff: formatDiff(summariesData?.Global.deaths_diff),
      cardClass: "stats-card stats-card-deaths",
      glowColor: "rgba(239, 68, 68, 1)",
      iconClass: "icon-bg-deaths",
      diffClass: "diff-badge diff-deaths",
      icon: <AlertCircle className="w-5 h-5" />,
    },
    {
      label: "Active Cases",
      value: formatNumber(summariesData?.Global.active),
      diff: formatDiff(summariesData?.Global.active_diff),
      cardClass: "stats-card stats-card-active",
      glowColor: "rgba(245, 158, 11, 1)",
      iconClass: "icon-bg-active",
      diffClass: "diff-badge diff-active",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      label: "Recovered",
      value: formatNumber(summariesData?.Global.recovered),
      diff: formatDiff(summariesData?.Global.recovered_diff),
      cardClass: "stats-card stats-card-recovered",
      glowColor: "rgba(34, 197, 94, 1)",
      iconClass: "icon-bg-recovered",
      diffClass: "diff-badge diff-recovered",
      icon: <CheckCircle className="w-5 h-5" />,
    },
  ];

  return (
    <div className="mb-12">
      {/* Date Card */}
      <div className="dateCard date-card">
        <CalendarDays className="w-6 h-6 text-indigo-400" />
        <span className="date-text">
          {summariesData?.Global.date || "Loading..."}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={stat.cardClass}>
            <div
              className="card-glow"
              style={{
                background: `radial-gradient(circle, ${stat.glowColor} 0%, transparent 70%)`,
              }}
            />
            <div className="stats-card-header">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.iconClass}`}
              >
                {stat.icon}
              </div>
              <span className="stats-card-label">{stat.label}</span>
            </div>
            <div className="stats-card-value">{stat.value}</div>
            <span className={stat.diffClass}>{stat.diff} today</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CovidGlobal;
