import { useState } from "react";
import { Button, TextField, Grid, MenuItem, Select, InputLabel, FormControl, FormHelperText } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { handleToast } from "../../../utils/toast";

function VoucherCreate() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentDate = new Date().toISOString().slice(0, 16);
  const formik = useFormik({
    initialValues: {
      VoucherName: "",
      TimeStart: "",
      TimeEnd: "",
      DiscountType: "Percentage",
      Quantity: 0,
      Discount: 0,
      Min_Order_Value: 0,
      Max_Discount: 0,
      Status: 1,
    },
    validationSchema: Yup.object({
      VoucherName: Yup.string().required("Tên voucher là bắt buộc"),
      TimeStart: Yup.date()
        .required("Ngày bắt đầu là bắt buộc")
        .min(currentDate, "Ngày bắt đầu phải từ hôm nay trở đi"),
      TimeEnd: Yup.date()
        .required("Ngày kết thúc là bắt buộc")
        .min(Yup.ref("TimeStart"), "Ngày kết thúc phải sau ngày bắt đầu"),
      DiscountType: Yup.string().required("Loại giảm giá là bắt buộc"),
      Quantity: Yup.number()
        .required("Số lượng voucher là bắt buộc")
        .min(1, "Số lượng phải lớn hơn 0"),
      Discount: Yup.number()
        .required("Mức giảm giá là bắt buộc")
        .min(1, "Giảm giá phải lớn hơn 0"),
      Min_Order_Value: Yup.number().required(
        "Giá trị đơn hàng tối thiểu là bắt buộc"
      ),
      Max_Discount: Yup.number().required("Giảm giá tối đa là bắt buộc"),
      Status: Yup.number().required("Trạng thái là bắt buộc"),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      await handleAdd(values);
    },
  });

  const handleAdd = async (values) => {
    try {
      const data = {
        voucherName: values.VoucherName,
        timeStart: values.TimeStart,
        timeEnd: values.TimeEnd,
        discountType: values.DiscountType,
        quantity: values.Quantity,
        discount: values.Discount,
        min_Order_Value: values.Min_Order_Value,
        max_Discount: values.Max_Discount,
        status: values.Status
      }
      console.log("Dữ liệu gửi lên:", data);
      // Send the POST request to the API using axios
      const response = await axios.post("https://localhost:7048/api/Voucher/add-voucher", data);

      console.log(response); // Log response for debugging
      handleToast("success", "Thêm voucher thành công");
      navigate("/dashboard/coupons  ");
    } catch (error) {
      console.error("Lỗi khi thêm voucher:", error);
      handleToast("error", "Lỗi khi thêm voucher");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
          <TextField
            fullWidth
            label="Tên voucher"
            name="VoucherName"
            value={formik.values.VoucherName}
            onChange={formik.handleChange}
            margin="normal"
            error={formik.touched.VoucherName && Boolean(formik.errors.VoucherName)}
            helperText={formik.touched.VoucherName && formik.errors.VoucherName}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Ngày bắt đầu"
            name="TimeStart"
            type="datetime-local"
            value={formik.values.TimeStart}
            onChange={formik.handleChange}
            margin="normal"
            error={formik.touched.TimeStart && Boolean(formik.errors.TimeStart)}
            helperText={formik.touched.TimeStart && formik.errors.TimeStart}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Ngày kết thúc"
            name="TimeEnd"
            type="datetime-local"
            value={formik.values.TimeEnd}
            onChange={formik.handleChange}
            margin="normal"
            error={formik.touched.TimeEnd && Boolean(formik.errors.TimeEnd)}
            helperText={formik.touched.TimeEnd && formik.errors.TimeEnd}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" error={formik.touched.DiscountType && Boolean(formik.errors.DiscountType)}>
            <InputLabel>Loại giảm giá</InputLabel>
            <Select
              label="Loại giảm giá"
              name="DiscountType"
              value={formik.values.DiscountType}
              onChange={formik.handleChange}
            >
              <MenuItem value="Percentage">Phần trăm</MenuItem>
              <MenuItem value="Fixed">Cố định</MenuItem>
            </Select>
            {formik.touched.DiscountType && formik.errors.DiscountType && (
              <FormHelperText>{formik.errors.DiscountType}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Số lượng voucher"
            name="Quantity"
            type="number"
            value={formik.values.Quantity}
            onChange={formik.handleChange}
            margin="normal"
            error={formik.touched.Quantity && Boolean(formik.errors.Quantity)}
            helperText={formik.touched.Quantity && formik.errors.Quantity}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Mức giảm giá"
            name="Discount"
            type="number"
            value={formik.values.Discount}
            onChange={formik.handleChange}
            margin="normal"
            error={formik.touched.Discount && Boolean(formik.errors.Discount)}
            helperText={formik.touched.Discount && formik.errors.Discount}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Giá trị đơn hàng tối thiểu"
            name="Min_Order_Value"
            type="number"
            value={formik.values.Min_Order_Value}
            onChange={formik.handleChange}
            margin="normal"
            error={formik.touched.Min_Order_Value && Boolean(formik.errors.Min_Order_Value)}
            helperText={formik.touched.Min_Order_Value && formik.errors.Min_Order_Value}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Giảm giá tối đa"
            name="Max_Discount"
            type="number"
            value={formik.values.Max_Discount}
            onChange={formik.handleChange}
            margin="normal"
            error={formik.touched.Max_Discount && Boolean(formik.errors.Max_Discount)}
            helperText={formik.touched.Max_Discount && formik.errors.Max_Discount}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" error={formik.touched.Status && Boolean(formik.errors.Status)}>
            <InputLabel>Trạng thái</InputLabel>
            <Select
              label="Trạng thái"
              name="Status"
              value={formik.values.Status}
              onChange={formik.handleChange}
            >
              <MenuItem value={1}>Hoạt động</MenuItem>
              <MenuItem value={0}>Không hoạt động</MenuItem>
            </Select>
            {formik.touched.Status && formik.errors.Status && (
              <FormHelperText>{formik.errors.Status}</FormHelperText>
            )}
          </FormControl>
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
              {isSubmitting ? "Đang thêm..." : "Thêm voucher"}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="error"
              sx={{ mt: 2 }}
              onClick={() => navigate("/dashboard/voucher")}
              disabled={isSubmitting}
            >
              Hủy
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default VoucherCreate;
