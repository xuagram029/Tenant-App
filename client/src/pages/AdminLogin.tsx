import React, { ChangeEvent, MouseEvent, useState, useContext } from 'react'
import { UserLogin } from '../types/types'
import { AuthContext } from '../context/AuthContext'
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import AdminNavBar from '../components/AdminNavBar'

const AdminLogin = () => {
    const authcontext = useContext(AuthContext)|| { user: null, loading: false, error: null, dispatch: () => {} }
    const apiUrl = import.meta.env.VITE_API_URL
    const { user, dispatch } = authcontext
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState<UserLogin>({
        username: '',
        password: ''
     })

     const handleChange = (e: ChangeEvent<HTMLInputElement>) => { 
        const { name, value } = e.target
        setUserInfo(prev => ({...prev, [name]: value}))
     }

     const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            dispatch({ type : 'LOGIN_START' })
            const res = await axios.post(`${apiUrl}/admins/login`, userInfo)
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data})
            navigate('/admin-dashboard')
        } catch (error) {
            if(error instanceof AxiosError){ 
                dispatch( {type: 'LOGIN_FAIL', payload: error?.response?.data?.error})
                console.log(error?.response?.data?.error);
            }
        }
     }

  return (
    <div className='h-screen'>
    <AdminNavBar />
    <div className='flex w-screen h-[85vh] justify-center items-center '>
      <div className='flex flex-col p-14 w-1/3 h-1/w-1/3 border border-black rounded-lg'>
        <label htmlFor="username">USERNAME</label>
        <input onChange={handleChange} name='username' id='username' type="text" className='w-full border border-black p-2 rounded-md mb-5'/>
        <label htmlFor="password">PASSWORD</label>
        <input onChange={handleChange} name='password' id='password' type="password" className='w-full border border-black p-2 rounded-md mb-8'/>
        <button onClick={handleSubmit} className='w-full border border-black p-3 rounded-md hover:bg-btn-dark hover:text-primary duration-200'>Sign In</button>
      </div>
    </div>
  </div>
  )
}

export default AdminLogin