// src/App.jsx
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LandingPage from './pages/landingpage'; // Corrected import name and path

const App = () => {
  const styles = {
    main: {
      textAlign: 'center',
      padding: '20px',
    },
  };

  return (
    <div>
      <Navbar />
      
      {/* Main Content */}
      <main style={styles.main}>
        <LandingPage /> {/* Proper component usage with PascalCase */}
      </main>

      <Footer />
    </div>
  );
};

export default App;