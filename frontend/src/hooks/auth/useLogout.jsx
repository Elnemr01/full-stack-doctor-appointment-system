import { useAuth } from '@/contextAPI/UserProvider';
import { logoutFn } from '@/services/auth/services';
import { useMutation } from '@tanstack/react-query';
import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const useLogout = () => {
    const {setUser}=useAuth();
    const navigete=useNavigate();
    const {mutate : logout,isPending,error,isError}=useMutation({
        mutationKey:['logout'],
        mutationFn: ()=> logoutFn(),
        onError: (error)=>{
            console.log(error)
            toast.error(error?.response?.data?.message || 'something went wrong')
        },
        onSuccess: (res)=> {
            console.log(res)
            toast.success(res?.message || 'Logout successful');
            setUser(null);
            localStorage.removeItem('user');
            navigete('/login');
        }
    })

    return {logout,isPending,error,isError}
}

export default useLogout