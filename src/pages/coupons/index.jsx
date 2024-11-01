import { useCallback, useEffect, useState } from "react";
import ReusableTable from "../../components/table";
import EyeCoupons from "./deails";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCoupon,
  getAllCoupon,
  resetState,
} from "../../redux/slices/coupon";
import { fDateVN } from "../../utils/format-time";
import { DeleteConfirmationModal, handleToast } from "./../../utils/toast";
const columns = [
  { label: "Mã giảm giá", field: "code" },
  { label: "Giảm giá", field: "discount" },
  { label: "Loại", field: "type" },
  { label: "Ngày bắt đầu", field: "startDate" },
  { label: "Ngày kết thúc", field: "endDate" },
  { label: "Số lượng", field: "quantity" },
  { label: "Số lượng đã sử dụng", field: "quantityUsed" },
  { label: "Trạng thái", field: "status" },
];

export default function CouponsList() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState([]);
  useEffect(() => {
    dispatch(getAllCoupon());
  }, [dispatch]);
  const status = useSelector((state) => state.coupon.status);
  const data = useSelector((state) => state.coupon.data);

  useEffect(() => {
    if (status === "success") {
      setInitialData(
        data &&
          data.map((item) => {
            return {
              id: item._id,
              name: item.name,
              code: item.code,
              discount: item.discount,
              description: item.description,
              startDate: fDateVN(item.startDate),
              endDate: fDateVN(item.endDate),
              type: item.type,
              categoryApply: item.categoryApply,
              brandApply: item.brandApply,
              collectionApply: item.collectionApply,
              productApply: item.productApply,
              productNotApply: item.productNotApply,
              brandNotApply: item.brandNotApply,
              collectionNotApply: item.collectionNotApply,
              categoryNotApply: item.categoryNotApply,
              quantity: item.quantity,
              quantityMin: item.quantityMin,
              quantityMax: item.quantityMax,
              quantityUsed: item.quantityUsed,
              status: item.status,
            };
          })
      );
    }
    dispatch(resetState({ key: "status", value: "idle" }));
  }, [status, data, dispatch]);

  const handleEdit = (id) => {
    const Coupon = id.id;
    navigate(`/dashboard/coupons/edit/${Coupon}`);
  };

  const handleEye = (index) => {
    setSelectedData(index);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = useCallback(
    (index) => {
      console.log(index);
      DeleteConfirmationModal({
        title: "Xác nhận xóa mã giảm giá",
        content: "Bạn có chắc chắn muốn xóa mã giảm  này không?",
        okText: "Xóa",
        cancelText: "Hủy",
        icon: "warning",
        confirmButtonText: "Xóa",
        onConfirm: () =>
          dispatch(deleteCoupon(index.id)).then((res) => {
            if (res.type === "coupon/deleteCoupon/fulfilled") {
              handleToast("success", "Xóa mã giảm thành công");
              dispatch(getAllCoupon());
            } else {
              handleToast("error", "Xóa mã giảm thất bại");
            }
          }),
      });
    },
    [dispatch]
  );

  return (
    <>
      <ReusableTable
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        data={initialData}
        columns={columns}
        handleEye={handleEye}
        navigate={"/dashboard/coupons/create"}
      />
      {selectedData && (
        <EyeCoupons
          open={open}
          handleClose={handleClose}
          selectedData={selectedData}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
    </>
  );
}
