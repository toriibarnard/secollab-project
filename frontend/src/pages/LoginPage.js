// frontend/src/pages/LoginPage.js

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // import Link from react-router-dom
import './LoginPage.css'; // styling for this page

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/login', { email, password });
      const { token } = response.data;

      localStorage.setItem('authToken', token);
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn">Login</button>
        </form>
        <p className="signup-text">Don't have an account? <Link to="/register">Create one here</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;