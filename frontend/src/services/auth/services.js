import client from "../client";

export const loginFn = async (data)=> await client.post('/users/login',data)
    .then(res=>res.data)


export const registerFn = async (data)=> await client.post('/users/register',data)
    .then(res=>res.data)




