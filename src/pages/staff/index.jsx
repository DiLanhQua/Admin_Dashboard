import { useDispatch, useSelector } from "react-redux";
import ReusableTable from "../../components/Table";
import EyeStaff from "./details";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteStaff, getStaff, resetState } from "../../redux/slices/staff";
import { DeleteConfirmationModal, handleToast } from "../../utils/toast";
import LoadingWrapper from "../../components/loading/LoadingWrapper";
import formatCurrency from "../../config/formatCurrency";

export default function StaffPage() {
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);

  const { error, data: staff } = useSelector((state) => state.staff);
  const statusDelete = useSelector((state) => state.staff.deleteStatus);
  useEffect(() => {
    if (error) {
      handleToast("error", error.mes, "top-right");
    }
    dispatch(resetState({ key: "error", value: null }));
  }, [error, dispatch]);

  useEffect(() => {
    dispatch(getStaff());
  }, [dispatch]);

  const columns = [
    { label: "Họ tên", field: "name" },
    { label: "Email", field: "email" },
    { label: "Tỉ lệ hoa hồng", field: "commission" },
    { label: "Cơ sở", field: "base" },
    { label: "Lương cố định", field: "fixedSalary" },
    { label: "Trạng thái", field: "status" },
  ];

  const handleEdit = (index) => {
    if (index && index.id) {
      const id = index.id;
      navigate(`/dashboard/staff/edit/${id}`);
    }
  };

  useEffect(() => {
    if (statusDelete === "success") {
      handleToast("success", "Xóa nhân viên thành công", "top-right");
      dispatch(getStaff());
      dispatch(resetState({ key: "deleteStatus", value: "idle" }));
    }
    if (statusDelete === "failed") {
      handleToast("error", "Xóa nhân viên thất bại", "top-right");
      dispatch(resetState({ key: "deleteStatus", value: "idle" }));
    }
  }, [statusDelete, dispatch]);
  const handleDelete = (index) => {
    DeleteConfirmationModal({
      title: "Xác nhận xóa nhân viên",
      content: "Bạn có chắc chắn muốn xóa nhân viên này?",
      okText: "Xóa",
      cancelText: "Hủy",
      icon: "warning",
      confirmButtonText: "Xóa",
      onConfirm: () => dispatch(deleteStaff(index.id)),
    });
  };
  const handleEye = (index) => {
    setSelectedData(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const mappedItems = Array.isArray(staff)
      ? staff.map((item) => ({
          id: item._id || "",
          name: item.name || "",
          role: item.role || "",
          phone: item.phone || "",
          email: item.email || "",
          commission: item.commissionRate || "",
          base: item.base || "",
          fixedSalary: formatCurrency(item.fixedSalary, "VND", "vi-VN") || "",
          status: item.isBlocked === true ? "blocked" : "active",
          avatar: item.avatar || "",
          startDate: item.startDate || "",
          department: item.department || "",
          totalSalary: (item.commissionRate || 0) + (item.fixedSalary || 0),
        }))
      : [];
    if (mappedItems.length > 0) {
      setItems(mappedItems);
    }
  }, [staff]);

  return (
    <>
      <LoadingWrapper>
        <ReusableTable
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          data={items}
          columns={columns}
          handleEye={handleEye}
          navigate={"/dashboard/staff/create"}
        />
      </LoadingWrapper>
      <EyeStaff
        open={open}
        handleClose={handleClose}
        selectedData={selectedData}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </>
  );
}
