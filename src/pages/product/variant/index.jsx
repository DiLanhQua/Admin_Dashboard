/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import VariantForm from "./create";
import ReusableTable from "../../../components/table";
import { useDispatch, useSelector } from "react-redux";
import {
  createAttribute,
  deleteAttribute,
  getAttribute,
  resetState,
  updateAttribute,
} from "../../../redux/slices/attribute";
import { DeleteConfirmationModal, handleToast } from "./../../../utils/toast";
import EditVariant from "./edit";

export default function VariantPage() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [Datas, settDatas] = useState();
  const [dataEdit, setDataEdit] = useState();
  const [variantData, setVariantData] = useState({
    name: "",
    key: "",
    typeOfValue: "text",
    values: [],
  });
  const handleVariantChange = (key, value) => {
    setVariantData({
      ...variantData,
      [key]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createAttribute(variantData)).then((res) => {
      if (res.type === "attribute/createAttribute/fulfilled") {
        dispatch(getAttribute());
        handleToast("success", "Thêm biến thể thành công");
      }
      if (res.type === "attribute/createAttribute/rejected") {
        handleToast("error", "Thêm biến thể thất bại");
      }
    });
    handleClose();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { label: "Tên biến thể", field: "name" },
    { label: "Giá trị", field: "key" },
    { label: "Loại giá trị", field: "typeOfValue" },
    { label: "Giá trị", field: "values" },
  ];

  const handleEdit = (data) => {
    setOpenEdit(true);
    setDataEdit(data);
  };
  const handleDelete = (index) => {
    DeleteConfirmationModal({
      title: "Xác nhận xóa biến thể",
      content: "Bạn có chắc chắn muốn xóa biến thể này?",
      okText: "Xóa",
      cancelText: "Hủy",
      icon: "warning",
      confirmButtonText: "Xóa",
      onConfirm: () => dispatch(deleteAttribute(index.id)),
    });
  };

  const status = useSelector((state) => state.attribute.status);
  const data = useSelector((state) => state.attribute.data);
  const deleteStatus = useSelector((state) => state.attribute.deleteStatus);

  useEffect(() => {
    dispatch(getAttribute());
  }, [dispatch]);

  useEffect(() => {
    if (status === "success" && data) {
      settDatas(
        data.map((item) => ({
          id: item._id,
          name: item.name,
          key: item.key,
          typeOfValue: item.typeOfValue,
          values: item.values,
        }))
      );
    }
    if (status === "failed") {
      
    }
    dispatch(resetState({ key: "status", value: "idle" }));
  }, [status, data, dispatch]);

  useEffect(() => {
    if (deleteStatus === "success") {
      dispatch(getAttribute());
      handleToast("success", "Xóa biến thể thành công");
    }
    if (deleteStatus === "failed") {
      handleToast("error", "Xóa biến thể thất bại");
    }
    dispatch(resetState({ key: "deleteStatus", value: "idle" }));
  }, [deleteStatus, dispatch]);

  const handleSave = (data) => {
    dispatch(
      updateAttribute({ attributeId: data.attributeId, data: data.data })
    ).then((res) => {
      if (res.type === "attribute/updateAttribute/fulfilled") {
        dispatch(getAttribute());
        handleToast("success", "Cập nhật biến thể thành công");
      }
      if (res.type === "attribute/updateAttribute/rejected") {
        handleToast("error", "Cập nhật biến thể thất bại");
      }
      dispatch(resetState({ key: "updateStatus", value: "idle" }));
    });
  };
  return (
    <>
      <ReusableTable
        data={Datas || []}
        columns={columns}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        buttonAdd={handleClickOpen}
      />
      <VariantForm
        open={open}
        handleClose={handleClose}
        variantData={variantData}
        handleVariantChange={handleVariantChange}
        handleSubmit={handleSubmit}
      />
      {dataEdit && (
        <EditVariant
          open={openEdit}
          handleClose={() => {
            setOpenEdit(false);
            setDataEdit(null);
          }}
          initialData={dataEdit}
          handleSave={handleSave}
        />
      )}
    </>
  );
}
