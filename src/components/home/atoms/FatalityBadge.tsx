import React from "react";

interface FatalityBadgeProps {
  rate: number;
}

export const FatalityBadge: React.FC<FatalityBadgeProps> = ({ rate }) => {
  const getFatalityClass = (r: number) => {
    if (r > 0.02) return "home-fatality-high";
    if (r > 0.01) return "home-fatality-medium";
    return "home-fatality-low";
  };

  return (
    <div className={`home-fatality-badge ${getFatalityClass(rate)}`}>
      {(rate * 100).toFixed(2)}%
    </div>
  );
};
