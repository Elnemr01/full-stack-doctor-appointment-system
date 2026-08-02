import useGetMe from '@/hooks/auth/useGetMe';
import React from 'react'

const Callback = () => {
    const {data,isError,isLoading} = useGetMe();
    console.log(data);
    return (
        <div className='flex items-center justify-center min-h-screen'>
            <p>Logging you in...</p>
        </div>
    )
}

export default Callback