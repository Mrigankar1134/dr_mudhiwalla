// src/pages/Login.jsx
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import './Login.css'

export default function Login() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext)
  const nav = useNavigate()

  const submit = async e => {
    e.preventDefault()
    const res = await fetch('http://localhost:5001/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ phone, password }),
});
    if (res.ok) {
      const { token } = await res.json()
      login(token)
      nav('/')
    } else {
      alert('Login failed')
    }
  }

  return (
    <form onSubmit={submit} className="login-form">
      <h2>Professional Login</h2>
      <div className="field-group">
        <label>Phone</label>
        <input
          type="tel"
          placeholder="1234567890"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
        />
      </div>
      <div className="field-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}