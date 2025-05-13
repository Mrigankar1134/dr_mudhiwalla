
import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/">
          <img
            src="/assets/mainLogoLightBG.png"
            alt="DrMudhiwalla HealthCare"
            className="navbar-logo"
          />
        </a>
      </div>
      
      <div className="navbar-slogan">
        <div className="slogan-main">Act Before Heart Attack</div>
        <button
          className="slogan-cta"
          onClick={() => navigate('/ContactForm')}
        >
          Screen Now
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
