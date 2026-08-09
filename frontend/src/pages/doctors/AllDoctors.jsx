import { useState } from 'react'
import useGetDoctors from '@/hooks/doctors/useGetDoctors'
import MainLayout from '@/myComponents/mainLayout/MainLayout'
import Loading from '@/myComponents/models/Loading'
import Error from '@/myComponents/models/Error'
import DoctorCard from './DoctorCard'
import { Search, Filter, ChevronDown, Stethoscope } from 'lucide-react'

const AllDoctors = () => {
    const [page, setPage] = useState(1);
    const { doctors, isLoading, isError, error } = useGetDoctors(page);



    if (isLoading) return <Loading />

    if (isError) 
        return <Error />

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground">All Doctors</h1>
                    <p className="mt-1 text-muted-foreground">
                        Find the best healthcare professionals for your needs
                    </p>
                </div>


                {doctors.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <Stethoscope className="h-12 w-12 text-muted-foreground/50" />
                        <h3 className="mt-4 text-lg font-medium text-foreground">No doctors found</h3>
                        
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
                        {doctors.map((doctor) => (
                            <DoctorCard key={doctor._id} doctor={doctor} />
                        ))}
                    </div>
                )}

                
            </div>
        </MainLayout>
    )
}

export default AllDoctors