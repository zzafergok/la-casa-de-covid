import React from "react";

interface StatBoxProps {
  diff?: number;
  label: string;
  value: string | number;
  size?: "normal" | "sm" | "xs";
  color: "blue" | "red" | "yellow" | "green" | "purple";
}

export const StatBox: React.FC<StatBoxProps> = ({
  diff,
  label,
  value,
  color,
  size = "normal",
}) => {
  const sizeClass =
    size === "sm"
      ? "home-stat-value-sm"
      : size === "xs"
        ? "home-stat-value-xs"
        : "";

  return (
    <div className={`home-stat-box home-stat-box-${color}`}>
      <div className="home-stat-label">{label}</div>
      <div className={`home-stat-value home-stat-value-${color} ${sizeClass}`}>
        {value}
      </div>
      {diff !== undefined && diff !== 0 && (
        <div
          className={`home-stat-diff ${diff > 0 ? "home-stat-diff-positive" : "home-stat-diff-negative"}`}
        >
          {diff > 0 ? "+" : ""}
          {diff.toLocaleString()} bugün
        </div>
      )}
    </div>
  );
};
