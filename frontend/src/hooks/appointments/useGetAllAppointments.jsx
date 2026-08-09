import { allAppointmentFn } from '@/services/appointments/services';
import { useQuery } from '@tanstack/react-query'


const useGetAllAppointments = () => {
    const { data: response, isLoading, isError, error } = useQuery({
        queryKey: ['getAllAppointments'],
        queryFn: () => allAppointmentFn(),
    })

    const appointments = response?.data?.data || response?.data || response || [];

    return { appointments, isLoading, isError, error }
}

export default useGetAllAppointments