import React, { createContext, useContext, useState } from 'react'


const UserContext = createContext();

export const useAuth= ()=> {
    return useContext(UserContext);
}

const UserProvider = ({children}) => {

    const [user,setUser]= useState(()=> JSON.parse(localStorage.getItem('user')) ? 
    JSON.parse(localStorage.getItem('user')) : null);

    const data={
        user,
        setUser,
    }
    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider