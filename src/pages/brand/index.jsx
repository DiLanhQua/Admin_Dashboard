import { Grid } from "@mui/material";
import ReusableTable from "../../components/Table";
import * as Yup from "yup";
import { useCallback, useEffect, useState } from "react";
import BrandForm from "./create";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrand,
  deleteBrand,
  getBrand,
  resetState,
  updateBrand,
} from "../../redux/slices/brand";
import { DeleteConfirmationModal, handleToast } from "./../../utils/toast";

export default function BrandPage() {
  const dispatch = useDispatch();
  const [isUpdate, setIsUpdate] = useState(false);
  const [items, setItems] = useState([]);
  const [initialValues, setInitialValues] = useState({
    name: "",
    image: "",
    description: "",
    slug: "",
  });

  const columns = [
    { label: "Tên thương hiệu", field: "name" },
    { label: "Hình", field: "image" },
  ];

  // Handle brand edit
  const handleEdit = (index) => {
    setInitialValues({
      id: index?.id,
      name: index?.name,
      image: index?.image,
      description: index?.description,
      slug: index?.slug,
    });
    setIsUpdate(true);
  };

  const handleDelete = useCallback(
    (index) => {
      DeleteConfirmationModal({
        title: "Xác nhận xóa thương hiệu",
        content: "Bạn có chắc chắn muốn xóa thương hiệu này không?",
        okText: "Xóa",
        cancelText: "Hủy",
        icon: "warning",
        confirmButtonText: "Xóa",
        onConfirm: () =>
          dispatch(deleteBrand(index.id)).then((res) => {
            if (res.type === "brand/deleteBrand/fulfilled") {
              handleToast("success", "Xóa thương hiệu thành công");
              dispatch(getBrand());
            } else {
              handleToast("error", "Xóa thương hiệu thất bại");
            }
          }),
      });
    },
    [dispatch]
  );

  const onSubmit = (values) => {
    if (isUpdate) {
      console.log(values);
      dispatch(updateBrand({ brandId: values.id, data: values })).then(
        (res) => {
          if (res.type === "brand/updateBrand/fulfilled") {
            handleToast("success", "Cập nhật thương hiệu thành công");
            dispatch(getBrand());
          } else {
            handleToast("error", "Cập nhật thương hiệu thất bại");
          }
        }
      );
      setIsUpdate(false);
    } else {
      dispatch(createBrand(values));
      setInitialValues({
        name: "",
        image: "",
        category: "",
        description: "",
        slug: "",
      });
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Tên thương hiệu không được để trống"),
    description: Yup.string(),
  });

  const status = useSelector((state) => state.brand.status);
  const data = useSelector((state) => state.brand.data);
  const createStatus = useSelector((state) => state.brand.createStatus);

  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);

  useEffect(() => {
    if (status === "success" && data) {
      setItems(
        data.map((item) => ({
          id: item._id,
          name: item.name,
          image: item.image,
          category: item.category,
          description: item.description,
        }))
      );
    }
    dispatch(resetState({ key: "status", value: "idle" }));
  }, [status, data, dispatch]);

  useEffect(() => {
    if (createStatus === "success") {
      dispatch(getBrand());
      handleToast("success", "Thêm thương hiệu thành công");
    }
    if (createStatus === "failed") {
      handleToast("error", "Thêm thương hiệu thất bại");
    }
    dispatch(resetState({ key: "createStatus", value: "idle" }));
  }, [createStatus, dispatch]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <ReusableTable
            columns={columns}
            data={items}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </Grid>
        <Grid item xs={7}>
          <BrandForm
            title={isUpdate ? "Cập nhật thương hiệu" : "Thêm thương hiệu"}
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
            isUpdate={isUpdate}
          />
        </Grid>
      </Grid>
    </>
  );
}
