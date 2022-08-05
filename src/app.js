import React, { useState, createContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import {  Home, Dashboard, NoMatch, PastOrders, Restaurants, User } from './components';
import { login } from './graphql'


export const AuthContext = createContext(null);
export default function App() {

  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  const handleLogin = async (email, password) => {
      const { token, isSuccess } = await login(email, password);

      if (!isSuccess) {
        alert('Something is not right, please try again');
        return;
      }
      setToken(token);
      navigate('/dashboard');
  };


  return (
    <AuthContext.Provider value={{token, handleLogin}}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="past-orders" element={<PastOrders />} />
          <Route path="restaurants" element={<Restaurants />} />
          <Route path="user" element={<User />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
    </AuthContext.Provider>
  );
};