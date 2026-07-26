import React from 'react'
import ProtectRoute from './ProtectRoute'
import { Outlet } from 'react-router'

const LoggedRoutes = () => {
    return (
        <ProtectRoute>
            <Outlet/>
        </ProtectRoute>
    )
}

export default LoggedRoutes