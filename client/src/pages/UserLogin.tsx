import React, { ChangeEvent, MouseEvent, useState } from 'react'
import axios, { AxiosError } from 'axios'

interface User { 
  username: string, 
  password: string
}

const UserLogin = () => {
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
      const res = await axios.post('http://localhost:8000/users/login', user)
      console.log(res.data);
    } catch (error ) {
      if(error instanceof AxiosError){
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