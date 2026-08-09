import { addAppointmentFn } from '@/services/appointments/services';
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

const useAddAppointment = () => {
    const navigate = useNavigate();
    const { mutate: addAppointment, isPending, error, isError } = useMutation({
        mutationKey: ['addAppointment'],
        mutationFn: (data) => addAppointmentFn(data),
        onError: (error) => {
            toast.error(error?.response?.data?.message || 'something went wrong')
        },
        onSuccess: (res) => {
            console.log(res)
            toast.success(res?.message || 'Appointment added successfully');
            navigate('/appointments');
        }
    })

    return { addAppointment, isPending, error, isError }
}

export default useAddAppointment