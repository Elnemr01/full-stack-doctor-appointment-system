import { registerFn } from '@/services/auth/services'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useRegister = () => {
    const {mutate : register,isPending,error,isError}=useMutation({
        mutationKey:['register'],
        mutationFn: (data)=> registerFn(data),
        onError: ()=>{

        },
        onSuccess: (res)=> {
            
        }
    })
}

export default useRegister