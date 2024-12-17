import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ReusableTable from "../../components/table";
import EyeCoupons from "./deails";
import { useNavigate } from "react-router-dom";
import { DeleteConfirmationModal, handleToast } from "./../../utils/toast";
import { fDateVN } from "../../utils/format-time";

const columns = [
  { label: "Mã giảm giá", field: "VoucherName" },
  { label: "Giảm giá (%)", field: "Discount" },
  { label: "Loại", field: "DiscountType" },
  { label: "Ngày bắt đầu", field: "TimeStart" },
  { label: "Ngày kết thúc", field: "TimeEnd" },
  { label: "Số lượng", field: "Quantity" },
  { label: "Trạng thái", field: "status" },
];

export default function CouponsList() {
  const [coupons, setCoupons] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const navigate = useNavigate();
  const [maxPageSize, setMaxPageSize] = useState(50);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [page, setPage] = useState(0);
  // Lấy dữ liệu từ API
  const fetchCoupons = async () => {
    try {
      const response = await axios.get(`https://localhost:7048/api/Voucher/get-all-vouchers?maxPageSize=${maxPageSize}&PageSize=${rowsPerPage}&PageNumber=${page + 1}`);
      const responseData = response.data;
      if (!responseData || !responseData.data || !Array.isArray(responseData.data)) {
        throw new Error("Dữ liệu API không hợp lệ");
      }

      // Map dữ liệu để phù hợp với cột
      const data = responseData.data.map((item) => ({
        id: item.id,
        VoucherName: item.voucherName || "Không có tên",
        Discount: item.discount || 0,
        DiscountType: item.discountType || "N/A",
        TimeStart: item.timeStart ? fDateVN(item.timeStart) : "Không xác định",
        TimeEnd: item.timeEnd ? fDateVN(item.timeEnd) : "Không xác định",
        Quantity: item.quantity || 0,
        min_Order_Value: item.min_Order_Value || 0,
        max_Discount: item.max_Discount || 0,
        status: item.status === 0 ? "Không hoạt động" : "Hoạt động",
      }));
      setCoupons(data);
    } catch (error) {

      handleToast("error", "Không thể tải danh sách mã giảm giá");
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, [maxPageSize, rowsPerPage, page]);

  const handleEdit = useCallback(
    (voucher) => {
      navigate(`/dashboard/coupons/edit/${voucher.id}`, {
        state: { voucher },
      });
    },
    [navigate]
  );

  const handleEye = (index) => {

    setSelectedData(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = useCallback(
    async (index) => {
      DeleteConfirmationModal({
        title: "Xác nhận xóa mã giảm giá",
        content: "Bạn có chắc chắn muốn xóa mã giảm giá này không?",
        okText: "Xóa",
        cancelText: "Hủy",
        icon: "warning",
        confirmButtonText: "Xóa",
        onConfirm: async () => {
          try {
            await axios.delete(`/api/coupons/${index.id}`);
            handleToast("success", "Xóa mã giảm giá thành công");
            fetchCoupons(); // Tải lại danh sách sau khi xóa
          } catch (error) {
            handleToast("error", "Xóa mã giảm giá thất bại");
          }
        },
      });
    },
    []
  );

  return (
    <>
      <ReusableTable
        handleEdit={handleEdit}
        data={coupons}
        columns={columns}
        handleEye={handleEye}
        navigate={"/dashboard/coupons/create"}
      />
      {selectedData && (
        <EyeCoupons
          open={open}
          handleClose={handleClose}
          selectedData={selectedData}
          handleEdit={handleEdit}
        />
      )}
    </>
  );
}
