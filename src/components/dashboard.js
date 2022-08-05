import React from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import './styles.css';


import { useAuth } from '../hooks';

export const Dashboard = () => {

  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="container">
      <h2 className="header">Dashboard</h2>
      <p>
        <NavLink className="nav-link" to="/past-orders">Past Orders</NavLink>
      </p>
      <p>
        <NavLink className="nav-link" to="/restaurants">Restaurants</NavLink>
      </p>
      <p>
        <NavLink className="nav-link" to="/user">User Info</NavLink>
      </p>
    </div>
  );
};

export default Dashboard;