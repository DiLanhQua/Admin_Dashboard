// src/api/brandApi.js
import axios from "axios";
import { DeleteConfirmationModal, handleToast } from "../../utils/toast";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "https://localhost:7048/api/Brand";

export const fetchBrands = async (maxPageSize, rowsPerPage, page,searchTerm) => {
  try {
    const response = await axios.get(
      `${API_URL}/get-all-brand?maxPageSize=${maxPageSize}&PageSize=${rowsPerPage}&PageNumber=${page + 1}&Search=${searchTerm}`
    );
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data.map((item) => ({
        id: item.id,
        BrandName: item.brandName,
        image: item.image,
        country: item.country,
      }));
    } else {
      handleToast("error", "Dữ liệu không hợp lệ hoặc trống.");
      return [];
    }
  } catch (error) {
    handleToast("error", "Lỗi khi tải danh sách thương hiệu");
    return [];
  }
};

export const addBrand = async (formData) => {
  try {
    await axios.post(`${API_URL}/add-brand`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    handleToast("success", "Thương hiệu đã được thêm thành công");
  } catch (error) {
    if (error.response && error.response.status === 400 && error.response.data === "Tên thương hiệu đã tồn tại.") {
      handleToast("error", "Tên thương hiệu đã tồn tại.");
    } else {
      handleToast("error", "Lỗi khi thêm thương hiệu");
    }
  }
};

export const updateBrand = async (id, formData) => {
  try {
    await axios.put(`${API_URL}/update-brand-by-id/${id}`, formData);
    handleToast("success", "Thương hiệu đã được cập nhật thành công");
  } catch (error) {
    if (error.response && error.response.status === 400 && error.response.data === "Tên thương hiệu đã tồn tại.") {
      handleToast("error", "Tên thương hiệu đã tồn tại.");
    } else {
      handleToast("error", "Lỗi khi cập nhật thương hiệu");
    }
  }
};

export const deleteBrand = async (id) => {
  try {
    await axios.delete(`${API_URL}/delete-brand-by-id/${id}`);
  } catch (error) {
    handleToast("error", "Lỗi khi xóa thương hiệu");
  }
};
