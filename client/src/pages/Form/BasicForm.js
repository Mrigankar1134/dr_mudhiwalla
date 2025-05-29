// src/pages/BasicForm.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import indiaFlag from '../../assets/indian-flag.png';

import './BasicForm.css';
import API from '../../api'; 

export default function BasicForm() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    age: '',
    height: '',
    weight: '',
    waistCircumference: '',
    hipCircumference: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const next = () => setPage(p => Math.min(p + 1, 2));
  const back = () => setPage(p => Math.max(p - 1, 1));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      phone: form.phone,
      name: form.name,
      email: form.email,
      gender: form.gender,
      age: Number(form.age),
      height: Number(form.height),
      weight: Number(form.weight),
      hipCircumference: Number(form.hipCircumference),
      waistCircumference: Number(form.waistCircumference),
    };

    try {
      const res = await fetch(API.PATIENTS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('✅ Patient record created');
        navigate('/admin');
      } else if (res.status === 401) {
        alert('⚠️ Unauthorized: please log in again');
        navigate('/login');
      } else {
        console.error(await res.text());
        alert('❌ Something went wrong creating the patient record.');
      }
    } catch (err) {
      console.error(err);
      alert('❌ Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="basic-form">
      <h2>Basic Information</h2>

      {/* Page 1: Personal Details */}
      {page === 1 && (
        <>
          <div className="field-group">
            <label htmlFor="name">Name</label>
            <input
              id="name" name="name" type="text"
              placeholder="Your full name"
              value={form.name} onChange={handleChange}
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input
              id="email" name="email" type="email"
              placeholder="you@example.com"
              value={form.email} onChange={handleChange}
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="phone">Mobile (country code)</label>
            <div className="phone-input">
              <div className="country-code">
                <img src={indiaFlag} alt="IN" />
                <span>+91</span>
              </div>
              <input
                id="phone" name="phone" type="tel"
                placeholder="1234567890"
                pattern="[0-9]{10}"
                value={form.phone} onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender" name="gender"
              value={form.gender} onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </>
      )}

      {/* Page 2: Vitals */}
      {page === 2 && (
        <>
          <div className="field-row">
            <div className="field-group small">
              <label htmlFor="age">Age (years)</label>
              <input
                id="age" name="age" type="number" min="0"
                placeholder="e.g. 30"
                value={form.age} onChange={handleChange}
                required
              />
            </div>
            <div className="field-group small">
              <label htmlFor="height">Height (cm)</label>
              <input
                id="height" name="height" type="number" min="0"
                placeholder="e.g. 175"
                value={form.height} onChange={handleChange}
                required
              />
            </div>
            <div className="field-group small">
              <label htmlFor="weight">Weight (kg)</label>
              <input
                id="weight" name="weight" type="number" min="0"
                placeholder="e.g. 70"
                value={form.weight} onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field-row">
            <div className="field-group small">
              <label htmlFor="waistCircumference">
                Waist Circumference (cm)
              </label>
              <input
                id="waistCircumference" name="waistCircumference" type="number"
                min="0" placeholder="e.g. 80"
                value={form.waistCircumference} onChange={handleChange}
                required
              />
            </div>
            <div className="field-group small">
              <label htmlFor="hipCircumference">
                Hip Circumference (cm)
              </label>
              <input
                id="hipCircumference" name="hipCircumference" type="number"
                min="0" placeholder="e.g. 90"
                value={form.hipCircumference} onChange={handleChange}
                required
              />
            </div>
          </div>
        </>
      )}

      {/* Navigation */}
      <div className="form-nav">
        <button
          type="button"
          onClick={back}
          disabled={page === 1 || loading}
          className="nav-btn"
        >
          Back
        </button>
        {page < 2 ? (
          <button
            type="button"
            onClick={next}
            disabled={loading}
            className="nav-btn primary"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            disabled={loading}
            className="nav-btn primary"
          >
            {loading ? 'Submitting…' : 'Submit'}
          </button>
        )}
      </div>
    </form>
  );
}