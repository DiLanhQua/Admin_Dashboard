import React, { useCallback, useEffect, useState } from "react";
import ReusableTable from "../../components/Table";
import EditPaymentDialog from "./eidt";
import { useDispatch, useSelector } from "react-redux";
import {
  addPayment,
  deletePayment,
  getPayment,
  updatePayment,
} from "../../redux/slices/paynents";
import AddPaymentDialog from "./add";
import { DeleteConfirmationModal, handleToast } from "./../../utils/toast";

export default function PaymentConfig() {
  const dispatch = useDispatch();
  const columns = [
    { label: "Tên tài khoản", field: "name" },
    { label: "Số tài khoản", field: "accountNumber" },
    { label: "Ngân hàng", field: "bank" },
    { label: "Chi nhánh", field: "bankBranch" },
    { label: "Chủ tài khoản", field: "accountOwner" },
    { label: "Ghi chú", field: "note" },
  ];

  const [data, setData] = useState(); // State quản lý dữ liệu
  const [openEdit, setOpenEdit] = useState(false); // State quản lý mở/đóng Edit dialog
  const [selectedDataEdit, setSelectedDataEdit] = useState(null); // Dữ liệu được chọn để edit
  const [openAdd, setOpenAdd] = useState(false); // State quản lý mở/đóng Add dialog

  // Hàm xử lý khi nhấn nút "Sửa"
  const handleEdit = (data) => {
    setSelectedDataEdit(data); // Pass dữ liệu được chọn vào Edit dialog
    setOpenEdit(true); // Mở dialog chỉnh sửa
  };

  // Hàm xử lý khi lưu thông tin chỉnh sửa
  const handleSave = (updatedData) => {
    dispatch(
      updatePayment({ paymentId: selectedDataEdit._id, data: updatedData })
    ).then((res) => {
      if (res.type === "payment/updatePayment/fulfilled") {
        handleToast("success", "Cập nhật tài khoản thành công!");
        dispatch(getPayment());
      } else {
        handleToast("error", "Cập nhật tài khoản thất bại!");
      }
    });
    setOpenEdit(false); // Đóng dialog sau khi lưu
  };
  const handleDelete = useCallback(
    (index) => {
      DeleteConfirmationModal({
        title: "Xác nhận xóa Bài đăng",
        content: "Bạn có chắc chắn muốn xóa bài đăng này?",
        okText: "Xóa",
        cancelText: "Hủy",
        icon: "warning",
        confirmButtonText: "Xóa",
        onConfirm: () => dispatch(deletePayment(index._id)),
      });
    },
    [dispatch]
  );
  const status = useSelector((state) => state.payment.status);
  const payment = useSelector((state) => state.payment.data);
  const statusDelete = useSelector((state) => state.payment.deleteStatus);

  useEffect(() => {
    dispatch(getPayment());
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      setData(payment);
    }
  }, [status, payment]);

  useEffect(() => {
    if (statusDelete === "succeeded") {
      handleToast("success", "Xóa tài khoản thành công!");
      dispatch(getPayment());
    } else if (statusDelete === "failed") {
      handleToast("error", "Xóa tài khoản thất bại!");
    }
  }, [dispatch, statusDelete]);

  const handleAdd = (data) => {
    setOpenAdd(false);
    dispatch(addPayment(data)).then((res) => {
      if (res.type === "payment/addPayment/fulfilled") {
        handleToast("success", "Thêm tài khoản thành công!");
        dispatch(getPayment());
      } else {
        handleToast("error", "Thêm tài khoản thất bại!");
      }
    });
  };
  return (
    <>
      {data && (
        <ReusableTable
          data={data}
          columns={columns}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          buttonAdd={() => setOpenAdd(true)}
        />
      )}

      <EditPaymentDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        initialValues={selectedDataEdit}
        onSave={handleSave}
      />

      <AddPaymentDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSave={handleAdd}
      />
    </>
  );
}
