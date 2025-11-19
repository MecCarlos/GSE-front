import React from "react";
import "../Style/common/header.css";

const Header = ({ title, description, background = "default", children }) => {
  return (
    <header className={`page-header ${background}`}>
      <div className="header-background"></div>
      <div className="header-content">
        <h1>{title}</h1>
        <p>{description}</p>
        {children && <div className="header-children">{children}</div>}
      </div>
    </header>
  );
};

export default Header;