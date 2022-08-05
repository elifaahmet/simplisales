import React, { useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';

import { getRestaurants, LIMIT } from '../graphql';
import './styles.css';


import { useAuth } from '../hooks';

export const Restaurants = () => {

  const { token } = useAuth();
  const [indexWithDelivery, setIndexWithDelivery] = useState(0);
  const [indexWithNoDelivery, setIndexWithNoDelivery] = useState(0);
  const [restaurantsWithDelivery, setRestaurantsWithDelivery] = useState([]);
  const [restaurantsWithNoDelivery, setRestaurantsWithNoDelivery] = useState([]);

  const loadRestaurantsWithDelivery = () => {
    getRestaurants(token, indexWithDelivery, true).then((data) => {
      if(data.isSuccess) {
        setRestaurantsWithDelivery([...restaurantsWithDelivery, ...data.restaurants]);
        setIndexWithDelivery(indexWithDelivery + LIMIT);
       }
       else {
        alert('Something is wrong!');
        return [];
      }
    }).catch(() => {
      alert('Something is wrong!');
      return [];
    });
  }

  const loadRestaurantsWithNoDelivery = () => {
    getRestaurants(token, indexWithNoDelivery, false).then((data) => {
      if(data.isSuccess) {
        setRestaurantsWithNoDelivery([...restaurantsWithDelivery, ...data.restaurants]);
        setIndexWithNoDelivery(indexWithNoDelivery + LIMIT);
       }
       else {
        alert('Something is wrong!');
        return [];
      }
    }).catch(() => {
      alert('Something is wrong!');
      return [];
    });
  }

  useEffect(() => {
    loadRestaurantsWithDelivery();
    loadRestaurantsWithNoDelivery();
  }, []);

  if (!token) {
    return <Navigate to="/home" replace />;
  }
  return (
    <div className="container">
      <h2 className="header">Restaurants With Delivery</h2>
      <table className="table">
      <tr>
        <th>Name</th>
        <th>Open</th>
        <th>Average Score</th>
        <th>Min Order Amount</th>
      </tr>
      {restaurantsWithDelivery.map(((restaurant, restaurant_index) => {
        return (
          <tr key={restaurant_index}>
            <td>{restaurant.name}</td>
            <td>{restaurant.open ? "true" : "false"}</td>
            <td>{restaurant.avgScore}</td>
            <td>{restaurant.minOrderAmount}</td>
          </tr>
          );
      }))}
      </table>
      <button className="button" onClick={loadRestaurantsWithDelivery}>Load More...</button>
      <h2 className="header">Restaurants With No Delivery</h2>
      <table className="table">
      <tr>
        <th>Name</th>
        <th>Open</th>
        <th>Average Score</th>
        <th>Min Order Amount</th>
      </tr>
      {restaurantsWithNoDelivery.map(((restaurant, restaurant_index) => {
        return (
          <tr key={restaurant_index}>
            <td>{restaurant.name}</td>
            <td>{restaurant.open}</td>
            <td>{restaurant.avgScore}</td>
            <td>{restaurant.minOrderAmount}</td>
          </tr>
          );
      }))}
      </table>
      <button className="button" onClick={loadRestaurantsWithNoDelivery}>Load More...</button>
    </div>
  );
};

export default Restaurants;