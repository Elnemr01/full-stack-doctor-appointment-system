import client from "@/api/axiosGlobal"

export const getDoctors = async (page = 1) => {
    const response = await client.get(`/doctors/all`, {
        params: { page, limit: 12 }
    });
    return response.data;
}