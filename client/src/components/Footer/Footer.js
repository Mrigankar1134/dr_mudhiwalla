// src/components/Footer.jsx
import React from 'react';
import {
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { FaFacebook, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      {/* Logo & Tagline */}
      <div className="footer-column logo-column">
        {/* public/assets/mainLogoDarkBG.png */}
        <img
          src="/assets/mainLogoDarkBG.png"
          alt="DrMudhiwalla HealthCare Logo"
          className="footer-logo"
        />
        <p className="tagline">
          Specialized in preventive cardiology and early heart disease detection.
        </p>
      </div>

      {/* Contact Us */}
      <div className="footer-column">
        <h4>Contact Us</h4>
        <ul className="contact-list">
          <li>
            <Phone size={16} />{' '}
            <a href="tel:+919707010270">+91 9707010270</a>
          </li>
          <li>
            <Mail size={16} />{' '}
            <a href="mailto:contact@drmudhiwalla.com">
              contact@drmudhiwalla.com
            </a>
          </li>
          <li>
            <MapPin size={16} /> B/B-180, Majlis Park, Adarsh Nagar, 110033
          </li>
        </ul>
      </div>

      {/* Call to Action */}
      <div className="footer-column">
        <h4>Take Action</h4>
        <p className="cta-text">“Act Before Heart Attack”</p>
        <button className="footer-button">Screen Now</button>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="footer-bottom">
      <p>© 2025 DrMudhiwalla HealthCare. All rights reserved.</p>
      <div className="social-icons">
        <a
          href="https://facebook.com/yourpage"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FaFacebook size={20} />
        </a>
        <a
          href="https://wa.me/919707010270"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <FaWhatsapp size={20} />
        </a>
        <a
          href="https://www.linkedin.com/company/drmudhiwalla/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin size={20} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;