import { addDepartmentFn } from '@/services/departments/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

const useAddDepartment = () => {
    const navigate = useNavigate();
    const { mutate: addDepartment, isPending, error, isError } = useMutation({
        mutationKey: ['addDepartment'],
        mutationFn: (data) => addDepartmentFn(data),
        onError: (error) => {
            console.log(error)
            toast.error(error?.response?.message || 'something went wrong')
        },
        onSuccess: (res) => {
            console.log(res)
            toast.success(res?.message || 'Department added successfully');
            navigate('/departments');
        }
    })

    return { addDepartment, isPending, error, isError }
}

export default useAddDepartment