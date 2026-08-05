import useGetDoctors from '@/hooks/doctors/useGetDoctors';
import React from 'react'
import Loading from '../models/Loading';
import Error from '../models/Error';
import DoctorCard from '@/pages/doctors/DoctorCard';
import { Stethoscope } from 'lucide-react';
import Button from '@/components/ui/button';
import { Link } from 'react-router';

const SomeDoctors = () => {
    const {doctors, isLoading,isError} = useGetDoctors(1);

    if (isLoading) <Loading/>
    if (isError) <Error/>
    return (
        <div className='p-4 my-4'>
            <div className="container">
                <h2 className='text-2xl text-center mb-8 font-bold text-blue-600'>
                    Find Your Doctor
                </h2>
                <div className="doctors">
                    {doctors.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <Stethoscope className="h-12 w-12 text-muted-foreground/50" />
                            <h3 className="mt-4 text-lg font-medium text-foreground">No doctors found</h3>
                            
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {doctors.slice(0, 3).map((doctor) => (
                                <DoctorCard key={doctor._id} doctor={doctor} />
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex">
                    <Button className=" mt-8 bg-blue-500 hover:bg-blue-600 text-white 
                    font-semibold py-6 px-8 rounded mx-auto">
                        <Link to="/doctors" className="text-white">
                            All Doctors
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default SomeDoctors