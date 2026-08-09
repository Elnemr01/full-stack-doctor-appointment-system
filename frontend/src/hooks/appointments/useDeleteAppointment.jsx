import { deleteAppointmentFn } from '@/services/appointments/services';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'


const useDeleteAppointment = () => {
    const navigate = useNavigate();
    const queryClient=  useQueryClient();
    const { mutate: deleteAppointment, isPending, error, isError } = useMutation({
        mutationKey: ['deleteAppointment'],
        mutationFn: (id) => deleteAppointmentFn(id),
        onError: (error) => {
            console.log(error)
            toast.error(error?.response?.message || 'something went wrong')
        },
        onSuccess: (res) => {
            // console.log(res)
            toast.success(res?.message || 'Appointment deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['getAllAppointments'] });
        }
    })

    return { deleteAppointment, isPending, error, isError }
}

export default useDeleteAppointment