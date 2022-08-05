import React, { useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';

import { getPastOrders, LIMIT } from '../graphql';
import './styles.css';


import { useAuth } from '../hooks';

export const PastOrders = () => {

  const { token } = useAuth();
  const [index, setIndex] = useState(0);
  const [pastOrders, setPastOrders] = useState([]);

  const loadOrders = () => {
    getPastOrders(token, index).then((data) => {
      if(data.isSuccess) {
        setPastOrders([...pastOrders, ...data.pastOrders]);
        setIndex(LIMIT + index);
      }
      else {
        alert('Something is wrong!');
      }
    }).catch(() => {
      alert('Something is wrong!');
    });
  }


  useEffect(() => {
    if(token)
      loadOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  if (!token) {
    return <Navigate to="/home" replace />;
  }
  return (
    <div className="container">
      <h2 className="header">Past Orders</h2>
      <table className="table">
      <tr>
        <th>City</th>
        <th>Date</th>
        <th>Items</th>
      </tr>
      {pastOrders.map(((order, order_index) => {
        return (
          <tr key={order_index}>
            <td>{order.address && order.address.city ? order.address.city.name : ""}</td>
            <td>{order.deliveryTime}</td>
            <td>
              <table className="inner-table">
                <tr>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Name</th>
                  <th>Note</th>
                  <th>Quantity</th>
                  <th>Total Amount</th>
                </tr>
                {
                  order.items && order.items.map((item, item_index) => (
                    <tr key={item_index }>
                      <td>{ item.amount } </td>
                      <td>{ item.description } </td>
                      <td>{ item.name } </td>
                      <td>{ item.note } </td>
                      <td>{ item.quantity } </td>
                      <td>{ item.totalAmount } </td>
                    </tr>
                  )
                )}
              </table>
            </td>
          </tr>
          );
      }))}
      </table>
      <button className="button" onClick={loadOrders}>Load More...</button>
    </div>
  );
};

export default PastOrders;