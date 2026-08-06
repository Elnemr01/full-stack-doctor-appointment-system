import * as Yup from 'yup';

export const addDoctorValidationSchema = Yup.object({
    name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .required('Name is required'),
    speciality: Yup.string()
        .min(2, 'Speciality must be at least 2 characters')
        .required('Speciality is required'),
    yearsOfExperience: Yup.number()
        .typeError('Years of experience must be a number')
        .min(0, 'Years of experience cannot be negative')
        .max(100, 'Years of experience cannot exceed 100')
        .required('Years of experience is required'),
    description: Yup.string()
        .min(10, 'Description must be at least 10 characters')
        .required('Description is required'),
    image: Yup.string().required('Image is required'),
});