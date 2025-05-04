// src/components/Navbar.jsx
import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img
          src="/assets/mainLogoLightBG.png"
          alt="DrMudhiwalla HealthCare"
          className="navbar-logo"
        />
      </div>
      
      <div className="navbar-slogan">
        <div className="slogan-main">Act Before Heart Attack</div>
        <button className="slogan-cta">Screen Now</button>
      </div>
    </nav>
  );
};

export default Navbar;