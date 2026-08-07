import useGetDoctorById from '@/hooks/doctors/useGetDoctorById';
import DoctorBanner from '@/myComponents/doctorBanner/DoctorBanner';
import MainLayout from '@/myComponents/mainLayout/MainLayout'
import Error from '@/myComponents/models/Error';
import Loading from '@/myComponents/models/Loading';
import React from 'react'
import { useParams } from 'react-router'

const OneDoctor = () => {

    const {id}=useParams();
    const {doctor,isLoading,isError}=useGetDoctorById(id);

    // console.log(doctor);
    if(isLoading) return <Loading/>
    if(isError) return <Error/>

    return (
        <MainLayout>
            <div className="container">
                <DoctorBanner doctor={doctor}/>
            </div>
        </MainLayout>
    )
}

export default OneDoctor