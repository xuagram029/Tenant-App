import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import useFetchUser from '../hooks/useFetchUser';

const UserPage = () => {
  const authContext = useContext(AuthContext) || { user: null, loading: false, error: null, dispatch: () => {} };
  const { user } = authContext;
  const navigate = useNavigate()
  const { userData: data } = useFetchUser()
  
  return (
    <div>
      <NavBar />
      <div className='mt-5 mx-5 border border-black'>
        <h1>HELLO USER</h1>
        <h1>User ID: {data.id}</h1>
        <h2>First Name: {data.firstName}</h2>
        <h2>Last Name: {data.lastName}</h2>
      </div>
    </div>
  );
};

export default UserPage;
