import { useAuth } from '@/contextAPI/UserProvider'
import { registerFn } from '@/services/auth/services'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

const useRegister = () => {
    const {setUser}=useAuth();
    const navigete=useNavigate();
    const {mutate : register,isPending,error,isError}=useMutation({
        mutationKey:['register'],
        mutationFn: (data)=> registerFn(data),
        onError: (error)=>{
            // console.log(error)
            toast.error(error?.response?.data?.message || 'something went wrong')
        },
        onSuccess: (res)=> {
            toast.success(res?.message || 'Register successful');
            setUser(res?.data.user);
            localStorage.setItem('user',JSON.stringify(res?.data.user));
            navigete('/');
        }
    })

    return {register,isPending,error,isError}
}

export default useRegister