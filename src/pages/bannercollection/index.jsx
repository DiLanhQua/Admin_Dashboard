import { useCallback, useEffect, useState } from "react";
import ReusableTable from "../../components/Table";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./SliderBanner.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBannerCollection,
  getBannerCollection,
} from "../../redux/slices/BannerCollection";
import { formatDay } from "../../utils/format-time";
import { DeleteConfirmationModal, handleToast } from "./../../utils/toast";

const columns = [
  { label: "Tên banner", field: "name" },
  { label: "Trạng thái ", field: "status" },
  { label: "Ngày bắt đầu", field: "startDate" },
  { label: "Ngày kết thúc", field: "endDate" },
];

export default function BannerCollection() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [initialData, setInitialData] = useState([]);

  const handleEdit = (index) => {
    const idBanner = index.id;
    navigate(`/dashboard/bannercollection/edit/${idBanner}`);
  };
  const handleDelete = useCallback(
    (index) => {
      DeleteConfirmationModal({
        title: "Xác nhận xóa banner",
        content: "Bạn có chắc chắn muốn xóa banner này không?",
        okText: "Xóa",
        cancelText: "Hủy",
        icon: "warning",
        confirmButtonText: "Xóa",
        onConfirm: () =>
          dispatch(deleteBannerCollection(index.id)).then((res) => {
            if (
              res.type === "bannerCollection/deleteBannerCollection/fulfilled"
            ) {
              handleToast("success", "Xóa banner thành công");
              dispatch(getBannerCollection());
            } else {
              handleToast("error", "Xóa banner thất bại");
            }
          }),
      });
    },
    [dispatch]
  );
  const status = useSelector((state) => state.bannerCollection.status);
  const data = useSelector((state) => state.bannerCollection.data);

  useEffect(() => {
    dispatch(getBannerCollection());
  }, [dispatch]);

  useEffect(() => {
    if (status === "success" && data) {
      setInitialData(
        data?.map((item) => ({
          id: item._id,
          name: item?.title,
          brand: item?.brand?.name,
          category: item?.category?.name,
          banner: item.banner.map((banner) => ({
            urlImage: banner.urlImage,
            refUrl: banner.refUrl,
            position: banner.position,
          })),
          status: item.status === true ? "active" : "inactive",
          startDate: formatDay(item.startDate),
          endDate: formatDay(item.endDate),
        }))
      );
    }
  }, [status, data]);
  return (
    <>
      <ReusableTable
        columns={columns}
        data={initialData}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        navigate={"/dashboard/bannercollection/create"}
      />
    </>
  );
}
