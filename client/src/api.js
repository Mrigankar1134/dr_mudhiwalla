// src/api.js
const BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001/api';

const API = {
    AUTH_LOGIN: `${BASE}/auth/login`,
    CONTACT:  `${BASE}/contact`,
    PATIENTS:   `${BASE}/patients`,
    LIFESTYLE: (phone) => `${BASE}/patients/${encodeURIComponent(phone)}/lifestyle`,
    SCORE:    (phone) => `${BASE}/patients/${encodeURIComponent(phone)}/score`,
}
export default API;