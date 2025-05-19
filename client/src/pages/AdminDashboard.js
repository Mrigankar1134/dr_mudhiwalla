// src/pages/AdminDashboard.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './AdminDashboard.css';
import API from '../api';

export default function AdminDashboard() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showWizard, setShowWizard] = useState(false);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPatients() {
      try {
        const res = await fetch(API.PATIENTS, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setPatients(data);
      } catch (err) {
        setError('Unable to load screenings');
      } finally {
        setLoading(false);
      }
    }
    fetchPatients();
  }, [token]);

  const handleScreenNew = () => setShowWizard(true);
  const openForm = form => {
    setShowWizard(false);
    if (form === 'basic') navigate('/basic-info');
    if (form === 'diagnosis') navigate('/diagnosis');
    if (form === 'lifestyle') navigate('/risk-factors');
  };

  return (
    <div className="admin-dashboard-container">
      <div className="main-area">
        <header className="main-header">
          <h2>Admin Dashboard</h2>
          <button className="btn primary" onClick={handleScreenNew}>
            Screen New User
          </button>
        </header>

        <section className="screenings">
          <h3>Screenings</h3>
          {loading ? (
            <p className="info">Loading...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <table className="screenings-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map(p => (
                  <tr key={p.phone}>
                    <td>{p.name}</td>
                    <td>{p.phone}</td>
                    <td>{p.email}</td>
                    <td>{p.gender}</td>
                    <td>
                      <button
                        className="btn"
                        onClick={() =>
                          window.open(
                            `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001/api'.replace('/api', '')}/report/html?patient=${p.phone}`,
                            '_blank'
                          )
                        }
                      >
                        View Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {showWizard && (
          <div className="wizard-overlay" onClick={() => setShowWizard(false)}>
            <div className="wizard-modal" onClick={e => e.stopPropagation()}>
              <h3>Select Screening Form</h3>
              <button className="wizard-btn" onClick={() => openForm('basic')}>1. Basic Info</button>
              <button className="wizard-btn" onClick={() => openForm('diagnosis')}>2. Diagnosis</button>
              <button className="wizard-btn" onClick={() => openForm('lifestyle')}>3. Lifestyle</button>
              <button className="wizard-close" onClick={() => setShowWizard(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}