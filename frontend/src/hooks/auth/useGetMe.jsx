import { getMeFn } from '@/services/auth/services'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';

const useGetMe = () => {
    const navigate = useNavigate();
    const {data,isLoading, isError} = useQuery({
        queryKey:['getMe'],
        queryFn: ()=> getMeFn(),
    })

    useEffect(() => {
        if (data) {
            console.log(data);
            localStorage.setItem('user', JSON.stringify(data?.data.user))
            navigate('/');
        }
    }, [data])

    return {data,isLoading,isError}
}

export default useGetMe