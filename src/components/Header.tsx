import React from "react";

interface Props {
  image?: string;
  siteName?: string;
}

const Header: React.FC<Props> = ({ siteName, image }) => {
  return (
    <header className="header-main">
      <div className="header-container">
        <div className="header-logo-section">
          <div className="header-logo-wrapper">
            {image ? (
              <img alt="logo" src={image} className="header-logo-img" />
            ) : (
              <span style={{ fontSize: "20px" }}>🦠</span>
            )}
          </div>
          <span className="header-site-name">
            {siteName || "COVID Tracker"}
          </span>
        </div>

        <div className="header-badge">
          <div className="header-badge-dot" />
          <span className="header-badge-text">Live Data</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
