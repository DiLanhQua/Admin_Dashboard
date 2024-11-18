import { useState, useEffect, useCallback } from "react";
import { Box, Grid, Paper, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReusableTable from "../../components/Table";
import { DeleteConfirmationModal, handleToast } from "../../utils/toast";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

function CategoryPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const columns = [
    { label: "Tên danh mục", field: "CategoryName" }, 
    { label: "Hình ảnh", field: "image" },
  ];
  

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://localhost:7048/api/Category/get-all-category`
      );
      if (response.data && Array.isArray(response.data.data)) {
        setCategories(
          response.data.data.map((item) => ({
            id: item.id,
            CategoryName: item.categoryName, 
            image: item.image,
          }))
        );
      } else {
        handleToast("error", "Dữ liệu không hợp lệ hoặc trống.");
      }
    } catch (error) {
      handleToast("error", "Lỗi khi tải danh sách danh mục");
      console.error("Error loading:", error);
    }
  }, []);
  

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleEdit = useCallback(
    (category) => {
      navigate(`/dashboard/category/update/${category.id}`, {
        state: { category }, 
      });
    },
    [navigate]
  );

  const handleDelete = useCallback(
    (category) => {
      DeleteConfirmationModal({
        title: "Xác nhận xóa danh mục",
        content: "Bạn có chắc chắn muốn xóa danh mục này?",
        okText: "Xóa",
        cancelText: "Hủy",
        icon: "warning",
        confirmButtonText: "Xóa",
        onConfirm: async () => {
          try {
            await axios.delete(`/api/categories/${category.id}`);
            handleToast("success", "Xóa danh mục thành công", "top-right");
            fetchCategories();
          } catch (error) {
            handleToast("error", "Không thể xóa danh mục", "top-right");
          }
        },
      });
    },
    [fetchCategories]
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {/* Bảng hiển thị danh mục */}
        <Grid item xs={12}>
          <Item>
            <ReusableTable
              columns={columns}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              data={categories}
              navigate={"/dashboard/category/create"}
            />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CategoryPage;
