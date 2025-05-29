// src/components/DiagnosisForm.jsx
import indiaFlag from '../../assets/indian-flag.png'

import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './BasicForm.css';  // reuse your existing basic form styles
import { useNavigate } from 'react-router-dom';

export default function DiagnosisForm() {
  const { token } = useContext(AuthContext);
  const [phone, setPhone] = useState('');
  const [form, setForm] = useState({
    systolic: '',
    diastolic: '',
    cholesterol: '',
    bloodSugar: ''
  });
  // New state for medication question
  const [takingMedication, setTakingMedication] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!/^[0-9]{10}$/.test(phone)) {
      return alert('Please enter a valid 10-digit phone number.');
    }
    if (!takingMedication) {
      return alert('Please answer the medication question.');
    }

    setLoading(true);
    try {
      const response = await fetch(
        `/api/patients/${encodeURIComponent(phone)}/diagnosis`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            bloodPressure: {
              systolic: Number(form.systolic),
              diastolic: Number(form.diastolic)
            },
            cholesterol: Number(form.cholesterol),
            bloodSugar: Number(form.bloodSugar),
            // send medication flag
            takingMedication: takingMedication === 'yes'
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Status ${response.status}`);
      }
      alert('✅ Diagnosis updated successfully!');
      navigate('/admin');
      setForm({ systolic: '', diastolic: '', cholesterol: '', bloodSugar: '' });
      setPhone('');
      setTakingMedication('');
    } catch (err) {
      console.error('Diagnosis update error:', err);
      alert('❌ Failed to update diagnosis.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="basic-form">
      <h2>Diagnosis Entry</h2>

      {/* Phone Input */}
      <div className="field-group">
        <label>Mobile</label>
        <div className="phone-input">
          <div className="country-code">
            <img src={indiaFlag} alt="IN" />
            <span>+91</span>
          </div>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="1234567890"
            required
            pattern="[0-9]{10}"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>
      </div>

      {/* Blood Pressure Fields */}
      <div className="field-row">
        <div className="field-group small">
          <label htmlFor="systolic">Systolic (mmHg)</label>
          <input
            id="systolic"
            name="systolic"
            type="number"
            min="0"
            placeholder="120"
            required
            value={form.systolic}
            onChange={handleChange}
          />
        </div>
        <div className="field-group small">
          <label htmlFor="diastolic">Diastolic (mmHg)</label>
          <input
            id="diastolic"
            name="diastolic"
            type="number"
            min="0"
            placeholder="80"
            required
            value={form.diastolic}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Cholesterol */}
      <div className="field-group">
        <label htmlFor="cholesterol">Cholesterol (mg/dL)</label>
        <input
          id="cholesterol"
          name="cholesterol"
          type="number"
          min="0"
          placeholder="190"
          required
          value={form.cholesterol}
          onChange={handleChange}
        />
      </div>

      {/* Blood Sugar */}
      <div className="field-group">
        <label htmlFor="bloodSugar">Blood Sugar (mg/dL)</label>
        <input
          id="bloodSugar"
          name="bloodSugar"
          type="number"
          min="0"
          placeholder="110"
          required
          value={form.bloodSugar}
          onChange={handleChange}
        />
      </div>

      {/* Medication Question */}
      <div className="field-group">
        <label>Are you taking medication for diabetes?</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="takingMedication"
              value="yes"
              required
              checked={takingMedication === 'yes'}
              onChange={e => setTakingMedication(e.target.value)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="takingMedication"
              value="no"
              checked={takingMedication === 'no'}
              onChange={e => setTakingMedication(e.target.value)}
            />
            No
          </label>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="form-nav">
        <button type="submit" className="nav-btn primary" disabled={loading}>
          {loading ? 'Saving…' : 'Save Diagnosis'}
        </button>
      </div>
    </form>
  );
}