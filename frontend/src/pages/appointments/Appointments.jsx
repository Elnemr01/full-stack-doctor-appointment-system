import useGetAllAppointments from '@/hooks/appointments/useGetAllAppointments';
import MainLayout from '@/myComponents/mainLayout/MainLayout'
import Error from '@/myComponents/models/Error';
import Loading from '@/myComponents/models/Loading';
import React from 'react'
import AppointmentCard from './AppointmentCard';

const Appointments = () => {
    const {appointments,isLoading,isError}=useGetAllAppointments();




    if(isLoading) return <Loading/>
    if(isError) return <Error/>
    return (
        <MainLayout>
            <div className="container my-8">
                {appointments.length > 0 ?
                <>
                    <h1 className='font-bold text-2xl'>
                        My Appointments
                    </h1>
                    <div className="aapointments mt-4 flex flex-col gap-4">
                        {
                            appointments.map((appointment)=> 
                            <AppointmentCard appointment={appointment} key={appointment._id}/>)
                        }
                    </div>
                </>
                :
                <div className="empty">
                    <h1 className='font-bold text-2xl'>
                        You have no appointments yet.
                    </h1>
                </div>
            
            }
                </div>
        </MainLayout>
    )
}

export default Appointments