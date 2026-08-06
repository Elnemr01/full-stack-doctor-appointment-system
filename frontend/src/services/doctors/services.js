import client from "@/api/axiosGlobal"

export const getDoctors = async (page = 1) => {
    const response = await client.get(`/doctors/all`, {
        params: { page, limit: 10 }
    });
    return response.data;
}

export const addDoctorFn = async (formData) => {
    const response = await client.post(`/doctors/add`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}