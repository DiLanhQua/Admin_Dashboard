import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import slugify from "../../../utils/slugify";
import Textarea from "../../../components/textarea";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, resetState } from "../../../redux/slices/category";
import { handleToast } from "../../../utils/toast";
import IconModal from "../IconModal";
import Iconify from "../Iconify";

function CategoryCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

  const formik = useFormik({
    initialValues: {
      name: "",
      icon: "",
      slug: "",
      type: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Tên danh mục là bắt buộc"),
      slug: Yup.string().required("Slug là bắt buộc"),
      type: Yup.string().required("Loại là bắt buộc"),
      description: Yup.string().required("Mô tả là bắt buộc"),
      // icon: Yup.string().required("Icon là bắt buộc"),
    }),
    onSubmit: (values) => {
      const { name, slug, type, description, icon } = values;
      setIsSubmitting(true); // Set loading state
      dispatch(createCategory({ name, slug, type, description, icon }));
    },
  });

  const toggleIconModal = () => {
    setOpen(true);
  };
  const createStatus = useSelector(
    (state) => state.category.createCategoryStatus
  );

  useEffect(() => {
    if (createStatus === "success") {
      handleToast("success", "Thêm danh mục thành công");
      navigate("/dashboard/category");
      setIsSubmitting(false);
      dispatch(resetState({ key: "createCategoryStatus", value: "idle" }));
    }
    if (createStatus === "failed") {
      handleToast("error", "Thêm danh mục thất bại");
      setIsSubmitting(false); // Reset loading state
    }
  }, [createStatus, dispatch, navigate]);

  const handleChangeName = (e) => {
    formik.setFieldValue("name", e.target.value);
    formik.setFieldValue("slug", slugify(e.target.value));
  };
  const [open, setOpen] = useState(false);

  const handleSubmit = (icon) => {
    formik.setFieldValue("icon", icon);
    setOpen(false);
  };

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "4px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <IconModal
              open={open && true}
              onClose={() => setOpen(false)}
              onSubmit={handleSubmit}
            />
            <Iconify icon={formik.values.icon} width={30} />
            <Button onClick={toggleIconModal}>Chọn Icon</Button>
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Tên danh mục"
              name="name"
              value={formik.values.name}
              onChange={handleChangeName}
              margin="normal"
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Slug"
              name="slug"
              value={formik.values.slug}
              onChange={formik.handleChange}
              margin="normal"
              error={formik.touched.slug && Boolean(formik.errors.slug)}
              helperText={formik.touched.slug && formik.errors.slug}
            />
          </Grid>

          <Grid item xs={4}>
            <FormControl
              fullWidth
              sx={{ mt: 2 }}
              error={formik.touched.type && Boolean(formik.errors.type)}
            >
              <InputLabel id="category">Loại</InputLabel>
              <Select
                labelId="category"
                id="category"
                name="type"
                label="Loại"
                value={formik.values.type}
                onChange={formik.handleChange}
              >
                <MenuItem value="product">Sản phẩm</MenuItem>
                <MenuItem value="post">Bài đăng</MenuItem>
              </Select>
              {formik.touched.type && formik.errors.type && (
                <FormHelperText sx={{ color: "red" }}>
                  {formik.errors.type}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Textarea
              label="Mô tả"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </Grid>
          <Grid item xs={12} container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Button
                variant="contained"
                type="submit"
                sx={{ mt: 2 }}
                color="success"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Đang thêm..." : "Thêm danh mục"}
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="error"
                sx={{ mt: 2 }}
                onClick={() => navigate("/dashboard/category")}
                disabled={isSubmitting} // Disable button when submitting
              >
                Hủy
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default CategoryCreate;
