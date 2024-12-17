/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import ReusableTable from "../../components/table";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteWarehouse,
  getAllWarehouses,
  resetState,
  updateWarehouse,
} from "../../redux/slices/warehouse";
import { DeleteConfirmationModal, handleToast } from "../../utils/toast";
import EditWarehouse from "./edit";

// Các cột của bảng
const columns = [
  { label: "Tên kho", field: "name" },
  { label: "Địa chỉ", field: "address" },
  { label: "Mô tả", field: "description" },
  { label: "Trạng thái", field: "status" },
];

export default function WarehousePage() {
  const [open, setOpen] = useState(false);
  const [warehouseData, setWarehouseData] = useState({});

  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const handleEdit = (index) => {
    setWarehouseData(index);
    setOpen(true);
  };

  const handleDelete = useCallback(
    (index) => {
      DeleteConfirmationModal({
        title: "Xác nhận xóa kho",
        content: "Bạn có chắc chắn muốn xóa kho này?",
        okText: "Xóa",
        cancelText: "Hủy",
        icon: "warning",
        confirmButtonText: "Xóa",
        onConfirm: () => dispatch(deleteWarehouse(index.id)),
      });
    },
    [dispatch]
  );
  const status = useSelector((state) => state.warehouse.status);
  const error = useSelector((state) => state.warehouse.error);
  const warehouses = useSelector((state) => state.warehouse.data.wareHouses);

  const statusDelete = useSelector((state) => state.warehouse.statusDelete);
  useEffect(() => {
    if (statusDelete === "success") {
      handleToast("success", "Xóa kho thành công");
      dispatch(getAllWarehouses());
    } else if (statusDelete === "failed") {
      handleToast("error", error.message);
    }
    dispatch(resetState({ key: "statusDelete", value: "idle" }));
  }, [statusDelete, error, dispatch]);
  useEffect(() => {
    dispatch(getAllWarehouses());
  }, [dispatch]);
  useEffect(() => {
    if (status === "success") {
      setData(
        warehouses.map((warehouse) => ({
          id: warehouse._id,
          name: warehouse.name,
          address: warehouse.address,
          description: warehouse.description,
          status: warehouse.isBlocked === true ? "inactive" : "active",
        }))
      );
    } else if (status === "failed") {
      handleToast("error", error.message);
    }
  }, [status, warehouses, error]);

  const handleUpdate = (values) => {
    
    dispatch(updateWarehouse({ warehouseId: values.id, data: values })).then(
      (res) => {
        if (res.type === "warehouse/updateWarehouse/fulfilled") {
          handleToast("success", "Cập nhật kho thành công");
          dispatch(getAllWarehouses());
        } else {
          handleToast("error", res.payload.error.message);
        }
        dispatch(resetState({ key: "statusUpdate", value: "idle" }));
      }
    );
  };
  return (
    <>
      <ReusableTable
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        data={data}
        columns={columns}
        navigate={"/dashboard/warehouse/create"}
      />

      <EditWarehouse
        open={open}
        handleClose={() => setOpen(false)}
        handleUpdate={handleUpdate}
        warehouseData={warehouseData}
      />
    </>
  );
}
