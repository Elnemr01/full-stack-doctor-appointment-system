import { getDoctorByIdFn } from '@/services/doctors/services'
import { useQuery } from '@tanstack/react-query'

const useGetDoctorById = (id) => {
    const { data: res, isLoading, isError} = useQuery({
        queryKey: ['getDoctorById', id],
        queryFn: () => getDoctorByIdFn(id),
    })

    const doctor=res?.data;
    
    return { doctor, isLoading, isError }
}

export default useGetDoctorById