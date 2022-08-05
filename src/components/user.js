import React, { useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';

import { getUser } from '../graphql';
import './styles.css';


import { useAuth } from '../hooks';

export const User = () => {

  const { token } = useAuth();
  const [user, setUser] = useState(null);

  const loadUser = () => {
    getUser(token).then((data) => {
      if(data.isSuccess) {
        setUser(data.user);
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
    loadUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  if (!token) {
    return <Navigate to="/home" replace />;
  }
  return (
    <div className="container">
      <h2 className="header">User Info</h2>
      {user && 
        <>
          <div>
            <label className="label">Name</label>
            <p>{`${user.firstName} ${user.lastName}`}</p>
          </div>
          <div>
            <label className="label">Email</label>
            <p>{user.email}</p>
          </div>
          <div>
            <label className="label">Addresses</label>
            <table className="inner-table">
            {
              user.addresses.map((address, address_index) => (
                <tr key={address_index}>
                  <td>{ address.addressLine1 } </td>
                  <td>{ address.addressLine1 } </td>
                  <td>{ address.city ? address.city.name : "" } </td>
                </tr>
              )
            )}
            </table>
          </div>
          <div>
            <label className="label">Mobile Number</label>
            <p>{user.mobileNumber}</p>
          </div>
          <div>
            <label className="label">Points</label>
            <p>{user.points}</p>
          </div>
        </>
      }
    </div>
  );
};

export default User;