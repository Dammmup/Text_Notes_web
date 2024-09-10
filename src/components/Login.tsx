import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/users/login', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token);
      // Redirect or update UI accordingly
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="loginContainer">
      <h2 className="loginTitle">Login</h2>
      <form onSubmit={handleSubmit} className="loginForm">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="loginInput"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="loginInput"
        />
        <button type="submit" className="loginButton">Login</button>
      </form>
      <p className="auth-signup-link">
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;
