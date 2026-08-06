import { addDoctorFn } from '@/services/doctors/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

const useAddDoctor = () => {
    const navigate = useNavigate();
    const { mutate: addDoctor, isPending, error, isError } = useMutation({
        mutationKey: ['addDoctor'],
        mutationFn: (data) => addDoctorFn(data),
        onError: (error) => {
            console.log(error)
            toast.error(error?.response?.message || 'something went wrong')
        },
        onSuccess: (res) => {
            console.log(res)
            toast.success(res?.message || 'Doctor added successfully');
            navigate('/doctors');
        }
    })

    return { addDoctor, isPending, error, isError }
}

export default useAddDoctor