import React, { useContext, useEffect, useState, ChangeEvent, MouseEvent } from 'react'
import AdminNavBar from '../components/AdminNavBar'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LuCalendarSearch } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
import DataTable from 'react-data-table-component';
import axios, { AxiosError } from 'axios';
import { IBill } from '../types/types';

const UserBillsDashboard = () => {
    const authcontext = useContext(AuthContext) ||  { user: null, error: null, loading: false, dispatch: () => {}}
    const apiUrl = import.meta.env.VITE_API_URL
    const [ bills, setBills ] = useState<IBill[] | undefined>(undefined)
    const [ filteredBills, setFilteredBills ] = useState<IBill[] | undefined>(undefined)

    useEffect(() => { 
        const getBills = async () => {
            try {
                const res = await axios.get(`${apiUrl}/bills/unpaid`)
                setBills(res.data)
                setFilteredBills(res.data)
            } catch (error) {
                if(error instanceof AxiosError){
                    console.log(error)
                }
            }
        }
        getBills()
    }, [])

    const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
        if (filteredBills) {
            const newData = filteredBills.filter(row =>
                row.month.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setBills(newData);
        }
    };

    const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>, id?: number) => {
        try {
            const res = await axios.put(`${apiUrl}/bills`, {id})
            console.log(res.data.message) 
            window.location.reload()
        } catch (error) {
            if(error instanceof AxiosError){
                console.log(error);
            }
        }
    };  

    const columns = [ 
        {
            name: 'First Name',
            selector: (row: IBill) => row.user_firstname.toUpperCase(),
            sortable: true
        },
        {
            name: 'Last Name',
            selector: (row: IBill) => row.user_lastname.toUpperCase(),
            sortable: true
        },
        {
            name: 'Month',
            selector: (row: IBill) => row.month.toUpperCase(),
            sortable: true
        },
        {
            name: 'Electricity',
            selector: (row: IBill) => row.user_electricity,
            sortable: true
        },
        {
            name: 'Water',
            selector: (row: IBill) => row.user_water,
            sortable: true
        },
        {
            name: 'Monthly',
            selector: (row: IBill) => row.user_monthly,
            sortable: true
        },
        {
            name: 'Status',
            selector: (row: IBill) => row.status.toUpperCase(),
            sortable: true
        },
        {
            name: 'ID',
            selector: (row: IBill) => row.payment_id,
            sortable: true
        },
        {
            name: 'Paid',
            cell: (row: IBill) => (
                <button onClick={(e) => handleUpdate(e, row.payment_id)}
                className='bg-blue-500 text-white rounded-lg py-2 px-4'>
                    <FaCheck />
                </button>
            )
        }
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
        title = "Unpaid User Bills"
        data={bills || []}
        columns={columns}
        pagination
        customStyles={customStyles}
         />
    </div>
  )
}

export default UserBillsDashboard