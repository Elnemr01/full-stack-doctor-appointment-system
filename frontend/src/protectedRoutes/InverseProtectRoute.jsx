import { useAuth } from '../contextAPI/UserProvider';
import React from 'react'
import { Navigate, useLocation } from 'react-router';


const InverseProtectRoute = ({children}) => {
    const {user}=useAuth();
    const location = useLocation();

    if(user){
        return <Navigate to={'/'} replace from={location}/>
    }

    return (
        children
    )
}

export default InverseProtectRoute