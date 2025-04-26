import React from 'react';
import './landingpage.css'; // Assuming you have a separate CSS file for the landing page
import heroImage from '../assets/image.png'; // Replace with your actual image path

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>On-site Health Screening Services</h1>
        <p className="hero-subtext">
          Prevention is certainly smarter and wiser way to stay healthy and happier.<br />
          Screening of risk factor is a critical component in disease prevention.
        </p>
        <div className="specialty-box">
          <p className="specialty-quote">"Screening and Risk Profiling"</p>
          <p className="specialty-tag">~ our speciality</p>
        </div>
        <button className="cta-button">Screen Now</button>
      </div>
      <div className="hero-image">
        <img src={heroImage} alt="Health screening professionals at work" />
      </div>
    </section>
  );
};

export default Hero;