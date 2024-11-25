import axiosS from "./axiosProduct";
import axiosDE from "./axiosDetailProduct";
import axiosMedia from "./axiosMedia";
import axiosImage from "./axiosImage";
import axiosBrand from "./axiosBrand";
const END_POINT = {
    GetAllProduct : "get-all-product",
    GetProduct : "get-product",
    GetDetailproduct : "get-detailproduct",
    GetMedia: "get-medias",
    GetImage: "get-Image",
    Getbrand: "get-brand-by-id",
    GetAllBrand: "get-all-brand",
    GetImage: "get-Image",
    AddProduct: "add-product",
    AddDetailproduct: "add-detailproduct",
    AddImage: "add-Image",
}
export const getProductAPI = (customersPerPage,currentPage) => {
    return axiosS.get(`${END_POINT.GetAllProduct}?maxPageSize=${customersPerPage}&Pagesize=${customersPerPage}&PageNumber=${currentPage}`)
}
export const getProduct = (id) => {
    return axiosS.get(`${END_POINT.GetProduct}/${id}`);
}
export const getDetailproductAPI = (idpruduct) => {
    return axiosDE.get(`${END_POINT.GetDetailproduct}/${idpruduct}`)
}
export const getMediaAPI = (idpruduct) => {
    return axiosMedia.get(`${END_POINT.GetMedia}/${idpruduct}`)
}
export const getImageAPI = (idpruduct) => {
    return axiosImage.get(`${END_POINT.GetImage}/${idpruduct}`)
}
export const getBrandAPI = (idpruduct) => {
    return axiosBrand.get(`${END_POINT.Getbrand}/${idpruduct}`)
}
export const getAllBrandAPI = (customersPerPage,currentPage) => {
    return axiosBrand.get(`${END_POINT.GetAllBrand}?maxPageSize=${customersPerPage}&Pagesize=${customersPerPage}&PageNumber=${currentPage}`)
}
export const postProductAPI = async (productData) =>  {
   
    try {
        const response = await axiosS.post(`${END_POINT.AddProduct}`, productData);
      
        console.log("ID Response:", productData); 
        return response;
    } catch (error) {
        console.error("POST Error:", error);
        throw error;
    }
}
export const postDEProductAPI = async (formData) =>  {
   
    try {
        const response = await axiosDE.post(`${END_POINT.AddDetailproduct}`, formData);
      
        console.log("ID Response:", formData); 
        return response;
    } catch (error) {
        console.error("POST Error:", error);
        throw error;
    }
}
export const postImageAPI = async (formData) =>  {
   
    try {
        const response = await axiosImage.post(`${END_POINT.AddImage}`, formData);
      
        console.log("ID Response:", formData); 
        return response;
    } catch (error) {
        console.error("POST Error:", error);
        throw error;
    }
}
// export const getBrandAPI = (idpruduct) => {
//     return axiosBrand.get(`${END_POINT.Getbrand}/${idpruduct}`)
// }