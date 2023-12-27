import React, { useState } from 'react'
import axios from 'axios'

interface IUser { 
    firstName: string,
    lastName: string,
    userName: string,
    password: string,
    email:string,
    mobile: number | null
}

const UserSignup = () => {
    const [user, setUser] = useState<IUser>({
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        email:'',
        mobile: null
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setUser((prev) => ({ ...prev, [name]: value}))
        console.log(user);
    }


  return (
    <>
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='flex flex-col h-[85%] w-1/3 px-10 py-8 rounded-md border border-black'>
                <div>
                    <h1 className='font-medium text-xl mb-4'>Create New Account</h1>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="firstname">First Name</label>
                    <input onChange={handleChange} name='firstName' className='w-full border border-black p-2 rounded-md mb-3' id='firstname' type="text" />
                    <label htmlFor="lastname">Last Name</label>
                    <input onChange={handleChange} name='lastName' className='w-full border border-black p-2 rounded-md mb-3' id='lastname' type="text" />
                    <label htmlFor="username">Username</label>
                    <input onChange={handleChange} name='userName' className='w-full border border-black p-2 rounded-md mb-3' id='username' type="text" />
                    <label htmlFor="password">Password</label>
                    <input onChange={handleChange} name='password' className='w-full border border-black p-2 rounded-md mb-3' id='password' type="password" />
                    <label htmlFor="email">Email</label>
                    <input onChange={handleChange} name='email' className='w-full border border-black p-2 rounded-md mb-3' id='email' type="text" />
                    <label htmlFor="mobile">Mobile</label>
                    <input onChange={handleChange} name='mobile' className='w-full border border-black p-2 rounded-md mb-8' id='mobile' type="text" />
                    <button className='w-full border border-black p-3 rounded-md mb-3 hover:bg-dark hover:text-primary'>Sign Up</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default UserSignup