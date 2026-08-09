import { useFormik } from 'formik';
import { format, isFuture, parseISO } from 'date-fns';
import useAddAppointment from '@/hooks/appointments/useAddAppointment';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useParams } from 'react-router';
import { addAppointmentSchema } from '@/constants/schemas/addAppointmentSchema';
import { useMemo } from 'react';



const BookAppointment = () => {

    const {id}=useParams();
    const { addAppointment, isPending ,error,isError} = useAddAppointment();

    const initialValues = useMemo(()=> {
        return {
            reason: '',
            date: '',
        }
    },[])

    const formik = useFormik({
        initialValues,
        validationSchema: addAppointmentSchema,
        onSubmit: (values) => {
            const isoDate = format(parseISO(values.date), "yyyy-MM-dd'T'HH:mm:ssXXX");
            addAppointment({
                ...values,
                date: isoDate,
                doctorId: id,
            });
        },
    });

    const handleDateChange = (e) => {
        formik.setFieldValue('date', e.target.value);
    };

    return (
        <div className='mx-auto p-6'>
            <h1 className='text-2xl font-bold mb-6'>Book Your Appointment</h1>
            <form onSubmit={formik.handleSubmit} className=''>
                <div>
                    <label htmlFor='reason' className='block text-sm font-medium mb-1'>
                        Reason
                    </label>
                    <textarea
                        id='reason'
                        value={formik.values.reason}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder='Enter reason for appointment'
                        className={`${formik.errors.reason ? ' border-red-500' : 'border-gray-300'}
                        w-full border rounded-xl px-3 py-2`}
                    >
                    </textarea>
                    {formik.touched.reason && formik.errors.reason && (
                        <p id='reason-error' className='mt-1 text-sm text-red-500'>{formik.errors.reason}</p>
                    )}
                </div>

                <div>
                    <label htmlFor='date' className='block text-sm font-medium mb-1'>
                        Date
                    </label>
                    <Input
                        id='date'
                        type='datetime-local'
                        value={formik.values.date}
                        onChange={handleDateChange}
                        onBlur={formik.handleBlur}
                        className={formik.touched.date && formik.errors.date ? 'aria-invalid' : ''}
                        aria-invalid={formik.touched.date && !!formik.errors.date}
                        aria-describedby={formik.touched.date && formik.errors.date ? 'date-error' : undefined}
                    />
                    {formik.touched.date && formik.errors.date && (
                        <p id='date-error' className='mt-1 text-sm text-red-500'>{formik.errors.date}</p>
                    )}
                </div>
                { isError && <div className="error my-4 border-red-500 border rounded-xl p-4">
                    <p className=' text-red-500'>{error?.response?.data?.message}</p>
                </div>}


                <Button type='submit' disabled={isPending} className='w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4'>
                    {isPending ? 'Booking...' : 'Book Appointment'}
                </Button>
            </form>
        </div>
    );
};

export default BookAppointment;