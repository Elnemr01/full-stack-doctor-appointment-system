import client from "@/api/axiosGlobal"



export const verifyEmailFn=async (data)=>
    await client.post('/password/verify-email',data)
    .then(res=>res.data)



export const resetPasswordFn=async (data)=>
    await client.post('/password/reset-password',data)
    .then(res=>res.data)