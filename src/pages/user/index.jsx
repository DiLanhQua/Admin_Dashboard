import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ReusableTable from "../../components/Table";
import CartDialog from "./details";
import EditStatusDialog from "./edit";
import { DeleteConfirmationModal, handleToast } from "../../utils/toast";
import LoadingWrapper from "../../components/loading/LoadingWrapper";
import CreatePageUser from "./create";

export default function UserPage() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [statusOptions, setStatusOptions] = useState([]);
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({ pageSize: 3, pageNumber: 1, pageCount: 1 });
  const [openCreate, setOpenCreate] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch customers from API
  const fetchCustomers = useCallback(async (pageNumber = 1) => {
    setLoading(true);
    try {
      const response = await axios.get("https://localhost:7048/api/Account/get-all-account", {
        params: { pageNumber, pageSize: pagination.pageSize },
      });
      console.log(response);

      const { data, pageSize, pageNumber: currentPage, pageCount } = response.data;
      const formattedData = data.map((item) => ({
        UserName: item.userName,
        Email: item.email,
        Phone: item.phone,
        FullName: item.fullName,
        Address: item.address,
        Role: item.role,
        image: item.image,
      }));

      setItems(formattedData);
      setPagination({ pageSize, pageNumber: currentPage, pageCount });
    } catch {
      handleToast("error", "Hiển thị người dùng thất bại", "top-right");
    } finally {
      setLoading(false);
    }
  }, [pagination.pageSize]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  // Delete customer
  const handleDelete = useCallback((index) => {
    DeleteConfirmationModal({
      title: "Xác nhận xóa người dùng",
      content: "Bạn có chắc chắn muốn xóa người dùng này?",
      okText: "Xóa",
      cancelText: "Hủy",
      icon: "warning",
      confirmButtonText: "Xóa",
      onConfirm: async () => {
        try {
          await axios.delete(`https://localhost:7048/api/Account/${index.id}`);
          handleToast("success", "Xóa người dùng thành công", "top-right");
          fetchCustomers(pagination.pageNumber); // Refetch customers
        } catch {
          handleToast("error", "Xóa người dùng thất bại", "top-right");
        }
      },
    });
  }, [fetchCustomers, pagination.pageNumber]);

  // Edit customer status
  const handleEdit = useCallback((index) => {
    setDialogOpen(true);
    setStatus(index.status);
    setStatusOptions([
      { value: "active", label: "active" },
      { value: "blocked", label: "blocked" },
    ]);
    setData(index);
  }, []);

  const handleSubmit = useCallback(
    async (status, data) => {
      const updatedStatus = status === "blocked" ? true : false;
      try {
        await axios.put(`https://localhost:7048/api/Account/${data.id}`, {
          isBlocked: updatedStatus,
        });
        handleToast("success", "Cập nhật người dùng thành công", "top-right");
        fetchCustomers(pagination.pageNumber); // Refetch customers
      } catch {
        handleToast("error", "Cập nhật người dùng thất bại", "top-right");
      } finally {
        setDialogOpen(false);
      }
    },
    [fetchCustomers, pagination.pageNumber]
  );

  // Create customer
  const handleCreate = async (data) => {
    setOpenCreate(false);
    try {
      await axios.post("https://localhost:7048/api/Account", data);
      handleToast("success", "Tạo người dùng thành công", "top-right");
      fetchCustomers(pagination.pageNumber); // Refetch customers
    } catch {
      handleToast("error", "Tạo người dùng thất bại", "top-right");
    }
  };

  const handleEye = useCallback((index) => {
    setOpen(true);
    setData(index);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.pageCount) {
      fetchCustomers(newPage);
    }
  };

  const columns = [
    { label: "Tên tài khoản", field: "UserName" },
    { label: "Email", field: "Email" },
    { label: "Số điện thoại", field: "Phone" },
    { label: "Họ và tên", field: "FullName" },
    { label: "Địa chỉ", field: "Address" },
    {
      label: "Vai trò tài khoản",
      field: "Role",
    },
    {
      label: "Hình",
      field: "image",
    },
  ];

  return (
    <>
      <LoadingWrapper loading={loading}>
        <ReusableTable
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          data={items}
          columns={columns}
          handleEye={handleEye}
          buttonAdd={() => setOpenCreate(true)}
        />

        {/* Pagination Controls */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <button
            onClick={() => handlePageChange(pagination.pageNumber - 1)}
            disabled={pagination.pageNumber <= 1}
          >
            Trang trước
          </button>
          <span style={{ margin: "0 10px" }}>
            Trang {pagination.pageNumber} / {pagination.pageCount}
          </span>
          <button
            onClick={() => handlePageChange(pagination.pageNumber + 1)}
            disabled={pagination.pageNumber >= pagination.pageCount}
          >
            Trang sau
          </button>
        </div>
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
        data={data}
      />
      <CreatePageUser
        open={openCreate}
        handleClose={() => setOpenCreate(false)}
        onSaved={handleCreate}
      />
    </>
  );
}
