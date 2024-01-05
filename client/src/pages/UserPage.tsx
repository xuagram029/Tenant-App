import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

const UserPage = () => {
  const authContext = useContext(AuthContext) || { user: null, loading: false, error: null, dispatch: () => {} };
  const { user } = authContext;
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    email:'',
    mobile: null
  })

  useEffect(() => {
    if(user){
      navigate('/user-home')
        const userId = user?.resp[0].user_id
        const userFirstName = user?.resp[0].user_firstname || ''
        const userLastName = user?.resp[0].user_lastname || ''
        const userUserName = user?.resp[0].user_username || ''
        const userEmail = user?.resp[0].user_email || ''
        const userMobile = user?.resp[0].user_mobile || ''
        
        setUserData({
          id: userId,
          firstName: userFirstName,
          lastName: userLastName,
          userName: userUserName,
          password: '',
          email: userEmail,
          mobile: userMobile
        })
    }else{
        navigate('/user-login')
    }
}, [user])

  return (
    <div>
      <NavBar />
      <div className='mt-5 mx-5 border border-black'>
        <h1>User ID: {userData.id}</h1>
        <h2>First Name: {userData.firstName}</h2>
        <h2>Last Name: {userData.lastName}</h2>
      </div>
    </div>
  );
};

export default UserPage;
