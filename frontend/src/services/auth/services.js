import client from "@/api/axiosGlobal"

export const loginFn = async (data)=> await client.post('/users/login',data)
    .then(res=>res.data)


export const registerFn = async (data)=> await client.post('/users/register',data)
    .then(res=>res.data)


export const getMeFn = async (data)=> await client.get('/users/me',data)
    .then(res=>res.data)

export const logoutFn = async ()=> await client.post('/users/logout')
.then(res=>res.data)




