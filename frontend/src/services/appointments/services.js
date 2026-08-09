import client from "@/api/axiosGlobal";


export const addAppointmentFn= async (appointmentData) =>
    await client.post('/appointments/create',appointmentData);

export const deleteAppointmentFn= async (id) =>
    await client.delete(`/appointments/${id}`);


export const allAppointmentFn= async () =>
    await client.get(`/appointments/all`);