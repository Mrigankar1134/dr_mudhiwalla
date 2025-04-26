import React from 'react';
import './landingpage.css';
import heroImage from '../assets/image.png'; // Your existing hero image
import awarenessImage from '../assets/image2.png'; // Add your new image here
import arrowImage from '../assets/arrow.png'; // Add your new arrow image here

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Existing Hero Section */}
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

      {/* New Awareness Section */}
      <section className="awareness-section">
      <div className="wave-background"></div>
      <div className="awareness-container">
        <div className="awareness-left">
          <img src={awarenessImage} alt="Left" className="left-image" />
        </div>
        <div className="awareness-right">
          <h2>WHAT WE’RE NOT,<br />AWARENESS BUILDER</h2>
          <h3>Health Screening ≠ Blood Tests</h3>
          <p>A quick lab report won’t tell you everything.</p>
          <p>A comprehensive health screening looks deeper.</p>
        </div>
      </div>
    </section>

    <section className="comparison-section">
      <div className="comparison-container">
        {/* Left Side */}
        <div className="comparison-left">
          <h2>OURS v/s THEIRS</h2>
          <p>Individuals/Companies consider diagnostic lab’s test packages for their health screening.</p>
          <p className="reality-text">But in reality</p>
          <img src={arrowImage} alt="Arrow" className="arrow-image" />
        </div>

        {/* Right Side */}
        <div className="comparison-right">
          <div className="comparison-grid">
            {/* Left Column */}
            <div className="column">
              <div className="column-header blue-header">DrMudhiwalla Health Screening Services</div>
              <div className="box blue-box">Doctor-led team</div>
              <div className="box">Tailored to Age, Lifestyle, Stress and History</div>
              <div className="box blue-box">Doctor Reviewed report, One-on-one consultation</div>
              <div className="box">Engaging, Conversational & Awareness building</div>
              <div className="box blue-box">Doctor Driven Health partner</div>
            </div>

            {/* Right Column */}
            <div className="column">
              <div className="column-header blue-header">Diagnostic Labs’ Corporate Packages</div>
              <div className="box blue-box">Technician-led volume driven tests</div>
              <div className="box">Pre-set test packages. Minimal personalization</div>
              <div className="box blue-box">Raw lab report (PDF/E-mail). Interpretation DIY/Google</div>
              <div className="box">Transactional, Clinical report driven</div>
              <div className="box blue-box">Only Testing vendors</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="risk-section">
      {/* SVG Wave */}
      <div className="wave-container">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#5ab4e6"
            d="M0,160L60,144C120,128,240,96,360,112C480,128,600,192,720,192C840,192,960,128,1080,90.7C1200,53,1320,43,1380,37.3L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Text Content */}
      <div className="risk-content">
        <h2>RISK PROFILING AND<br />ACTION PLAN</h2>
        <h4>An Honest Conversation About<br />Your Results</h4>
        <p>Together we’ll discuss your results,<br />
          guide you and empower you.</p>
        <p className="quote">“Prevention is health risk<br />reduction”</p>
      </div>
    </section>
    <section className="preventive-section">
      {/* Left Side Text */}
      <div className="preventive-text">
        <h2>PREVENTIVE HEALTH<br />SCREENINGS</h2>
        <ul>
          <li>On-site</li>
          <li>At your place</li>
          <li>At your comfort</li>
          <li>At your convenience</li>
        </ul>
        <button className="screen-button">Screen Now</button>
      </div>

      {/* Right Side Image */}
      <div className="preventive-image">
        <img src={awarenessImage} alt="Health Screening" />
      </div>
    </section>

    

    </div>
  );
};

export default LandingPage;