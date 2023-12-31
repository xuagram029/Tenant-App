import React, { ChangeEvent, MouseEvent, useContext, useState } from 'react'
import axios, { AxiosError } from 'axios'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

interface User { 
  username: string, 
  password: string
}

const UserLogin = () => {
  const navigate = useNavigate()
  const authcontext = useContext(AuthContext)
  const apiUrl = import.meta.env.VITE_API_URL
  const { dispatch } = authcontext || { dispatch: () => {}}
  const [user, setUser] = useState<User>({
    username: '', 
    password: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value }  = e.target
    setUser(prev => ({...prev, [name]: value}))
    console.log(user);
  }

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      dispatch({ type: 'LOGIN_START' })
      const res = await axios.post(`${apiUrl}/users/login`, user)
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
    <div className='flex w-screen h-screen justify-center items-center'>
      <div className='flex flex-col p-14 w-1/3 h-1/w-1/3 border border-black rounded-lg'>
        <label htmlFor="username">USERNAME</label>
        <input onChange={handleChange} name='username' id='username' type="text" className='w-full border border-black p-2 rounded-md mb-5'/>
        <label htmlFor="password">PASSWORD</label>
        <input onChange={handleChange} name='password' id='password' type="password" className='w-full border border-black p-2 rounded-md mb-8'/>
        <button onClick={handleSubmit} className='w-full border border-black p-3 rounded-md hover:bg-dark hover:text-primary'>Sign Up</button>
      </div>
    </div>
  )
}

export default UserLogin