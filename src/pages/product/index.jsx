/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import ReusableTable from "../../components/Table";
import ProductDetailsDialog from "./details";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getProduct,
  resetState,
} from "../../redux/slices/product";
import { DeleteConfirmationModal, handleToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";

export default function ProductPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const columns = [
    { label: "mã", field: "SKU" },
    { label: "Tên sản phẩm", field: "name" },
    { label: "hình ảnh", field: "images" },
    { label: "giá thị trường", field: "priceInMarket" },
    { label: "giá cửa hàng", field: "priceInStore" },
    { label: "giá trên website", field: "priceOnline" },
    { label: "Số lượng", field: "onStock" },
    { label: "Trạng thái", field: "status" },
  ];

  const [product, setProduct] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("#FF6B6B");
  const [selectedSize, setSelectedSize] = useState(42);
  const [tabValue, setTabValue] = useState(0);
  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };
  const handleEdit = (index) => {
    navigate(`/dashboard/product/update/${index._id}`);
  };

  const handleEye = (index) => {
    console.log("Eye", index);
    setProduct(index);
    setOpenDialog(true);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };
  const handleQuantity = () => {
    console.log("Quantity");
  };
  const status = useSelector((state) => state.product.status);
  const products = useSelector((state) => state.product.data.products);
  const deleteStatus = useSelector((state) => state.product.statusDelete);
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    if (status === "success") {
      setData(products);
    }
    dispatch(resetState({ key: "status", value: "idle" }));
  }, [status, products, dispatch]);

  useEffect(() => {
    if (deleteStatus === "success") {
      dispatch(getProduct());
      handleToast("success", "Xóa sản phẩm thành công", "top-right");
    }
    if (deleteStatus === "failed")
      handleToast("error", "Xóa sản phẩm thất bại", "top-right");
    dispatch(resetState({ key: "statusDelete", value: "idle" }));
  }, [deleteStatus, dispatch]);
  const handleDelete = useCallback(
    (index) => {
      console.log("Delete", index);
      DeleteConfirmationModal({
        title: "Xác nhận xóa sản phẩm",
        content: "Bạn có chắc chắn muốn xóa sản phẩm này?",
        okText: "Xóa",
        cancelText: "Hủy",
        icon: "warning",
        confirmButtonText: "Xóa",
        onConfirm: () => dispatch(deleteProduct(index._id)),
      });
    },
    [dispatch]
  );

  const handleSave = (data) => {
    console.log("Save", data);

    setOpen(false);
  };
  return (
    <>
      <ReusableTable
        data={data}
        columns={columns}
        navigate={"/dashboard/product/create"}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleEye={handleEye}
      />
      <ProductDetailsDialog
        product={product}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        handleAddToCart={handleAddToCart}
        selectedColor={selectedColor}
        setSelectedColor={handleColorChange}
        quantity={1}
        setQuantity={handleQuantity}
        selectedSize={selectedSize}
        setSelectedSize={handleSizeChange}
        tabValue={tabValue}
        handleTabChange={handleTabChange}
      />
    </>
  );
}
