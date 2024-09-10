import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/users/register', {
        username,
        password,
      });
      // Redirect or update UI accordingly
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="registerContainer">
      <h2 className="registerTitle">Register</h2>
      <form onSubmit={handleSubmit} className="registerForm">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="registerInput"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="registerInput"
        />
        <button type="submit" className="registerButton">Register</button>
      </form>
      <p className="auth-signup-link">
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};

export default Register;
