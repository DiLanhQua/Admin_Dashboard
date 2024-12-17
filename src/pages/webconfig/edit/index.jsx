import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import propTypes from "prop-types";
import { WebconFigValidate } from "../validate/WebConFigSchema";
import ImageUploader from "../../../components/upload";

const EditWebConfigDialog = ({ open, onClose, initialValues, onSave }) => {
  const formik = useFormik({
    initialValues: {
      title: initialValues?.title,
      email: initialValues?.email,
      phone: initialValues?.phone,
      address: initialValues?.address,
      logo: initialValues?.logo,
      facebook: initialValues?.facebook,
      tiktok: initialValues?.tiktok,
    },
    validationSchema: WebconFigValidate,
    onSubmit: (values) => {
      
      onSave(values);
    },
  });

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ fontSize: "1.5rem" }}>
          Chỉnh sửa thông tin
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <ImageUploader
              onUploadComplete={(url) => formik.setFieldValue("image", url)}
              imageUrl={formik.values.logo}
              fooder={"Ảnh đại diện"}
            />
            <TextField
              label="Tên công ty"
              fullWidth
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              fullWidth
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Số điện thoại"
              fullWidth
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Địa chỉ"
              fullWidth
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              sx={{ mb: 2 }}
            />
            <TextField
              label="facebook"
              fullWidth
              name="facebook"
              value={formik.values.facebook}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.facebook && Boolean(formik.errors.facebook)}
              helperText={formik.touched.facebook && formik.errors.facebook}
              sx={{ mb: 2 }}
            />

            <TextField
              label="TikTok"
              fullWidth
              name="tiktok"
              value={formik.values.tiktok}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.tiktok && Boolean(formik.errors.tiktok)}
              helperText={formik.touched.tiktok && formik.errors.tiktok}
              sx={{ mb: 2 }}
            />
            <DialogActions>
              <Button onClick={onClose} size="large">
                Hủy
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Lưu
              </Button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

EditWebConfigDialog.propTypes = {
  open: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  initialValues: propTypes.object,
  onSave: propTypes.func.isRequired,
};

export default EditWebConfigDialog;
