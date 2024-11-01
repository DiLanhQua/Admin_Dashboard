import { useState, useEffect, useCallback } from "react";
import { Tabs, Tab, Box, Grid, Paper, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReusableTable from "../../components/Table";
import {
  deleteCategory,
  getCategory,
  resetState,
  updatePosition,
} from "../../redux/slices/category";
import { DeleteConfirmationModal, handleToast } from "../../utils/toast";
import Iconify from "./Iconify";

// Style cho Item
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [draggedItem, setDraggedItem] = useState(null);
  const [productItems, setProductItems] = useState([]);
  const [postItems, setPostItems] = useState([]);
  const [mainTabValue, setMainTabValue] = useState(0); // Quản lý tab hiện tại

  // Cột của bảng
  const columns = [
    { label: "Tên danh mục", field: "name" },
    { label: "Slug", field: "slug" },
    { label: "Icon", field: "icon" },
    { label: "Loại", field: "type" },
  ];

  const status = useSelector((state) => state.category.status);
  const data = useSelector((state) => state.category.data);
  const deleteStatus = useSelector(
    (state) => state.category.deleteCategoryStatus
  );

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    if (status === "success" && data) {
      const products = data
        ?.filter((item) => item.type === "product")
        .sort((a, b) => a.position - b.position)
        .map((item) => ({
          id: item._id,
          name: item.name,
          slug: item.slug,
          icon: item.icon,
          type: item.type,
          position: item.position,
        }));

      const posts = data
        ?.filter((item) => item.type === "post")
        .sort((a, b) => a.position - b.position)
        .map((item) => ({
          id: item._id,
          name: item.name,
          slug: item.slug,
          icon: item.icon,
          type: item.type,
          position: item.position,
        }));

      setProductItems(products);
      setPostItems(posts);
    }
    dispatch(resetState({ key: "status", value: "idle" }));
  }, [status, data, dispatch]);

  useEffect(() => {
    if (deleteStatus === "success") {
      dispatch(getCategory());
      handleToast("success", "Xóa danh mục thành công", "top-right");
      dispatch(resetState({ key: "deleteCategoryStatus", value: "idle" }));
    }
  }, [deleteStatus, dispatch]);

  // Hàm thay đổi tab
  const handleMainTabChange = (event, newValue) => setMainTabValue(newValue);

  const onDragStart = useCallback((e, index) => {
    setDraggedItem(index);
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const onDrop = useCallback(
    (e, index, items, setItems) => {
      const newItems = [...items];
      const [removed] = newItems.splice(draggedItem, 1);
      newItems.splice(index, 0, removed);
      setItems(newItems);

      const categories = newItems.map((item, i) => ({
        _id: item.id,
        position: i,
      }));

      saveCategoryOrder(categories);
    },
    [draggedItem]
  );

  const saveCategoryOrder = useCallback(
    (categories) => {
      dispatch(updatePosition({ data: categories })).then((res) => {
        if (res.type === "category/updatePosition/fulfilled") {
          handleToast("success", "Danh mục đã được cập nhật", "top-right");
          dispatch(getCategory());
        } else {
          handleToast("error", "Có lỗi xảy ra", "top-right");
        }
      });
    },
    [dispatch]
  );

  const handleEdit = useCallback(
    (index) => {
      navigate(`/dashboard/category/update/${index.id}`);
    },
    [navigate]
  );

  const handleDelete = useCallback(
    (index) => {
      DeleteConfirmationModal({
        title: "Xác nhận xóa danh mục",
        content: "Bạn có chắc chắn muốn xóa danh mục này?",
        okText: "Xóa",
        cancelText: "Hủy",
        icon: "warning",
        confirmButtonText: "Xóa",
        onConfirm: () => dispatch(deleteCategory(index.id)),
      });
    },
    [dispatch]
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Tabs để chuyển đổi giữa Product và Post */}
      <Tabs value={mainTabValue} onChange={handleMainTabChange}>
        <Tab label="Sản phẩm" />
        <Tab label="Bài đăng" />
      </Tabs>

      <Grid container spacing={2}>
        {/* Hiển thị nội dung theo tab được chọn */}
        {mainTabValue === 0 && (
          <Grid item xs={3}>
            <Item>
              {productItems.map((item, index) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, index)}
                  onDragOver={onDragOver}
                  onDrop={(e) =>
                    onDrop(e, index, productItems, setProductItems)
                  }
                  style={{
                    padding: "10px",
                    margin: "6px",
                    backgroundColor: "#f0f0f0",
                    cursor: "move",
                  }}
                >
                  {<Iconify icon={item.icon} />} - {item.name}
                </div>
              ))}
            </Item>
          </Grid>
        )}

        {mainTabValue === 1 && (
          <Grid item xs={3}>
            <Item>
              {postItems.map((item, index) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, index)}
                  onDragOver={onDragOver}
                  onDrop={(e) => onDrop(e, index, postItems, setPostItems)}
                  style={{
                    padding: "10px",
                    margin: "6px",
                    backgroundColor: "#f0f0f0",
                    cursor: "move",
                  }}
                >
                  {<Iconify icon={item.icon} />} - {item.name}
                </div>
              ))}
            </Item>
          </Grid>
        )}

        {/* Bảng hiển thị cả Product và Post */}
        <Grid item xs={9}>
          <ReusableTable
            columns={columns}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            data={[...productItems, ...postItems]}
            navigate={"/dashboard/category/create"}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default CategoryPage;
