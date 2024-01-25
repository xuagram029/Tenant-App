import React, { ChangeEvent, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminNavBar from '../components/AdminNavBar'
import axios, { AxiosError } from 'axios'

const CreateBill = () => {
    const {id} = useParams()
    const apiUrl = import.meta.env.VITE_API_URL
    const [month, setMonth] = useState('')
    const [userId, setUserId] = useState(id)
    const [electricity, setElectricity] = useState('')
    const [water, setWater] = useState('')
    const [monthly, setMonthly] = useState('')
    const navigate = useNavigate()

    console.log(month, userId, electricity, water, monthly);
    
    const handleSubmit = async() => {
        try {
            const res = await axios.post(`${apiUrl}/bills`, {month, user_id: userId, electricity, water, monthly})
            console.log(res.data.message)
            navigate('/admin-bills')
        } catch (error) {
            if(error instanceof AxiosError){
                console.log(error)
            }
        }
    }

  return (
    <div className='w-screen relative flex flex-col'>
        <AdminNavBar />
        <div className='flex w-screen h-full justify-center items-center mt-10'>
            <div className='grid grid-cols-2 p-14 w-2/4 h-1/w-1/3 border border-black rounded-lg'>
                <label htmlFor="month">Month</label>
                {/* <input  name='month' id='month' type="text" className='w-full border border-black p-2 rounded-md mb-5'/> */}
                <select value={month} name='month' id='month' className='w-full border border-black p-2 rounded-md mb-5' onChange={(e) => setMonth(e.target.value)}>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                </select>
                <label htmlFor="id">User ID</label>
                <input disabled name='id' id='id' value={id} className='w-full border border-black p-2 rounded-md mb-8 opacity-30'/>
                <label htmlFor="electricity">Electricity</label>
                <input onChange={(e) => setElectricity(e.target.value)} className='w-full border border-black p-2 rounded-md mb-5' id='electricity' type="text" name='electricity' />
                <label htmlFor="water">Water</label>
                <input onChange={(e) => setWater(e.target.value)} className='w-full border border-black p-2 rounded-md mb-5' id='water' type="text" name='water' />
                <label htmlFor="monthly">Monthly Rent</label>
                <input onChange={(e) => setMonthly(e.target.value)} className='w-full border border-black p-2 rounded-md mb-5' id='monthly' type="text" name='monthly' />

                <button onClick={handleSubmit} className='col-span-2 w-full border border-black p-3 rounded-md hover:bg-btn-dark hover:text-primary duration-200'>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default CreateBill