import { useAuth } from '@/contextAPI/UserProvider'
import { loginFn } from '@/services/auth/services'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

const useLogin = () => {
    const {setUser}=useAuth();
    const navigete=useNavigate();
    const {mutate : login,isPending,error,isError}=useMutation({
        mutationKey:['login'],
        mutationFn: (data)=> loginFn(data),
        onError: (error)=>{
            console.log(error)
            toast.error(error?.response?.data?.message || 'something went wrong')
        },
        onSuccess: (res)=> {
            toast.success(res?.message || 'Login successful');
            setUser(res?.data.user);
            localStorage.setItem('user',JSON.stringify(res?.data.user));
            navigete('/');
        }
    })

    return {login,isPending,error,isError}
}

export default useLogin