import { resetPasswordFn } from '@/services/password/services'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

const useResetPassword = () => {
    const navigate = useNavigate();
    const {mutate : resetPassword,isPending,isError}=useMutation({
        mutationKey:['resetPassword'],
        mutationFn: (data)=> resetPasswordFn(data),
        onError: (error)=>{
            console.log(error)
            toast.error(error?.response?.data?.message || 'something went wrong')
        },
        onSuccess: (res)=> {
            console.log(res)
            navigate('/login',{replace:true})
            toast.success(res?.message || 'Password is reset successfully');
        }
    })

    return {resetPassword,isPending,isError}
}

export default useResetPassword