import React, { useContext, useEffect, useState, ChangeEvent, MouseEvent } from 'react'
import AdminNavBar from '../components/AdminNavBar'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LuCalendarSearch } from "react-icons/lu";
import { IoAdd } from "react-icons/io5";
import DataTable from 'react-data-table-component';
import axios, { AxiosError } from 'axios';
import { IBill } from '../types/types';

interface User { 
    user_lastname: string,
    user_firstname: string,
    user_id: string,
    user_email: string,
    user_mobile: string,
    
}

const UserList = () => {
    const authcontext = useContext(AuthContext) ||  { user: null, error: null, loading: false, dispatch: () => {}}
    const apiUrl = import.meta.env.VITE_API_URL
    const [ users, setUsers ] = useState<User[]>([])
    const [ filteredUsers, setfilteredUsers ] = useState()
    const navigate = useNavigate()

    useEffect(() => { 
        const getBills = async () => {
            try {
                const res = await axios.get(`${apiUrl}/users`)
                setUsers(res.data)
                setfilteredUsers(res.data)
                console.log(res.data)
            } catch (error) {
                if(error instanceof AxiosError){
                    console.log(error)
                }
            }
        }
        getBills()
    }, [])

    const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
        if (filteredUsers) {
            const newData = filteredUsers.filter(row =>
                row.user_firstname.toLowerCase().includes(e.target.value.toLowerCase()) ||
                row.user_lastname.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setUsers(newData);
        }
    };

    const handleCreate = (e: MouseEvent<HTMLButtonElement>, id) => {
        navigate(`/admin/create-bill/${id}`)
    }

    const columns = [ 
        {
            name: 'First Name',
            selector: (row: User) => row.user_firstname.toUpperCase(),
            sortable: true
        },
        {
            name: 'Last Name',
            selector: (row: User) => row.user_lastname.toUpperCase(),
            sortable: true
        },
        {
            name: 'Email',
            selector: (row: User) => row.user_email,
            sortable: true
        },
        {
            name: 'Mobile',
            selector: (row: User) => row.user_mobile,
            sortable: true
        },
        {
            name: 'Create Bill',
            cell: (row: User) => (
                <button onClick={(e) => handleCreate(e, row.user_id)}
                className='bg-blue-500 text-white rounded-lg py-2 px-4'>
                    <IoAdd />
                </button>
            )
        },
    ]

    const customStyles = {
        header: {
          style: {
            fontSize: "1.5rem",
            fontFamily: "Montserrat",
          },
        },
        headCells: {
          style: {
            fontSize: "0.875rem",
            backgroundColor: "#2B2730",
            color: "#fff",
          },
        },
        cells: {
          style: {
            fontWeight: 600,
          },
        },
      };

  return (
    <div className='w-screen relative flex flex-col'>
        <AdminNavBar />
        <div className='flex self-end items-center gap-x-4 mr-10'>
            <LuCalendarSearch className='text-2xl text-black'/>
            <input type="text" onChange={handleFilter} placeholder='Search' className='border-b-2 border-dark p-1 text-sm font-normal focus:outline-none'/>
        </div>
        <DataTable
        title = "Tenants"
        data={users || []}
        columns={columns}
        pagination
        customStyles={customStyles}
         />
    </div>
  )
}

export default UserList