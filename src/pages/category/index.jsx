import { useState, useEffect, useCallback } from "react";
import { Box, Grid, Paper, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchCategories, deleteCategory } from "./apicata"; // import the API functions
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
  const [maxPageSize, setMaxPageSize] = useState(100);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [page, setPage] = useState(0);

  const [search, setSearch] = useState("");
  const columns = [
    { label: "Tên danh mục", field: "CategoryName" },
    { label: "Hình ảnh", field: "image" },
  ];

  const fetchCategoriesData = useCallback(async () => {
    const data = await fetchCategories(maxPageSize, rowsPerPage, page,search);
    if (data) {
      setCategories(data);
    }
  }, []);

  useEffect(() => {
    fetchCategoriesData();
  }, [fetchCategoriesData]);

  const handleEdit = useCallback(
    (category) => {
      navigate(`/dashboard/category/update/${category.id}`, { state: { category } });
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
          await deleteCategory(category.id);
          fetchCategoriesData();
        },
      });
    },
    [fetchCategoriesData]
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>
            <ReusableTable
              columns={columns}
              handleEdit={handleEdit}
              data={categories}
              search={search}  
              setSearch={setSearch} 
              navigate={"/dashboard/category/create"}
            />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CategoryPage;
