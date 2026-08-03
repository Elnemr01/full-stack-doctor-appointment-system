import { useAuth } from '@/contextAPI/UserProvider';
import { getMeFn } from '@/services/auth/services'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';

const useGetMe = () => {
    const navigate = useNavigate();
    const {setUser}=useAuth();
    const {data,isLoading, isError} = useQuery({
        queryKey:['getMe'],
        queryFn: ()=> getMeFn(),
    })

    useEffect(() => {
        if (data) {
            setUser(data?.data.user);
            localStorage.setItem('user', JSON.stringify(data?.data.user));
            navigate('/', { replace: true });
        }
    }, [data])

    return {data,isLoading,isError}
}

export default useGetMe