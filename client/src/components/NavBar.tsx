import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const NavBar = () => {
    const url = location.pathname.split('/')[1]
    const authContext = useContext(AuthContext) || { user: null, loading: false, error: null, dispatch: () => {} };

    const {user} = authContext
    let userFullName = ''

    if(user){ 
        userFullName = user?.resp[0].user_firstname + ' ' + user?.resp[0].user_lastname
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
                <button className='p-2 border border-dark rounded-md text-white bg-dark hover:text-dark hover: hover:bg-white duration-300'>LOGIN</button>
                <button className='p-2 border border-dark rounded-md hover:bg-dark hover:text-white duration-300'>SIGNUP</button>
            </div>
                : 
            <div>
                { userFullName }
            </div>
            }
        </header>
    </div>
  )
}

export default NavBar