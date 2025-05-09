import React, { useState, useEffect } from 'react';
import './ContactForm.css';
import logo from '../../assets/HealthcareWhite.png';
import contactImage from '../../assets/Contact.png';
import arrowIcon from '../../assets/arrow_icon.png';

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false);
      }, 5000); // 3 seconds
      return () => clearTimeout(timer); // cleanup
    }
  }, [submitted]);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="brand-logo-container">
            <img src={logo} alt="Healthcare Logo" className="brand-logo" />
          </div>
        </div>
        <div className="navbar-link">
          <a href="main.html" className="back-button">Back to main site</a>
        </div>
      </nav>

      {/* Contact Form */}
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
          <input type="text" name="name" placeholder="Your Name" className="contact-inputs" required />
          <input type="email" name="email" placeholder="Your Email" className="contact-inputs" required />
          <input type="tel" name="number" placeholder="Your Phone number" className="contact-inputs" required pattern="[0-9]{10}" title="Please enter a 10-digit phone number" />
          <textarea name="message" placeholder="Short description about your query" className="contact-inputs" required minLength="10" maxLength="300" />
          <button type="submit">
            Submit <img src={arrowIcon} alt="" />
          </button>
        </form>

        <div className="contact-right">
          <img src={contactImage} alt="Contact Us" />
        </div>
      </div>
    </>
  );
}

export default ContactPage;


/*function ContactForm() {
  <>
  //State to manage form submission
  const [submitted, setSubmitted]= useState(false);
  //Handle Form Submission
  const handleSubmit=(e)=> {
    e.preventDefault();
    setSubmitted(true);
  };
  return (
    <div className="contact-container">
      {submitted && (
        <div className='thank-you-overlay'>
          <div className='thank-you-box'>
            <h2>Thank You for your Submission</h2>
            <p>Our team will reach out to you soon</p>          
          </div>
        </div>       
      )}
        {/*Contact Form}
      <form className="contact-left" onSubmit={handleSubmit}>
        <div className="contact-left-title">
          <h2>Get In Touch</h2>
          <hr />
        </div>
        <input type="text" name="name" placeholder="Your Name" className="contact-inputs" required />
        <input type="email" name="email" placeholder="Your Email" className="contact-inputs" required />
        <input type="tel" name="number" placeholder="Your Phone number" className="contact-inputs" required pattern="[0-9]{10}" title="Please enter a 10-digit phone number" />
        <textarea name="message" placeholder="Short description about your query" className="contact-inputs" required minLength="10" maxLength="300" />
        <button type="submit">
          Submit <img src={arrowIcon} alt="" />
        </button>
      </form>
      
      <div className="contact-right">
        <img src={contactImage} alt="" />
      </div>
    </div>
   </> 
  );
}

export default ContactForm;*/
