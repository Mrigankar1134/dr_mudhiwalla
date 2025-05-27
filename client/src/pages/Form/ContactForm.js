// src/pages/ContactForm.jsx
import React, { useState, useEffect } from 'react';
import './ContactForm.css';
import contactImage from '../assets/Contact.png';
import arrowIcon from '../assets/arrow_icon.png';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import API from '../../api';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    company: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API.CONTACT, formData);
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => navigate('/'), 2000);
      return () => clearTimeout(timer);
    }
  }, [submitted, navigate]);

  return (
    <>
      <Navbar />

      {/* Back button */}
      <div className="back-button-container">
        <button
          className="back-button"
          onClick={() => {
            navigate('/');
            window.scrollTo(0, 0);
          }}
        >
          &larr; Back
        </button>
      </div>

      <div className="contact-container">
        {submitted && (
          <div className="thank-you-overlay">
            <div className="thank-you-box">
              <h2>Thank You for your Submission</h2>
              <p>Our team will reach out to you soon</p>
            </div>
          </div>
        )}

        <form className="contact-left" onSubmit={handleSubmit}>
          <div className="contact-left-title">
            <h2>Get In Touch</h2>
            <hr />
          </div>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="contact-inputs"
            required
            onChange={handleChange}
          />

          <input
            type="text"
            name="company"
            placeholder="Your Company Name"
            className="contact-inputs"
            required
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="contact-inputs"
            required
            onChange={handleChange}
          />

          <input
            type="tel"
            name="number"
            placeholder="Your Phone number"
            className="contact-inputs"
            required
            pattern="[0-9]{10}"
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Short Description About Your Query"
            className="contact-inputs"
            required
            minLength="10"
            maxLength="300"
            onChange={handleChange}
          />

          <button type="submit">
            Submit <img src={arrowIcon} alt="" />
          </button>
        </form>

        <div className="contact-right">
          <img
            src={contactImage}
            alt="Contact Us"
            className="contact-image"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactForm;