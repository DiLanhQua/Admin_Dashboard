import { useState } from "react";
import ReusableTable from "../../components/table";
import EditStatusOrder from "./edit";

export default function OrderPage() {
  const [open, setOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");
  const columns = [
    { label: "Mã đơn hàng", field: "orderCode" },
    { label: "Tên khách hàng", field: "name" },
    { label: "Ngày đặt hàng", field: "orderDate" },
    { label: "Tổng tiền", field: "total" },
    { label: "phương thức", field: "paymentMethod" },
    { label: "Trạng thái", field: "orderStatus" },
  ];
  const initialData = [
    {
      id: 1,
      orderCode: "DH001",
      orderDate: "2021-08-01",
      total: "100000",
      orderStatus: "delivered",
      name: "Nguyễn Văn A",
      paymentMethod: "VNPAY",
      address: "Hà Nội",
    },
    {
      id: 2,
      orderCode: "DH002",
      orderDate: "2021-08-02",
      total: "200000",
      orderStatus: "shipped",
      name: "Nguyễn Văn B",
      paymentMethod: "COD",
    },
    {
      id: 3,
      orderCode: "DH003",
      orderDate: "2021-08-03",
      total: "300000",
      orderStatus: "pending",
      name: "Nguyễn Văn C",
      paymentMethod: "MOMO",
    },
  ];
  const statusOptions = [
    { value: "delivered", label: "Đã giao hàng" },
    { value: "shipped", label: "Đang giao hàng" },
    { value: "pending", label: "Chờ xác nhận" },
    { value: "cancelled", label: "Đã hủy" },
    { value: "returned", label: "Đã trả hàng" },
    { value: "completed", label: "Hoàn thành" },
    { value: "failed", label: "Thất bại" },
    { value: "refunded", label: "Đã hoàn tiền" },
    { value: "processing", label: "Đang xử lý" },
    { value: "on-hold", label: "Tạm giữ" },
    { value: "paid", label: "Đã thanh toán" },
    { value: "unpaid", label: "Chưa thanh toán" },
    { value: "waiting", label: "Chờ đợi" },
  ];

  const handleEdit = (data) => {
    setOpen(true);
    setCurrentStatus(data.orderStatus);
    console.log(data);
  };
  const handleDelete = (data) => {
    console.log(data);
  };

  const handleSubmit = (status) => {
    console.log(status);
  };

  return (
    <>
      <ReusableTable
        columns={columns}
        data={initialData}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        StatusOrder={statusOptions}
      />
      <EditStatusOrder
        open={open}
        handleClose={() => setOpen(false)}
        currentStatus={currentStatus}
        onSubmit={handleSubmit}
        statusOptions={statusOptions}
      />
    </>
  );
}
