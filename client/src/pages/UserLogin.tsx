import React, { ChangeEvent, MouseEvent, useContext, useState, useEffect } from 'react'
import axios, { AxiosError } from 'axios'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'

interface User { 
  username: string, 
  password: string
}

const UserLogin = () => {
  const navigate = useNavigate()
  const authcontext = useContext(AuthContext)|| { user: null, loading: false, error: null, dispatch: () => {} }
  const apiUrl = import.meta.env.VITE_API_URL
  const { user, dispatch } = authcontext 
  const [userInfo, setUserInfo] = useState<User>({
    username: '', 
    password: ''
  })

  useEffect(() => {
    if(user){ 
      navigate('/user-home')
    }
  }, [user])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value }  = e.target
    setUserInfo(prev => ({...prev, [name]: value}))
  }

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      dispatch({ type: 'LOGIN_START' })
      const res = await axios.post(`${apiUrl}/users/login`, userInfo)
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data})
      navigate('/user-home')
    } catch (error ) {
      if(error instanceof AxiosError){
        dispatch({ type: 'LOGIN_FAIL', payload: error?.response?.data?.error })
        console.log(error?.response?.data?.error);
      }
    }
  }

  return (
    <div className='h-screen'>
      <NavBar />
      <div className='flex w-screen h-[85vh] justify-center items-center '>
        <div className='flex flex-col p-14 w-1/3 h-1/w-1/3 border border-black rounded-lg'>
          <label htmlFor="username">USERNAME</label>
          <input onChange={handleChange} name='username' id='username' type="text" className='w-full border border-black p-2 rounded-md mb-5'/>
          <label htmlFor="password">PASSWORD</label>
          <input onChange={handleChange} name='password' id='password' type="password" className='w-full border border-black p-2 rounded-md mb-8'/>
          <button onClick={handleSubmit} className='w-full border border-black p-3 rounded-md hover:bg-dark hover:text-primary'>Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default UserLogin