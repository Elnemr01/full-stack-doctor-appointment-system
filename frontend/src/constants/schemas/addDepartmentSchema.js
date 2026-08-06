import * as Yup from 'yup';

export const addDepartmentValidationSchema = Yup.object({
    name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .required('Name is required'),
    description: Yup.string()
        .min(10, 'Description must be at least 10 characters')
        .required('Description is required'),
    image: Yup.string().required('Image is required'),
});