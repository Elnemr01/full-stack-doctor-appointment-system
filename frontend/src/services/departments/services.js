import client from "@/api/axiosGlobal"

export const addDepartmentFn = async (formData) => {
    const response = await client.post(`/departments/add`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}