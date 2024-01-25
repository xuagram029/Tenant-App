import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

const useFetchAdmin = () => {
    const authContext = useContext(AuthContext) || { user: null, loading: false, error: null, dispatch: () => {} };
    const { user } = authContext;
    const [userData, setUserData] = useState({
        id: '',
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        email:'',
        mobile: null
     })
    
    //  const [loading, setLoading] = useState()
    //  const [error, setError] = useState()
     const navigate = useNavigate()

     useEffect(() => {
        if(user){
            if(user?.resp[0]?.role === 'user'){
                const userId = user?.resp[0]?.user_id
                const userFirstName = user?.resp[0].user_firstname || ''
                const userLastName = user?.resp[0].user_lastname || ''
                const userUserName = user?.resp[0].user_username || ''
                const userEmail = user?.resp[0].user_email || ''
                const userMobile = user?.resp[0].user_mobile || ''
        
                setUserData({
                    id: userId,
                    firstName: userFirstName,
                    lastName: userLastName,
                    userName: userUserName,
                    password: '',
                    email: userEmail,
                    mobile: userMobile
                })
            }else if(user?.resp[0]?.role === 'admin'){
                navigate('/admin-dashboard')
            }
         }else{
            navigate('/user-login')
        }
     }, [user])

    return { userData };
}
 
export default useFetchAdmin;