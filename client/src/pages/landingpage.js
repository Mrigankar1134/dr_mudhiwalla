import React from 'react';
import './landingpage.css';
import heroImage from '../assets/image.png'; // Your existing hero image
import awarenessImage from '../assets/image2.png'; // Add your new image here
import arrowRight from '../assets/toRight.png';
import arrowDown from '../assets/toBottom.png';
import TablePosterWeb from '../assets/TablePosterWeb.png';
import Navbar from '../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';



const LandingPage = () => {
  const navigate = useNavigate();

  return (
    
    <div className="landing-page">
      <Navbar />
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
          <button className="cta-button"  
          onClick={() => navigate('/ContactForm')}
          >Screen Now</button>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Health screening professionals at work" />
        </div>
      </section>

      {/* New Awareness Section */}
      <section className="awareness-section">
        {/* Top wave SVG */}
        <div className="wave-top">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,40 C300,80 900,0 1200,40 L1200,0 L0,0 Z"
              fill="#ffffff"
            />
          </svg>
        </div>

        <div className="awareness-container">
          <div className="awareness-left">
            <img
              src={awarenessImage}
              alt="Health screening illustration"
              className="left-image"
            />
          </div>
          <div className="awareness-right">
            <h2>WHAT WE’RE NOT,<br />AWARENESS BUILDER</h2>
            <h3>Health Screening ≠ Blood Tests</h3>
            <p>A quick lab report won’t tell you everything.</p>
            <p>A comprehensive health screening looks deeper.</p>
          </div>
        </div>

        {/* Bottom wave SVG */}
        <div className="wave-bottom">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,80 C300,20 900,120 1200,80 L1200,120 L0,120 Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>

      <section className="comparison-section">
        <div className="comparison-container">
          {/* Left Side */}
          <div className="comparison-left">
            <h2>OURS v/s THEIRS</h2>
            <p>
              Individuals and companies often default to off-the-shelf diagnostic lab packages for their health screening.
            </p>
            <p className="reality-text">But in reality</p>

            {/* Responsive arrow */}
            <picture className="arrow-image">
              <source media="(max-width: 768px)" srcSet={arrowDown} />
              <img src={arrowRight} alt="Arrow" />
            </picture>
          </div>

          {/* Right Side */}
          <div className="comparison-right">
            <img
              src={TablePosterWeb}
              alt="Comparison table: our services vs theirs"
              className="comparison-image"
            />
          </div>
        </div>
      </section>

      <section className="risk-section">
        {/* SVG Wave */}
        <div className="wave-container">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path
              fill="rgb(232, 247, 255)"
              d="M0,160L60,144C120,128,240,96,360,112C480,128,600,192,720,192C840,192,960,128,1080,90.7C1200,53,1320,43,1380,37.3L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          

        {/* Text Content */}
        <div className="risk-content">
          <h2>RISK PROFILING AND<br />ACTION PLAN</h2>
          <h4>An Honest Conversation About<br />Your Results</h4>
          <p>Together we’ll discuss your results,<br />
            guide you and empower you.</p>
          <p className="quote">“Prevention is health risk<br />reduction”</p>
        </div>
        </svg>
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
          <button className="cta-button"  
          onClick={() => navigate('/ContactForm')}
          >Screen Now</button>
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