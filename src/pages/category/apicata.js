import axios from "axios";
import { DeleteConfirmationModal, handleToast } from "../../utils/toast";
import { Navigate, useNavigate } from "react-router-dom";

const BASE_URL = "https://localhost:7048/api/Category";
export const fetchCategories = async (maxPageSize, rowsPerPage, page) => {
  try {
    const response = await axios.get(`${BASE_URL}/get-all-category?maxPageSize=${maxPageSize}&PageSize=${rowsPerPage}&PageNumber=${page + 1}`);
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data.map((item) => ({
        id: item.id,
        CategoryName: item.categoryName,
        image: item.image,
      }));
    } else {
      handleToast("error", "Dữ liệu không hợp lệ hoặc trống.");
    }
  } catch (error) {
    handleToast("error", "Lỗi khi tải danh sách danh mục");
    console.error("Error loading:", error);
  }
};

export const fetchCategoryById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/get-category-by-id/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu danh mục:", error);
    handleToast("error", "Lỗi khi tải dữ liệu danh mục");
  }
};
export const updateCategory = async (id, formData) => {
  try {
    await axios.put(`${BASE_URL}/update-category-by-id/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    handleToast("success", "Cập nhật danh mục thành công");
  } catch (error) {
    console.error("Lỗi khi cập nhật danh mục:", error);
    if (error.response && error.response.status === 400 && error.response.data === "Tên danh mục đã tồn tại.") {
      handleToast("error", "Tên danh mục đã tồn tại.");
    } else {
      handleToast("error", "Lỗi khi cập nhật danh mục");
    }
  }
};

export const addCategory = async (formData) => {
  try {
    await axios.post(`${BASE_URL}/add-catagory`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    handleToast("success", "Thêm danh mục thành công");
    Navigate(`/dashboard/category`)
  } catch (error) {
    console.error("Error adding category:", error);
    if (error.response && error.response.status === 400 && error.response.data === "Tên danh mục đã tồn tại.") {
      handleToast("error", "Tên danh mục đã tồn tại.");
    } else {
    }
  }
};

export const deleteCategory = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/delete-category/${id}`);
    handleToast("success", "Xóa danh mục thành công", "top-right");
  } catch (error) {
    handleToast("error", "Không thể xóa danh mục", "top-right");
  }
};
