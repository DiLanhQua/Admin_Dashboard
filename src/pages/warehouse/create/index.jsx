import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Grid, Paper, Button, TextField } from "@mui/material";
import { handleToast } from "../../../utils/toast";
import Textarea from "../../../components/textarea";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createWarehouse } from "../../../redux/slices/warehouse";

function AddWarehouse() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Formik configuration
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Tên kho là bắt buộc"),
      address: Yup.string().required("Địa chỉ là bắt buộc"),
      description: Yup.string().required("Mô tả là bắt buộc"),
    }),
    onSubmit: (values) => {
      dispatch(createWarehouse(values)).then((res) => {
        if (res.type === "warehouse/createWarehouse/fulfilled") {
          handleToast("success", "Thêm kho thành công");
          navigate("/dashboard/warehouse");
        } else {
          handleToast("error", res.error.message);
        }
      });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Grid container spacing={2}>
                {/* Name Field */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Tên kho"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                {/* Address Field */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Địa chỉ"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.address && Boolean(formik.errors.address)
                    }
                    helperText={formik.touched.address && formik.errors.address}
                  />
                </Grid>

                {/* Description Field */}
                <Grid item xs={12} md={12}>
                  <Textarea
                    label="Mô tả"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                    height={300}
                  />
                </Grid>
              </Grid>
              {/* Submit Button */}
              <Box mt={3} textAlign="right">
                <Button variant="contained" type="submit" color="success">
                  Thêm kho
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ ml: 2 }}
                  onClick={() => navigate("/dashboard/warehouse")}
                >
                  Hủy
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}

export default AddWarehouse;
