// src/pages/BrandPage.jsx
import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import ReusableTable from "../../components/Table";
import BrandForm from "./create/index";
import { fetchBrands, addBrand, updateBrand, deleteBrand } from "../../pages/brand/apibrand";  // Import các hàm API
import { handleToast } from "../../utils/toast";

export default function BrandPage() {
  const [isUpdate, setIsUpdate] = useState(false);
  const [items, setItems] = useState([]);
  const [maxPageSize, setMaxPageSize] = useState(100);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
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

  const loadBrands = async () => {
    const brandData = await fetchBrands(maxPageSize, rowsPerPage, page,search);
    setItems(brandData);
  };

  useEffect(() => {
    loadBrands();
  }, [maxPageSize, rowsPerPage, page,search]);

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
    await addBrand(formData);
    loadBrands();
    formik.resetForm()
    setInitialValues({ BrandName: "", image: "", country: "" });
  };

  const handleUpdate = async (formData) => {
    await updateBrand(initialValues.id, formData);
    loadBrands();
    setIsUpdate(false);
    setInitialValues({ BrandName: "", image: "", country: "" });
  };

  const handleDelete = async (id) => {
    await deleteBrand(id);
    loadBrands();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={5}>
        <ReusableTable
        
          columns={columns}
          data={items}
          handleEdit={handleEdit}
          search={search}  
          setSearch={setSearch} 
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
