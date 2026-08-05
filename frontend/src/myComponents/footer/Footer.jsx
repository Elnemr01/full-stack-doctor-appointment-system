import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-auto">
            <div className="container mx-auto px-4 text-center">
                <p className="text-gray-400">
                    &copy; {new Date().getFullYear()} DoctorSystem. All rights reserved.
                </p>
                <p className="text-gray-500 text-sm mt-2">
                    Built with care for better healthcare
                </p>
            </div>
        </footer>
    )
}

export default Footer