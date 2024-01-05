import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminNavBar from '../components/AdminNavBar';

const AdminDashboard = () => {
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
            const userId = user?.resp[0]?.admin_id
            const userFirstName = user?.resp[0].admin_firstname || ''
            const userLastName = user?.resp[0].admin_lastname || ''
            const userUserName = user?.resp[0].admin_username || ''
            const userEmail = user?.resp[0].admin_email || ''
            const userMobile = user?.resp[0].admin_mobile || ''
    
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
        <AdminNavBar />
        <div className='mt-5 mx-5 border border-black'>
        <h1>User ID: {userData.id}</h1>
        <h2>First Name: {userData.firstName}</h2>
        <h2>Last Name: {userData.lastName}</h2>
      </div>
    </div>
  )
}

export default AdminDashboard