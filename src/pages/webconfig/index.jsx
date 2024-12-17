import { useEffect, useState } from "react";
import ReusableTable from "../../components/Table";
import DetailWeb from "./details";
import EditWebConfigDialog from "./edit";
import { useDispatch, useSelector } from "react-redux";
import { getWebConfig, updateWebConfig } from "../../redux/slices/webComfig";
import { handleToast } from "./../../utils/toast";

export default function SiteConfig() {
  const columns = [
    { label: "Tên công ty", field: "title" },
    { label: "Email", field: "email" },
    { label: "SDT", field: "phone" },
    { label: "Địa chỉ", field: "address" },
    { label: "Logo", field: "logo" },
    { label: "Fanpage Facebook", field: "facebook" },
    { label: "Tiktok", field: "tiktok" },
  ];

  const dispatch = useDispatch();
  // Quản lý dữ liệu bảng và dữ liệu được chọn cho Edit
  const [data, setData] = useState(); // State quản lý dữ liệu
  const [open, setOpen] = useState(false); // State quản lý mở/đóng Detail dialog
  const [selectedData, setSelectedData] = useState(null); // Dữ liệu hiện tại cho chi tiết
  const [openEdit, setOpenEdit] = useState(false); // State quản lý mở/đóng Edit dialog
  const [selectedDataEdit, setSelectedDataEdit] = useState(null); // Dữ liệu được chọn để edit
  const status = useSelector((state) => state.webConfig.status);
  const webConfig = useSelector((state) => state.webConfig.data);
  useEffect(() => {
    dispatch(getWebConfig());
  }, [dispatch]);
  useEffect(() => {
    if (status === "succeeded") {
      setData(webConfig);
    }
  }, [status, webConfig]);
  const handleEdit = (data) => {
    
    setSelectedDataEdit(data); // Pass dữ liệu được chọn vào Edit dialog
    setOpenEdit(true); // Mở dialog chỉnh sửa
  };

  const handleEye = (data) => {
    setSelectedData(data); // Hiển thị dữ liệu chi tiết
    setOpen(true); // Mở Detail dialog
  };

  const handleClose = () => {
    setOpen(false); // Đóng Detail dialog
  };

  const handleSave = (updatedData) => {
    setOpenEdit(false); // Đóng dialog sau khi lưu
    dispatch(
      updateWebConfig({ WebComfigId: selectedDataEdit._id, data: updatedData })
    ).then((res) => {
      if (res.type === "webConfig/updateWebConfig/fulfilled") {
        handleToast("success", "Cập nhật thành công");
        dispatch(getWebConfig());
      } else {
        handleToast("error", "Cập nhật thất bại");
      }
    });
  };

  return (
    <>
      {data && (
        <ReusableTable
          columns={columns}
          data={data}
          handleEdit={handleEdit}
          handleEye={handleEye}
        />
      )}

      <DetailWeb
        open={open}
        handleClose={handleClose}
        selectedData={selectedData}
      />
      {selectedDataEdit && (
        <EditWebConfigDialog
          open={openEdit}
          onClose={() => setOpenEdit(false)} // Đóng dialog khi không cần
          initialValues={selectedDataEdit} // Pass dữ liệu được chọn vào Edit dialog
          onSave={handleSave} // Gọi hàm save khi người dùng lưu chỉnh sửa
        />
      )}
    </>
  );
}
