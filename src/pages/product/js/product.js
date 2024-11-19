import axiosS from "./axiosProduct";
import axiosDE from "./axiosDetailProduct";
import axiosMedia from "./axiosMedia";
import axiosImage from "./axiosImage";
import axiosBrand from "./axiosBrand";
const END_POINT = {
    GetAllProduct : "get-all-product",
    GetAllDetailproduct : "get-all-detailproduct",
    GetMedia: "get-medias",
    GetImage: "get-Image",
    Getbrand: "get-brand-by-id",
    GetImage: "get-Image",
}
export const getProductAPI = (customersPerPage,currentPage) => {
    return axiosS.get(`${END_POINT.GetAllProduct}?maxPageSize=${customersPerPage}&Pagesize=${customersPerPage}&PageNumber=${currentPage}`)
}
export const getDetailproductAPI = (customersPerPage,currentPage) => {
    return axiosDE.get(`${END_POINT.GetAllDetailproduct}?maxPageSize=${customersPerPage}&Pagesize=${customersPerPage}&PageNumber=${currentPage}`)
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

// export const getBrandAPI = (idpruduct) => {
//     return axiosBrand.get(`${END_POINT.Getbrand}/${idpruduct}`)
// }