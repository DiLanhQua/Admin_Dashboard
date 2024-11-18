import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import ReusableTable from "../../components/Table";
import BrandForm from "./create/index";
import axios from "axios";
import { handleToast } from "../../utils/toast";

export default function BrandPage() {
  const [isUpdate, setIsUpdate] = useState(false);
  const [items, setItems] = useState([]);
  const [maxPageSize, setMaxPageSize] = useState(50); 
  const [rowsPerPage, setRowsPerPage] = useState(100); 
  const [page, setPage] = useState(0); 


  const [initialValues, setInitialValues] = useState({
    BrandName: "",
    image: "",
    country: "",
  });

  const columns = [
    { label: "Tên thương hiệu", field: "BrandName" },
    { label: "Hình", field: "image" },
    { label: "Xuất xứ", field: "country" },
  ];

  const fetchBrands = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7048/api/Brand/get-all-brand?maxPageSize=${maxPageSize}&PageSize=${rowsPerPage}&PageNumber=${page + 1}`);
      if (response.data && Array.isArray(response.data.data)) {
        setItems(
          response.data.data.map((item) => ({
            id: item.id,
            BrandName: item.brandName,
            image: item.image,
            country: item.country,
          }))
        );
      } else {
        handleToast("error", "Dữ liệu không hợp lệ hoặc trống.");
      }
    } catch (error) {
      handleToast("error", "Lỗi khi tải danh sách thương hiệu");
      console.error("Error loading brands:", error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, [maxPageSize, rowsPerPage, page]);


  const handleEdit = (brand) => {
    setInitialValues({
      id: brand.id,
      BrandName: brand.BrandName,
      image: brand.image,
      country: brand.country,
    });
    setIsUpdate(true);
  };

  const handleAdd = async (formData) => {

    try {
      console.log("FormData gửi lên:", formData);

      await axios.post("https://localhost:7048/api/Brand/add-brand", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchBrands();
      setInitialValues({ BrandName: "", image: "", country: "" });
      handleToast("success", "Thương hiệu đã được thêm thành công");
    } catch (error) {
      console.error("Error adding brand:", error);
      handleToast("error", "Lỗi khi thêm thương hiệu");
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await axios.put(`https://localhost:7048/api/Brand/update-brand-by-id/${initialValues.id}`, formData);
      fetchBrands();
      setIsUpdate(false);
      setInitialValues({ BrandName: "", image: "", country: "" });
      handleToast("success", "Thương hiệu đã được cập nhật thành công");
    } catch (error) {
      console.error("Error updating brand:", error);
      handleToast("error", "Lỗi khi cập nhật thương hiệu");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7048/api/Brand/delete-brand-by-id/${id}`);
      fetchBrands();
    } catch (error) {
      console.error("Error deleting brand:", error);
      handleToast("error", "Lỗi khi xóa thương hiệu");
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={5}>
        <ReusableTable
          columns={columns}
          data={items}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </Grid>
      <Grid item xs={7}>
        <BrandForm
          title={isUpdate ? "Cập nhật thương hiệu" : "Thêm thương hiệu"}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          initialValues={initialValues}
          isUpdate={isUpdate}
        />
      </Grid>
    </Grid>
  );
}