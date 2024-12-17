import { useState } from "react";
import ReusableTable from "../../components/table";
import EditStatusOrder from "./edit";
import { getAllOrder, updateStatusOrder } from "../product/js/product";
import DetailOrder from "./detail-order/detail-order";
import { useNavigate } from "react-router-dom";

export default function OrderPage() {
  const [open, setOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");
  const [order, setOrder] = useState({});
  const [data, setData] = useState([]);

  const columns = [
    { label: "Mã đơn hàng", field: "orderCode" },
    { label: "Tên khách hàng", field: "name" },
    { label: "Ngày đặt hàng", field: "timeOrder" },
    { label: "phương thức", field: "paymentMethod" },
    { label: "Trạng thái", field: "orderStatus" },
  ];
  const statusOptions = [
    { value: "pending", label: "Chờ xác nhận" },
    { value: "shipped", label: "Đang giao hàng" },
    { value: "completed", label: "Hoàn thành" },
    { value: "cancelled", label: "Đã hủy" },
  ];

  const getOrder = async () => {
    try {
      const data = await getAllOrder();
      setData(data.orders);
    }
    catch (error) {
    }
  }
  useState(() => {
    getOrder();
  }, []);

  const handleEdit = (data) => {
    if (data.statusOrder == 4) {
      alert("Đơn hàng này đã hoàn thành không thể cập nhật!")
      return;
    }
    setOpen(true);
    setCurrentStatus(data.orderStatus);
    setOrder(data);
  };

  const [openDetail, setOpenDetail] = useState(false);
  const navigate = useNavigate(); // Khởi tạo navigate
  const handleEye = (data) => {
    setOpenDetail(true);
    navigate(`/dashboard/order?orderId=${data.id}`);
  };

  const handleDelete = (data) => {

  };

  const handleSubmit = async (status) => {
    const statusMap = {
      pending: 1,
      processing: 2,
      shipped: 3,
      completed: 4,
      cancelled: 5
    };

    const s = statusMap[status] || 5; // Trả về 5 nếu không tìm thấy
    const request = {
      statusOrder: s,
    };
    try {
      const res = await updateStatusOrder(order.id, request);
      if (res) {
        getOrder();
      }
    }
    catch (error) {
    }
  };

  return (
    <>
      <ReusableTable
        columns={columns}
        data={data}
        handleEdit={handleEdit}
        StatusOrder={statusOptions}
        handleEye={handleEye}
      />
      <EditStatusOrder
        open={open}
        handleClose={() => setOpen(false)}
        currentStatus={currentStatus}
        onSubmit={handleSubmit}
        statusOptions={statusOptions}
      />

      <DetailOrder open={openDetail} handleClose={() => { setOpenDetail(false); navigate('/dashboard/order') }} />
    </>
  );
}
