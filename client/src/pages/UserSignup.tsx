import React, { useContext, useEffect, useState } from 'react'
import axios, { AxiosError,} from 'axios'
import { IUser } from '../types/types'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'

const UserSignup = () => {
    const apiUrl = import.meta.env.VITE_API_URL
    const authcontext = useContext(AuthContext) || { user: null}
    const { user } = authcontext
    const navigate = useNavigate()
    const [userdata, setUserData] = useState<IUser>({
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
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setUserData((prev) => ({ ...prev, [name]: value}))
    }

    const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${apiUrl}/users`, userdata);
            console.log(res.data.message);
          } catch (error) {
            const customError = error as AxiosError<{ message?: string }>;
            console.log(customError?.response?.data?.message || "An unknown error occurred");
          }
    }

  return (
    <div className='h-screen'>
        <NavBar/>
        <div className='w-screen h-full flex justify-center items-center'>
            <div className='flex flex-col h-[90%] w-1/3 px-10 py-8 rounded-md border border-black'>
                <div>
                    <h1 className='font-medium text-xl mb-4'>Create New Account</h1>
                </div>
                <div className='flex flex-col'>
                    <div className='flex justify-center gap-4'>
                        <div className=''>
                            <label htmlFor="firstname">First Name</label>
                            <input onChange={handleChange} name='firstName' className='w-full border border-black p-2 rounded-md mb-3' id='firstname' type="text" />
                        </div>
                        <div className=''>
                            <label htmlFor="lastname">Last Name</label>
                            <input onChange={handleChange} name='lastName' className='w-full border border-black p-2 rounded-md mb-3' id='lastname' type="text" />
                        </div>
                    </div>
                    <label htmlFor="username">Username</label>
                    <input onChange={handleChange} name='userName' className='w-full border border-black p-2 rounded-md mb-3' id='username' type="text" />
                    <label htmlFor="password">Password</label>
                    <input onChange={handleChange} name='password' className='w-full border border-black p-2 rounded-md mb-3' id='password' type="password" />
                    <label htmlFor="email">Email</label>
                    <input onChange={handleChange} name='email' className='w-full border border-black p-2 rounded-md mb-3' id='email' type="text" />
                    <label htmlFor="mobile">Mobile</label>
                    <input onChange={handleChange} name='mobile' className='w-full border border-black p-2 rounded-md mb-8' id='mobile' type="text" />
                    <button onClick={handleSubmit} className='w-full border border-black p-3 rounded-md mb-3 hover:bg-dark hover:text-primary'>Sign Up</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserSignup