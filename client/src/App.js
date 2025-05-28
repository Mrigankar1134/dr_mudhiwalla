// src/App.js
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/landingpage';
import ContactForm from './pages/ContactForm';
import BasicForm from './pages/BasicForm';
import DiagnosisForm from './pages/DiagnosisForm';
import RiskFactorsForm from './pages/RiskFactorForm';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import { AuthContext } from './context/AuthContext';
import './App.css';

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
