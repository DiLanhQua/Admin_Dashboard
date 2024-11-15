import { useCallback, useEffect, useState } from "react";
import ReusableTable from "../../components/Table";
import CartDialog from "./details";
import EditStatusDialog from "./edit";
import { useDispatch, useSelector } from "react-redux";
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  resetState,
  updateCustomer,
} from "../../redux/slices/customer";
import { DeleteConfirmationModal, handleToast } from "../../utils/toast";
import LoadingWrapper from "../../components/loading/LoadingWrapper";
import CreatePageUser from "./create";

export default function UserPage() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [statusOptions, setStatusOptions] = useState([]);
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);

  // Redux selectors
  const statusGetCustomer = useSelector((state) => state.customer.status);
  const dataCustomer = useSelector((state) => state.customer.data);
  const statusUpdateCustomer = useSelector(
    (state) => state.customer.statusUpdate
  );
  const deleteStatus = useSelector((state) => state.customer.deleteStatus);

  // Fetch customers on mount
  useEffect(() => {
    dispatch(getCustomer());
  }, [dispatch]);

  // Handle status updates for customer fetching
  useEffect(() => {
    if (statusGetCustomer === "success") {
      dispatch(resetState({ key: "status", value: "idle" }));
    } else if (statusGetCustomer === "failed") {
      handleToast("error", "Hiện thị người dùng thất bại", "top-right");
    }
  }, [statusGetCustomer, dispatch]);

  // Handle customer update status
  useEffect(() => {
    if (statusUpdateCustomer === "success") {
      handleToast("success", "Cập nhật người dùng thành công", "top-right");
      dispatch(resetState({ key: "statusUpdate", value: "idle" }));
      dispatch(getCustomer()); // Refetch customer list after update
    }
  }, [statusUpdateCustomer, dispatch]);

  // Handle customer deletion
  useEffect(() => {
    if (deleteStatus === "success") {
      handleToast("success", "Xóa người dùng thành công", "top-right");
      dispatch(resetState({ key: "deleteStatus", value: "idle" }));
      dispatch(getCustomer()); // Refetch customer list after deletion
    } else if (deleteStatus === "failed") {
      handleToast("error", "Xóa người dùng thất bại", "top-right");
    }
  }, [deleteStatus, dispatch]);

  // Map customer data for the table
  useEffect(() => {
    if (Array.isArray(dataCustomer)) {
      const initialData = dataCustomer.map((item) => ({
        UserName: item?.UserName,
        Email: item?.Email,
        Phone: item?.Phone,
        FullName: item?.FullName,
        Address: item?.Address,
        Role: item?.Role,
        Image: item?.Image,
        
      }));
      setItems(initialData);
    }
  }, [dataCustomer]);

  const columns = [
    { label: "Tên tài khoản", field: "UserName" },
    { label: "Email", field: "Email" },
    { label: "Số điện thoại", field: "Phone" },
    { label: "Họ và tên", field: "FullName" },
    { label: "Địa chỉ", field: "Address" },
    { label: "Vai trò tài khoản", field: "Role" },
    { label: "Hình ảnh", field: "Image" },
  ];

  // Handle delete customer
  const handleDelete = useCallback(
    (index) => {
      DeleteConfirmationModal({
        title: "Xác nhận xóa người dùng",
        content: "Bạn có chắc chắn muốn xóa người dùng này?",
        okText: "Xóa",
        cancelText: "Hủy",
        icon: "warning",
        confirmButtonText: "Xóa",
        onConfirm: () => dispatch(deleteCustomer(index.id)),
      });
    },
    [dispatch]
  );

  // Handle edit status dialog
  const handleEdit = useCallback((index) => {
    setDialogOpen(true);
    setStatus(index.status);
    setStatusOptions([
      { value: "active", label: "active" },
      { value: "blocked", label: "blocked" },
    ]);
    setIndex(index);
  }, []);

  // Handle viewing the user's cart details
  const handleEye = useCallback((index) => {
    setOpen(true);
    setData(index);
  }, []);

  // Handle status submission
  const handleSubmit = useCallback(
    (status, data) => {
      const updatedStatus = status === "blocked" ? true : false;
      dispatch(
        updateCustomer({
          customerId: data.id,
          data: { isBlocked: updatedStatus },
        })
      );
      setDialogOpen(false);
    },
    [dispatch]
  );

  const optionStatus = [
    { value: "all", label: "Tất cả" },
    { value: "active", label: "Hoạt động" },
    { value: "blocked", label: "Bị chặn" },
  ];

  const handleCreate = (data) => {
    setOpenCreate(false);
    dispatch(createCustomer(data)).then((res) => {
      if (res.type === "customer/createCustomer/fulfilled") {
        handleToast("success", "Tạo người dùng thành công", "top-right");
        dispatch(getCustomer());
      } else {
        handleToast("error", "Tạo người dùng thất bại", "top-right");
      }
    });
  };

  return (
    <>
      <LoadingWrapper>
        <ReusableTable
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          data={items}
          columns={columns}
          handleEye={handleEye}
          optionStatus={optionStatus}
          buttonAdd={() => setOpenCreate(true)}
        />
      </LoadingWrapper>
      <CartDialog
        open={open}
        handleClose={() => setOpen(false)}
        items={data}
        onRemove={() => {}}
      />
      <EditStatusDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        currentStatus={status}
        onSubmit={handleSubmit}
        statusOptions={statusOptions}
        data={index}
      />

      <CreatePageUser
        open={openCreate}
        handleClose={() => setOpenCreate(false)}
        onSaved={handleCreate}
      />
    </>
  );
}
