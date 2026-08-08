import { verifyEmailFn } from '@/services/password/services'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

const useVerifyEmail = () => {
    const {mutate : verfiyEmail,isPending,isError}=useMutation({
        mutationKey:['verfiyEmail'],
        mutationFn: (data)=> verifyEmailFn(data),
        onError: (error)=>{
            console.log(error)
            toast.error(error?.response?.data?.message || 'something went wrong')
        },
        onSuccess: (res)=> {
            console.log(res)
            toast.success(res?.message || 'Check Your Email To Reset Password');
        }
    })

    return {verfiyEmail,isPending,isError}
}

export default useVerifyEmail