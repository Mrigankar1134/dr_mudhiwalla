// src/components/LifestyleForm.jsx
import React, { useState, useContext } from 'react';
import indiaFlag from '../assets/indian-flag.png';
import RatingRow from '../../components/RatingRow/RatingRow';
import './RiskFactorsForm.css';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../../api';    // ← add this

export default function LifestyleForm() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const totalPages = 6;
  const [page, setPage] = useState(1);
  const [form, setForm] = useState({
    phone: '',
    pressureOverwhelmed: '',
    physicalSymptoms: '',
    physicalActivity: '',
    refreshedFeeling: '',
    sleepHours: '',
    outsideFoodFreq: '',
    chipsChocFreq: '',
    alcoholFreq: '',
    smokingFreq: ''
  });
  const [loading, setLoading] = useState(false);

  // options for each field
  const pressureOpts = [
    'Rarely / Once / Two times in last 14 days',
    'Sometimes (1–2 days/week)',
    'Often / Mostly on working days',
    'Very Often / Almost Daily'
  ];
  const activityOpts = [
    'Almost Daily / Regularly',
    'On Office Days (3–5 days/week)',
    'On Weekends Only (1–2 days/week)',
    'After Office Work / Rarely'
  ];
  const sleepOpts = [
    'Almost Daily / Regularly',
    'On Office Days (3–5 days/week)',
    'On Weekends (1–2 days/week)',
    'Rarely in a month'
  ];
  const dietOpts = [
    'Rarely (1–2 days/month)',
    'Occasionally on Weekends',
    '3–4 times/week (Office days)',
    'Almost Daily'
  ];
  const alcoholOpts = [
    'Non-drinker / Teetotaller',
    'Quit in the past',
    'Occasionally (Parties)',
    'Daily habit'
  ];
  const smokingOpts = [
    'Non-smoker / Teetotaller',
    'Quit in the past',
    'Occasionally (Parties)',
    'Daily habit'
  ];

  // helper to update a single field
  const pick = (field, idx, opts) =>
    setForm(f => ({ ...f, [field]: opts[idx] }));

  const handlePhoneChange = e =>
    setForm(f => ({ ...f, phone: e.target.value }));

  const next = () => setPage(p => Math.min(totalPages, p + 1));
  const back = () => setPage(p => Math.max(1, p - 1));

  const handleSubmit = async () => {
    if (!/^[0-9]{10}$/.test(form.phone)) {
      return window.alert('Please enter a valid 10-digit phone number.');
    }
    setLoading(true);
    try {
      const res = await fetch(API.LIFESTYLE(form.phone), {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            pressureOverwhelmed: form.pressureOverwhelmed,
            physicalSymptoms:    form.physicalSymptoms,
            physicalActivity:    form.physicalActivity,
            refreshedFeeling:    form.refreshedFeeling,
            sleepHours:          form.sleepHours,
            outsideFoodFreq:     form.outsideFoodFreq,
            chipsChocFreq:       form.chipsChocFreq,
            alcoholFreq:         form.alcoholFreq,
            smokingFreq:         form.smokingFreq
          })
        }
      );
      if (!res.ok) throw new Error(`Status ${res.status}`);
      window.alert('✅ Lifestyle data saved!');
      navigate('/admin');
      setForm({
        phone: '',
        pressureOverwhelmed: '',
        physicalSymptoms: '',
        physicalActivity: '',
        refreshedFeeling: '',
        sleepHours: '',
        outsideFoodFreq: '',
        chipsChocFreq: '',
        alcoholFreq: '',
        smokingFreq: ''
      });
      setPage(1);
    } catch (err) {
      console.error(err);
      window.alert('❌ Failed to save lifestyle data.');
    } finally {
      setLoading(false);
    }
  };

  const renderPage = () => {
    switch (page) {
      case 1:
        return (
          <div className="page">
            <h3>Enter Phone</h3>
            <div className="field-group">
              <label>Mobile (country code)</label>
              <div className="phone-input">
                <div className="country-code">
                  <img src={indiaFlag} alt="IN" /><span>+91</span>
                </div>
                <input
                  name="phone"
                  type="tel"
                  placeholder="1234567890"
                  required
                  pattern="[0-9]{10}"
                  value={form.phone}
                  onChange={handlePhoneChange}
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="page">
            <h3>Screen Your Stress</h3>
            <RatingRow
              question="In last 2 weeks, how often have you felt pressured/overwhelmed by work or personal responsibilities?"
              options={pressureOpts}
              value={pressureOpts.indexOf(form.pressureOverwhelmed)}
              onChange={idx => pick('pressureOverwhelmed', idx, pressureOpts)}
            />

            <RatingRow
              question="In last 2 weeks, how often have you experienced headaches, fatigue or sleep issues due to stress?"
              options={pressureOpts}
              value={pressureOpts.indexOf(form.physicalSymptoms)}
              onChange={idx => pick('physicalSymptoms', idx, pressureOpts)}
            />
          </div>
        );
      case 3:
        return (
          <div className="page">
            <h3>Daily Physical Activity</h3>
            <RatingRow
              question="Apart from office work/commute, how often you engaged in physical activity (gym/yoga/brisk walk) for atleast 30-45 minutes?"
              options={activityOpts}
              value={activityOpts.indexOf(form.physicalActivity)}
              onChange={idx => pick('physicalActivity', idx, activityOpts)}
            />
          </div>
        );
      case 4:
        return (
          <div className="page">
            <h3>Sleep Rejuvenation</h3>
            <RatingRow
              question="In a typical week, how often do you feel refreshed/energetic after getting up?"
              options={sleepOpts}
              value={sleepOpts.indexOf(form.refreshedFeeling)}
              onChange={idx => pick('refreshedFeeling', idx, sleepOpts)}
            />

            <RatingRow
              question="In a typical week, how often do you get 6-8 hours of good sleep?"
              options={sleepOpts}
              value={sleepOpts.indexOf(form.sleepHours)}
              onChange={idx => pick('sleepHours', idx, sleepOpts)}
            />
          </div>
        );
      case 5:
        return (
          <div className="page">
            <h3>Diet & Nutrition</h3>
            <RatingRow
              question="How often in a week do you eat outside food (restaurant/fast food)?"
              options={dietOpts}
              value={dietOpts.indexOf(form.outsideFoodFreq)}
              onChange={idx => pick('outsideFoodFreq', idx, dietOpts)}
            />

            <RatingRow
              question="How often in a week do you consume snacks (chips/sweets/drinks)?"
              options={dietOpts}
              value={dietOpts.indexOf(form.chipsChocFreq)}
              onChange={idx => pick('chipsChocFreq', idx, dietOpts)}
            />
          </div>
        );
      case 6:
        return (
          <div className="page">
            <h3>Smoking & Alcohol</h3>

            <RatingRow
              question="How often do you consume alcohol?"
              options={alcoholOpts}
              value={alcoholOpts.indexOf(form.alcoholFreq)}
              onChange={idx => pick('alcoholFreq', idx, alcoholOpts)}
            />

            <RatingRow
              question="How often do you smoke  Cigarettes / Bidi / Tobacco?"
              options={smokingOpts}
              value={smokingOpts.indexOf(form.smokingFreq)}
              onChange={idx => pick('smokingFreq', idx, smokingOpts)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="wizard">
      {renderPage()}

      <div className="wizard-controls">
        <button onClick={back} disabled={page === 1 || loading}>
          Back
        </button>
        {page < totalPages ? (
          <button onClick={next} disabled={loading}>
            Next
          </button>
        ) : (
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving…' : 'Submit'}
          </button>
        )}
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${(page / totalPages) * 100}%` }}
        />
      </div>
    </div>
  );
}
