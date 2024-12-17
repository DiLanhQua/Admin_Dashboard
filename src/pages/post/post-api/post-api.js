import axios from "axios";
const instance = axios.create({
    baseURL: import.meta.env.VITE_Blog,
    timeout: 30000
});
instance.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
    }
);
const URL_API = 'https://localhost:7048/api/Blog';

export const getBlog = async () => {
    try{
        const response = await instance.get(`${URL_API}/get-all-blog?maxPageSize=100&Pagesize=100&PageNumber=1`);
        return response.data
    }
    catch(error){
    }
}

export const createBlog = async (data) => {
    try{
        const response = await instance.post(`${URL_API}/add-blog`, data);
        return response
    }
    catch(error){
    }
}

export const updateBlog = async (id, data) => {
    try{
        const response = await instance.put(`${URL_API}/update-blog-by-id/${id}`, data);
        return response
    }
    catch(error){
    }
}

export const isPrimaryBlogImage = async (idImage) => {
    try{
        const response = await instance.patch(`${URL_API}/is-primary/${idImage}`);
        return response;
    }
    catch(error){

    }
}

export const blogById = async (id) => {
    try{
        const response = await instance.get(`${URL_API}/blog-id/${id}`);
        return response
    }
    catch(error){

    }
}
export const imageBlogByIdBlog = async (idBlog) => {
    try{
        const response = await instance.get(`${URL_API}/image-blog/${idBlog}`);
        return response
    }
    catch(error){

    }
}

export const deleteImageById = async (idImage) => {
    try{
        const response = await instance.delete(`${URL_API}/delete-image/${idImage}`);
        return response
    }
    catch(error){

    }
}

export const deleteBlogApi = async (id) => {
    try{
       const response = await instance.delete(`${URL_API}/delete-blog-by-id/${id}`);
       return response;
    }
    catch(error){

    }
}