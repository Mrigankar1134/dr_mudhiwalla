import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LandingPage from './pages/landingpage';
import ContactForm from './pages/ContactForm';
import { Routes, Route, useLocation } from 'react-router-dom'; // ✅ use Routes

const App = () => {
  const location = useLocation();
  
  // Footer will only render on the landing page (not on ContactForm)
  const shouldShowFooter = location.pathname !== '/ContactForm';

  return (
    <div>
      
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/ContactForm" element={<ContactForm />} />
        </Routes>
      </main>
      {shouldShowFooter && <Footer />}  {/* Conditionally render Footer */}
    </div>
  );
};

export default App;
