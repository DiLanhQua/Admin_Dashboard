import axiosS from "./axiosProduct";
import axiosDE from "./axiosDetailProduct";
import axiosMedia from "./axiosMedia";
import axiosImage from "./axiosImage";
import axiosBrand from "./axiosBrand";
import axiosColor from "./axiosColor";
import axiosCategory from "./axiosCategory";
const END_POINT = {
    GetAllProduct : "get-all-product",
    GetProduct : "get-product",
    GetDetailproduct : "get-detailproduct",
    GetMedia: "get-medias",
    AddMedia: "add-medias",
    DeleteMedia: "delete-medias",
    GetALLMedia: "get-all-medias",
    GetImage: "get-Image",
    Getbrand: "get-brand-by-id",
    GetAllBrand: "get-all-brand",
    GetAllColor: "get-all-color",
    GetAllCategory: "get-all-category",
    GetImage: "get-Image",
    AddProduct: "add-product",
    UpProduct:"UP-product",
    AddDetailproduct: "add-detailproduct",
    AddImage: "add-Image",
    GetCategory: "get-category-by-id",
    PostIsMedia: "setPrimaryImage",
    PostMedia: "changeImage",
    UPDetailproduct:"update-detailproduct-by-id",
    Getdetail: "get-detail",
}
export const getProductAPI = (customersPerPage,currentPage) => {
    return axiosS.get(`${END_POINT.GetAllProduct}?maxPageSize=${customersPerPage}&Pagesize=${customersPerPage}&PageNumber=${currentPage}`)
}
export const getProduct = (id) => {
    return axiosS.get(`${END_POINT.GetProduct}/${id}`);
}
export const getdetailAPI = (id,productid) => {
    return axiosDE.get(`${END_POINT.Getdetail}?id=${id}&productid=${productid}`);
}
export const UPDE = async (id,selectedProductId, formData) => {
    try {
      const response = await axiosDE.put(`${END_POINT.UPDetailproduct}?id=${id}&idproduct=${selectedProductId}`,formData);
      console.log("Response ID:", response.data);
      return response;
    } catch (error) {
      console.error("POST Error:", error);
      throw error;
    }
  };
export const getDetailproductAPI = (idpruduct) => {
    return axiosDE.get(`${END_POINT.GetDetailproduct}/${idpruduct}`)
}
export const getMediaAPI = (idpruduct) => {
    return axiosMedia.get(`${END_POINT.GetMedia}/${idpruduct}`)
}
export const getAllMediaAPI = (idpruduct) => {
    return axiosMedia.get(`${END_POINT.GetALLMedia}/${idpruduct}`)
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
export const getAllColorAPI = (customersPerPage,currentPage) => {
    return axiosColor.get(`${END_POINT.GetAllColor}?maxPageSize=${customersPerPage}&Pagesize=${customersPerPage}&PageNumber=${currentPage}`)
}
export const getAllCategoryAPI = (customersPerPage,currentPage) => {
    return axiosCategory.get(`${END_POINT.GetAllCategory}?maxPageSize=${customersPerPage}&Pagesize=${customersPerPage}&PageNumber=${currentPage}`)
}
export const getCategoryAPI = (idpruduct) => {
    return axiosCategory.get(`${END_POINT.GetCategory}/${idpruduct}`)}
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
export const postIsMediaAPI = async (selectedProductId, imageId) => {
  try {
    const response = await axiosMedia.put(`${END_POINT.PostIsMedia}?productId=${selectedProductId}&imageId=${imageId}`);
    console.log("Response ID:", response.data);
    return response;
  } catch (error) {
    console.error("POST Error:", error);
    throw error;
  }
};

// Hàm gửi yêu cầu API để thay đổi ảnh
export const postMediaAPI = async (imageId,selectedProductId,  newImageLink) => {
  try {
    // console.log("newImageLink", newImageLink);?productId=6&imageId=9
    const response = await axiosMedia.put(`${END_POINT.PostMedia}?productId=${selectedProductId}&imageId=${imageId}`, newImageLink);
    console.log("Response ID:", response.data);
    return response;
  } catch (error) {
    console.error("POST Error:", error);
    throw error;
  }
};
export const updateProductAPI = async (id,formData) =>  {
   
    try {
        const response = await axiosS.put(`${END_POINT.UpProduct}/${id}`, formData);
      
        console.log("ID Response:", formData); 
        return response;
    } catch (error) {
        console.error("POST Error:", error);
        throw error;
    }
}
export const postMesiaAPI = async (id,productData) =>  {
   
    try {
        const response = await axiosMedia.post(`${END_POINT.AddMedia}/${id}`, productData);
      
        console.log("ID Response:", productData); 
        return response;
    } catch (error) {
        console.error("POST Error:", error);
        throw error;
    }
}
export const deleteMesiaAPI = async (id) =>  {
   
    try {
        const response = await axiosMedia.delete(`${END_POINT.DeleteMedia}/${id}`);
      
        return response;
    } catch (error) {
        console.error("Error:", error);
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
        const response = await axiosImage.post(`${END_POINT.PostIsMedia}`, formData);
      
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