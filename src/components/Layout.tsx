import React from "react";

import Header from "./Header";

import logo from "../assets/images/logo.png";

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <div className="layout-main">
      <Header siteName="La Casa De Covid" image={logo} />
      <main className="layout-content">{children}</main>
    </div>
  );
};

export default Layout;
