// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const isAdmin = location.pathname.startsWith('/admin');

  // Hide CTA on ContactForm page
  const hideCTA = location.pathname === '/ContactForm';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        {/* Logo now wrapped in Link for navigation */}
        <Link to="/">
          <img
            src="/assets/mainLogoLightBG.png"
            alt="DrMudhiwalla HealthCare"
            className="navbar-logo"
          />
        </Link>
      </div>

      {isAdmin ? (
        <div className="navbar-admin-tools">
          {/* ... admin buttons ... */}
          <button className="admin-tool-btn logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="navbar-slogan">
          <div className="slogan-main">Act Before Heart Attack</div>
          {!hideCTA && (
            <button className="slogan-cta" onClick={() => navigate('/ContactForm')}>
              Screen Now
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;