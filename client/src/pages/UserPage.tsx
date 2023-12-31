import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const UserPage = () => {
  const authContext = useContext(AuthContext) || { user: null, loading: false, error: null, dispatch: () => {} };
  const { user } = authContext;
  
  if (user) {
    const userArray = user.resp;

    if (userArray.length > 0) {
      const firstUser = userArray[0];
      const { user_id, user_firstname, user_lastname } = firstUser;

      return (
        <div>
          <h1>User ID: {user_id}</h1>
          <h2>First Name: {user_firstname}</h2>
          <h2>Last Name: {user_lastname}</h2>
        </div>
      );
    }
  }

  return <div>No user data available.</div>;
};

export default UserPage;
