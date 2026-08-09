import * as Yup from 'yup';
import {isFuture, parseISO } from 'date-fns';

export const addAppointmentSchema = Yup.object({
    reason: Yup.string()
        .min(1, 'Reason must be at least 1 character')
        .max(200, 'Reason must be at most 200 characters')
        .required('Reason is required'),
    date: Yup.string()
        .required('Date is required')
        .test('is-future', 'Date must be in the future', (value) => {
            if (!value) return false;
            const selectedDate = parseISO(value);
            return isFuture(selectedDate);
        }),
});