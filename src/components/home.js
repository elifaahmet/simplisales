import React, { useState } from 'react';
import { useAuth } from '../hooks';
import { NavLink } from 'react-router-dom';

import './styles.css';

export const Home = () => {
  const { handleLogin, token } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(email, password);
  }

  if(token) {
    return (
      <>
        <h2 className="header">Welcome!</h2>
        <div className="container">
          <p className="info">
            You are already logged in! Go to <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="header">Welcome!</h2>
      <form className="container" onSubmit={handleSubmit}>
          <label>
            Email:
          </label>
          <input 
              className="input"
              type="email"
              name="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          <label>
           Password:
          </label>
          <input
              className="input"
              name="password"
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          <button className="button" type="submit">
            Sign In
          </button>
      </form>
     
    </>
  );
};

export default Home;