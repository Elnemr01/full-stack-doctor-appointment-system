import { Stethoscope } from 'lucide-react'
import React from 'react'

const DoctorBanner = ({doctor}) => {
    return (
        <div className='banner border rounded-2xl my-8 p-4 border-gray-500'>
            <div className="top flex gap-4">
                <div className="image w-30 h-30 rounded-full overflow-hidden">
                    <img src={doctor?.image} alt="personal photo" loading='lazy'/>
                </div>
                <div className="text-info">
                    <h1 className='text-2xl font-bold'>Dr. {doctor?.name}</h1>
                    <h2 className='text-lg font-semibold flex items-center gap-2'>
                        <Stethoscope size={20} className='text-gray-400'/>
                        {doctor?.speciality}
                    </h2>
                    <p className='font-normal text-sm'>{doctor?.yearsOfExperience} years of experience</p>
                </div>
            </div>
            <div className="bio text-md font-medium mt-4">
                <p className='bg-blue-50 p-4 rounded-xl'>{doctor?.description}</p>
            </div>
        </div>
    )
}

export default DoctorBanner