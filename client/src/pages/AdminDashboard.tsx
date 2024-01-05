import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminNavBar from '../components/AdminNavBar';
import DataTable from 'react-data-table-component';
import useFetchAdmin from '../hooks/useFetchAdmin';

const AdminDashboard = () => {
    const authContext = useContext(AuthContext) || { user: null, loading: false, error: null, dispatch: () => {} };
    const { user } = authContext;
    const navigate = useNavigate()
    const { userData: data } = useFetchAdmin()
    console.log(data)

  return (
    <div>
        <AdminNavBar />
        <div className='mt-5 mx-5 border border-black'>
        <h1>HELLO ADMIN</h1>
        <h1>User ID: {data.id}</h1>
        <h2>First Name: {data.firstName}</h2>
        <h2>Last Name: {data.lastName}</h2>
      </div>
    </div>
  )
}

export default AdminDashboard