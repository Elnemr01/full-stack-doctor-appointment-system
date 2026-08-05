import { getDoctors } from '@/services/doctors/services'
import { useQuery } from '@tanstack/react-query'

const useGetDoctors = (page = 1) => {
    const { data: response, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['getDoctors', page],
        queryFn: () => getDoctors(page),
        staleTime: 1000 * 60 * 5,
    })

    const doctors = response?.data?.data || response?.data || response || [];

    return { doctors, isLoading, isError, error, refetch }
}

export default useGetDoctors