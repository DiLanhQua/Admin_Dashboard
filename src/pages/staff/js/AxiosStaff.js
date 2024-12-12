import axiosS from "./Staff";
const END_POINT = {
    GetAllStaff : "get-all-account",
    PostStaff: "add-account",
    GetDEStall: "getDe-account",
    GetDELogin: "getDe-login",
    UpStaff: "up-account",
    GetStaff: "get-all-staff"
}
export const getStaffAPI = (currentMax,customersPerPage,currentPage) => {
    return axiosS.get(`${END_POINT.GetAllStaff}?maxPageSize=${currentMax}&Pagesize=${customersPerPage}&PageNumber=${currentPage}`)
}
export const getAPIStaff = (currentMax,customersPerPage,currentPage) => {
    return axiosS.get(`${END_POINT.GetStaff}?maxPageSize=${currentMax}&Pagesize=${customersPerPage}&PageNumber=${currentPage}`, )
}
export const getDeStaffAPI = (id) => {
    return axiosS.get(`${END_POINT.GetDEStall}/${id}`);
}
export const getDeLoginAPI = (id) => {
    return axiosS.get(`${END_POINT.GetDELogin}/${id}`);
}
// export const CtWebAPI = (idsanPham) => {
//     return axiosC.get(`${END_POINT.SanPham}/${idsanPham}`)
// }
export const postStaffAPI = async (formData) =>  {
   
        try {
            const response = await axiosS.post(`${END_POINT.PostStaff}`, formData);
            console.log("ID Response:", formData); 
            console.log("Full POST Response:", response); // Log toàn bộ phản hồi POST
            console.log("POST Response Data:", response.data); // Log thuộc tính data của phản hồi POST
            return response;
        } catch (error) {
            console.error("POST Error:", error);
            throw error;
        }
}
export const upStaffAPI = async (id,formData) =>  {
   
    try {
        const response = await axiosS.put(`${END_POINT.UpStaff}/${id}`, formData);
      
        console.log("ID Response:", formData); 
        console.log("Full POST Response:", response); // Log toàn bộ phản hồi POST
        console.log("POST Response Data:", response.data); // Log thuộc tính data của phản hồi POST
        return response;
    } catch (error) {
        console.error("POST Error:", error);
        throw error;
    }
}
// export const getGioHang =   () => {
//     try {
//         return  axiosC.get(`${END_POINT.GioHang}`)// Trả về toàn bộ phản hồi
//     } catch (error) {
//         console.error("GET Error:", error);
//         throw error;
//     }
// }