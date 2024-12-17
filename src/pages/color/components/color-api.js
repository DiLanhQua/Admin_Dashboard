import axios from "axios"

const URL = 'https://localhost:7048/api/Color'

const instance = axios.create({
    baseURL: import.meta.env.VITE_Color,
    timeout: 30000
});
instance.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
    }
);
export const getColors = async () => {
    return await instance.get(`${URL}/get-all-color?Pagesize=100`)
}

export const createColor = async(data) => {
    return await instance.post(`${URL}/add-color`, data)
}
export const updateColor = async(data) => {
    return await instance.put(`${URL}/up-color/${data.id}`, data)
}
