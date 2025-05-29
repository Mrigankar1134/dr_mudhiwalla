// src/App.js
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/Landing Page/landingpage';
import ContactForm from './pages/Form/ContactForm';
import BasicForm from './pages/Form/BasicForm';
import DiagnosisForm from './pages/Form/DiagnosisForm';
import RiskFactorsForm from './pages/Form/RiskFactorForm';
import Login from './pages/Login Page/Login';
import AdminDashboard from './pages/Admin Dashboard/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import { AuthContext } from './context/AuthContext';
import './App.css';
import Services from './pages/Services/Services';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <main className="app-content">
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Navigate
                  to={user.role === 'admin' ? '/admin' : '/basic-info'}
                  replace
                />
              ) : (
                <LandingPage />
              )
            }
          />

          {/* public */}
          <Route path="/login" element={<Login />} />
          <Route path="/ContactForm" element={<ContactForm />} />
          <Route path="/Services" element={<Services />} />

          {/* admin only */}
          <Route
            path="/admin/*"
            element={
              <PrivateRoute roles={['admin']}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          {/* professional & admin both */}
          <Route
            path="/basic-info"
            element={
              <PrivateRoute roles={['professional','admin']}>
                <BasicForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/diagnosis"
            element={
              <PrivateRoute roles={['professional','admin']}>
                <DiagnosisForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/risk-factors"
            element={
              <PrivateRoute roles={['professional','admin']}>
                <RiskFactorsForm />
              </PrivateRoute>
            }
          />

          {/* catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
