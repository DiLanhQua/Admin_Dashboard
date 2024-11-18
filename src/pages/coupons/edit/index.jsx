import { useEffect, useState } from "react";
import { Button, TextField, Grid, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { handleToast } from "../../../utils/toast";

function VoucherEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      VoucherName: "",
      TimeStart: "",
      TimeEnd: "",
      DiscountType: "",
      Quantity: "",
      Discount: "",
      MinOrderValue: "",
      MaxDiscount: "",
      Status: "",
    },
    validationSchema: Yup.object({
      VoucherName: Yup.string().required("Tên voucher là bắt buộc"),
      TimeStart: Yup.date().required("Thời gian bắt đầu là bắt buộc"),
      TimeEnd: Yup.date()
        .required("Thời gian kết thúc là bắt buộc")
        .test("is-after-start", "Thời gian kết thúc phải sau thời gian bắt đầu", function (value) {
          const { TimeStart } = this.parent;
          return new Date(value) > new Date(TimeStart);
        }),
      DiscountType: Yup.string().required("Loại giảm giá là bắt buộc"),
      Quantity: Yup.number()
        .required("Số lượng là bắt buộc")
        .positive("Số lượng phải là số dương")
        .integer("Số lượng phải là số nguyên"),
      Discount: Yup.number()
        .required("Giảm giá là bắt buộc")
        .positive("Giảm giá phải là số dương"),
      MinOrderValue: Yup.number()
        .nullable()
        .positive("Giá trị tối thiểu phải là số dương")
        .typeError("Giá trị tối thiểu phải là số"),
      MaxDiscount: Yup.number()
        .nullable()
        .positive("Giảm giá tối đa phải là số dương")
        .typeError("Giảm giá tối đa phải là số"),
      Status: Yup.number()
        .required("Trạng thái là bắt buộc")
        .oneOf([0, 1], "Trạng thái không hợp lệ"),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      await handleEdit(values);
    },
  });

  // Cập nhật voucher API
  const handleEdit = async (formData) => {
    try {
      await axios.put(
        `https://localhost:7048/api/Voucher/update-voucher/${id}`,
        formData
      );
      handleToast("success", "Cập nhật voucher thành công");
      navigate("/dashboard/coupons");
    } catch (error) {
      console.error("Lỗi khi cập nhật voucher:", error.response?.data || error);
      handleToast("error", "Lỗi khi cập nhật voucher");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Load dữ liệu voucher
  useEffect(() => {
    const loadVoucherData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7048/api/Voucher/get-voucher-by-id/${id}`
        );
        const voucherData = response.data;

        if (voucherData) {
          formik.setValues({
            VoucherName: voucherData.voucherName || "",
            TimeStart: voucherData.timeStart || "",
            TimeEnd: voucherData.timeEnd || "",
            DiscountType: voucherData.discountType || "",
            Quantity: voucherData.quantity || "",
            Discount: voucherData.discount || "",
            MinOrderValue: voucherData.minOrderValue || "",
            MaxDiscount: voucherData.maxDiscount || "",
            Status: voucherData.status || "",
          });
        } else {
          handleToast("error", "Dữ liệu voucher không hợp lệ");
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu voucher:", error.response?.data || error);
        handleToast("error", "Lỗi khi tải dữ liệu voucher");
      }
    };

    loadVoucherData();
  }, [id]);

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
            label="Tên Voucher"
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
            label="Thời gian bắt đầu"
            name="TimeStart"
            type="datetime-local"
            value={formik.values.TimeStart}
            onChange={formik.handleChange}
            margin="normal"
            error={formik.touched.TimeStart && Boolean(formik.errors.TimeStart)}
            helperText={formik.touched.TimeStart && formik.errors.TimeStart}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Thời gian kết thúc"
            name="TimeEnd"
            type="datetime-local"
            value={formik.values.TimeEnd}
            onChange={formik.handleChange}
            margin="normal"
            error={formik.touched.TimeEnd && Boolean(formik.errors.TimeEnd)}
            helperText={formik.touched.TimeEnd && formik.errors.TimeEnd}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="DiscountType-label">Loại giảm giá</InputLabel>
            <Select
              labelId="DiscountType-label"
              id="DiscountType"
              name="DiscountType"
              value={formik.values.DiscountType}
              onChange={formik.handleChange}
              error={formik.touched.DiscountType && Boolean(formik.errors.DiscountType)}
            >
              <MenuItem value="%">%</MenuItem>
              <MenuItem value="Cố định">Cố định</MenuItem>
            </Select>
            {formik.touched.DiscountType && formik.errors.DiscountType && (
              <p style={{ color: "red" }}>{formik.errors.DiscountType}</p>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Số lượng"
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
            label="Giảm giá"
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
            name="MinOrderValue"
            type="number"
            value={formik.values.MinOrderValue}
            onChange={formik.handleChange}
            margin="normal"
            error={
              formik.touched.MinOrderValue && Boolean(formik.errors.MinOrderValue)
            }
            helperText={formik.touched.MinOrderValue && formik.errors.MinOrderValue}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Giảm giá tối đa"
            name="MaxDiscount"
            type="number"
            value={formik.values.MaxDiscount}
            onChange={formik.handleChange}
            margin="normal"
            error={formik.touched.MaxDiscount && Boolean(formik.errors.MaxDiscount)}
            helperText={formik.touched.MaxDiscount && formik.errors.MaxDiscount}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="Status-label">Trạng thái</InputLabel>
            <Select
              labelId="Status-label"
              id="Status"
              name="Status"
              value={formik.values.Status}
              onChange={formik.handleChange}
              error={formik.touched.Status && Boolean(formik.errors.Status)}
            >
              <MenuItem value={1}>Hoạt động</MenuItem>
              <MenuItem value={0}>Không hoạt động</MenuItem>
            </Select>
            {formik.touched.Status && formik.errors.Status && (
              <p style={{ color: "red" }}>{formik.errors.Status}</p>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} container justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang lưu..." : "Cập nhật"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default VoucherEdit;
