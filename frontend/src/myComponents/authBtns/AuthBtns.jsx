import React from 'react'
import { Mail, GitBranch} from 'lucide-react';

const AuthBtns = () => {

    const handleGoToAuthApplication = (strategy)=> {
        window.location.href=`${import.meta.env.VITE_BASE_URL}/users/auth/${strategy}`
    }

    return (
        <div className="grid grid-cols-2 gap-4 mt-4">
            <button
            type="button"
            onClick={() => handleGoToAuthApplication('github')}
            className="flex items-center cursor-pointer justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
            <GitBranch className="w-5 h-5" />
            <span>GitHub</span>
            </button>
            <button
            type="button"
            onClick={() => handleGoToAuthApplication('google')}
            className="flex items-center cursor-pointer justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
            <Mail className="w-5 h-5 text-red-500" />
            <span>Google</span>
            </button>
        </div>
    )
}

export default AuthBtns