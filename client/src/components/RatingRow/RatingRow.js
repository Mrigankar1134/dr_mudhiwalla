// src/components/RatingRow.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './RatingRow.css';

/**
 * Renders a single question with 5 colored rating buttons and a "Clear All" action.
 */
export default function RatingRow({ question, options, value, onChange }) {
  return (
    <div className="rating-row">
      <div className="rating-question">{question}</div>
      <div className="rating-buttons">
        {options.map((label, idx) => (
          <button
            key={idx}
            type="button"
            className={`rating-btn ${value === idx ? 'selected' : ''}`}
            onClick={() => onChange(idx)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="clear-all" onClick={() => onChange(null)}>
        Clear All
      </div>
    </div>
  );
}

RatingRow.propTypes = {
  question: PropTypes.string.isRequired,
  options:  PropTypes.arrayOf(PropTypes.string).isRequired,
  value:    PropTypes.number,
  onChange: PropTypes.func.isRequired,
};