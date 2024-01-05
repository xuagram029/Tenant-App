import React, { useContext,MouseEvent } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios, { AxiosError } from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const AdminNavBar = () => {
    const url = location.pathname.split('/')[1]
    const apiUrl = import.meta.env.VITE_API_URL
    const authContext = useContext(AuthContext) || { user: null, loading: false, error: null, dispatch: () => {} };
    const navigate = useNavigate()

    const {user, dispatch} = authContext
    let userFullName = ''

    if(user){ 
        userFullName = user?.resp[0].admin_firstname + ' ' + user?.resp[0].admin_lastname
    }

    const handleLogout = async(e: MouseEvent<HTMLButtonElement>) => {
        try {
            dispatch({ type: 'LOGOUT' })
            navigate('/admin-login')
            const res = await axios.post(`${apiUrl}/admins/logout`)
            console.log(res.data.message)
        } catch (error) {
            if(error instanceof AxiosError){
                console.log(error?.response?.data?.error);
            }
        }
    }

  return (
    <div className='left-0 w-full flex items-center mx-auto p-3 h-20 bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'>
        <header className='mx-8 flex justify-between w-full'>
            <div>
                <h1 className='font-semibold text-xl'>
                    TNNT
                </h1>
            </div>
            {
                !user ? 
            <div className='flex gap-8'>
                
                <button className='p-2 border border-dark rounded-md text-white bg-dark hover:text-dark hover: hover:bg-white duration-300'><Link to='/admin-login'>Login</Link></button>
                <button className='p-2 border border-dark rounded-md hover:bg-dark hover:text-white duration-300'><Link to='/admin-signup'>Signup</Link></button>
            </div>
                : 
            <div className='flex gap-5 items-baseline'>
                <h1>{ userFullName.toUpperCase() }</h1>
                <button className='p-1 border border-dark rounded-md text-white bg-dark hover:text-dark hover: hover:bg-white duration-300' onClick={handleLogout}>Logout</button>
            </div>
            }
        </header>
    </div>
  )
}

export default AdminNavBar