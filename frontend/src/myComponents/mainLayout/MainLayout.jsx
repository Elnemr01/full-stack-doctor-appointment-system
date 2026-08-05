import React from 'react'
import Header from '../header/Header'

const MainLayout = ({children}) => {
    return (
        <>
            <Header/>
            <div className="layout">
                {children}
            </div>
        </>
    )
}

export default MainLayout