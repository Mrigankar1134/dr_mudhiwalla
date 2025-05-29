import React from 'react';
import './Services.css';
import { 
  FaImage, 
  FaCheckCircle, 
  FaClock, 
  FaUserMd, 
  FaShieldAlt,
  FaArrowRight,
 FaQuestion 
} from 'react-icons/fa';

const Services = () => {
  return (
    <>
      <h1 className="screening-title">Corporate Health Screening</h1>
      <div className="health-screening-container">
        <div className="services-list">

          <div className="service-item">
            <FaImage className="service-icon" />
            <p>Provides employees with a clear understanding of their individual risk factors.</p>
          </div>

          <div className="service-item">
            <FaCheckCircle className="service-icon" />
            <p>Delivers actionable lifestyle-based recommendations.</p>
          </div>

          <div className="service-item">
            <FaClock className="service-icon" />
            <p>Conducts on-site screenings in just 20–30 minutes and that too completely needle-free.</p>
          </div>

          <div className="service-item">
            <FaUserMd className="service-icon" />
            <p>At DrMudhiwalla HealthCare, doctors personally oversee every screening from start to finish.</p>
          </div>

          <div className="service-item">
            <FaShieldAlt className="service-icon" />
            <p>Offers personalized health screenings tailored for everyone.</p>
          </div>

        </div>
    

      

      <div className="plan-content">

        {/* Left Column */}
        <div className="plan-section">
          <h2>Plan A</h2>
          <ol>
            <li>
              <strong>Obesity Assessment</strong>
              <ul>
                <li>Body Mass Index (BMI)</li>
                <li>Body Roundness Index (BRI)</li>
                <li>Waist-to-Hip Ratio (WHR)</li>
              </ul>
            </li>
            <li><strong>Blood Pressure Measurement</strong></li>
            <li>
              <strong>Finger-Prick Blood Test</strong>
              <ul>
                <li>Diabetes Glucose Test</li>
                <li>Total Cholesterol Level</li>
              </ul>
            </li>
            <li>
              <strong>Lifestyle Assessment (questionnaire-based)</strong>
              <ul>
                <li>Stress Level</li>
                <li>Sleep Quality</li>
                <li>Activity Level</li>
                <li>Smoking & Alcohol Use</li>
                <li>Dietary Habits</li>
              </ul>
            </li>
            <li><strong>Medical and Family History Review</strong></li>
            <li><strong>Brief Medical Examination</strong></li>
            <li><strong>Risk Scoring and Profiling</strong></li>
            <li><strong>Personalized Recommendations</strong></li>
          </ol>
        </div>

        {/* Right Column */}
        <div className="plan-section">
          <h2>Additional Add-Ons</h2>
          <ol>
            <li>
              <strong className="highlight">Need-Based Blood Tests</strong>
              <ul>
                <li>Complete Blood Count (CBC)</li>
                <li>Liver Function Test (LFT)</li>
                <li>Kidney Function Test (KFT)</li>
                <li>Lipid Profile</li>
                <li>Thyroid Profile</li>
                <li>Vitamin D<sub>3</sub> & B<sub>12</sub> Levels </li>
              </ul>
            </li>
            <li><strong>Ultrasound & X-rays (if needed)</strong></li>
            <li><strong>Mental Health Screening</strong></li>
          </ol>
        </div>

      </div>

      <div className="mental-health-section">
        <h3>Mental Health – Executive Edge</h3>
        <p>
          Just like physical health, your mind needs regular check-ups—especially when stress and decision fatigue are part of daily life.
        </p>
        <p>This short quiz helps you reflect on your current state of mind. Not just health, but for a quality life.</p>

        <div className="cta-buttonn">
         <span className="begin-text">Let’s Begin</span>
         <FaArrowRight className="arrow-icon" />
          <button className="contact-btn">
            Contact Us
            <span className="question-icon">
            <FaQuestion />
            </span>
          </button>
        </div>
      </div>
    </div>
    
    </>
  );
};

export default Services;
