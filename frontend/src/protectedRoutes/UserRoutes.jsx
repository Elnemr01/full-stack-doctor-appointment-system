import React from 'react'
import { Outlet } from 'react-router'
import InverseProtectRoute from './InverseProtectRoute'

const UserRoutes = () => {
    return (
        <InverseProtectRoute>
            <Outlet/>
        </InverseProtectRoute>
    )
}

export default UserRoutes