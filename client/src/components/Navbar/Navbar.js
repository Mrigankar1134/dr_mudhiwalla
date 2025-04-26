import React from 'react';
import './Navbar.css'; // We'll create this CSS file next

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="brand-name">DrMudhiwalla</div>
        <div className="brand-subtitle">HealthCare</div>
      </div>
      
      <div className="navbar-slogan">
        <div className="slogan-main">Act Before Heart Attack</div>
        <div className="slogan-cta">Screen Now</div>
      </div>
    </nav>
  );
};

export default Navbar;