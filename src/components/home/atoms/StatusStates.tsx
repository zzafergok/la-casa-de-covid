import React from "react";

export const LoadingSpinner: React.FC = () => (
  <div className="home-loading-wrapper">
    <div className="home-loading-spinner" />
    <span className="home-loading-text">Yükleniyor...</span>
  </div>
);

export const ErrorState: React.FC<{ message: string }> = ({ message }) => (
  <div className="home-error-state">{message}</div>
);

export const EmptyState: React.FC<{
  message: string;
  title?: string;
  icon?: string;
}> = ({ message, title, icon }) => (
  <div className="home-empty-state">
    {icon && <div className="home-empty-icon">{icon}</div>}
    {title && <div className="home-empty-title">{title}</div>}
    <div>{message}</div>
  </div>
);
