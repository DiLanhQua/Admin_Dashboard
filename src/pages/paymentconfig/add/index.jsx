import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import propTypes from "prop-types";
import { useFormik } from "formik";
import VietQRBankList from "../backs";
import * as Yup from "yup";

const AddPaymentDialog = ({ open, onClose, onSave }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Tên tài khoản không được để trống"),
    accountNumber: Yup.string().required("Số tài khoản không được để trống"),
    bank: Yup.string().required("Ngân hàng không được để trống"),
    bankBranch: Yup.string().required("Chi nhánh không được để trống"),
    accountOwner: Yup.string().required("Chủ tài khoản không được để trống"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      accountNumber: "",
      bank: "",
      bankBranch: "",
      accountOwner: "",
      note: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSave(values);
    },
  });
  const handleBankSelect = (selectedBank) => {
    formik.setFieldValue("bank", selectedBank.shortName);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>Chỉnh sửa tài khoản</DialogTitle>
        <DialogContent>
          <TextField
            label="Tên tài khoản"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            fullWidth
            margin="dense"
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            onBlur={formik.handleBlur}
          />
          <TextField
            label="Số tài khoản"
            name="accountNumber"
            value={formik.values.accountNumber}
            onChange={formik.handleChange}
            fullWidth
            margin="dense"
            error={
              formik.touched.accountNumber &&
              Boolean(formik.errors.accountNumber)
            }
            helperText={
              formik.touched.accountNumber && formik.errors.accountNumber
            }
            onBlur={formik.handleBlur}
          />

          <VietQRBankList data={handleBankSelect} />
          <FormControl
            fullWidth
            margin="dense"
            error={
              formik.touched.bankBranch && Boolean(formik.errors.bankBranch)
            }
          >
            {formik.touched.bank && formik.errors.bank ? (
              <InputLabel error id="bankBranch-label">
                Chi nhánh
              </InputLabel>
            ) : (
              <InputLabel id="bankBranch-label">Chi nhánh</InputLabel>
            )}
            <Select
              labelId="bankBranch-label"
              name="bankBranch"
              value={formik.values.bankBranch}
              onChange={formik.handleChange}
            >
              <MenuItem value="Hà Nội">Hà Nội</MenuItem>
              <MenuItem value="Hồ Chí Minh">Hồ Chí Minh</MenuItem>
              <MenuItem value="Đà Nẵng">Đà Nẵng</MenuItem>
              <MenuItem value="Khác">Khác</MenuItem>
            </Select>
            {formik.touched.bankBranch && formik.errors.bankBranch && (
              <FormHelperText>{formik.errors.bankBranch}</FormHelperText>
            )}
          </FormControl>
          <TextField
            label="Chủ tài khoản"
            name="accountOwner"
            value={formik.values.accountOwner}
            onChange={formik.handleChange}
            fullWidth
            margin="dense"
            error={
              formik.touched.accountOwner && Boolean(formik.errors.accountOwner)
            }
            helperText={
              formik.touched.accountOwner && formik.errors.accountOwner
            }
            onBlur={formik.handleBlur}
          />

          {/* Select cho Ghi chú */}
          <FormControl fullWidth margin="dense">
            <InputLabel id="note-label">Ghi chú</InputLabel>
            <Select
              labelId="note-label"
              name="note"
              value={formik.values.note}
              onChange={formik.handleChange}
            >
              <MenuItem value="Tài khoản chính">Tài khoản chính</MenuItem>
              <MenuItem value="Tài khoản phụ">Tài khoản phụ</MenuItem>
              <MenuItem value="Dùng cho giao dịch quốc tế">
                Dùng cho giao dịch quốc tế
              </MenuItem>
            </Select>
          </FormControl>
          <DialogActions>
            <Button onClick={onClose}>Hủy</Button>
            <Button
              onClick={formik.handleSubmit}
              variant="contained"
              color="primary"
            >
              Lưu
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

AddPaymentDialog.propTypes = {
  open: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  initialValues: propTypes.object,
  onSave: propTypes.func.isRequired,
};

export default AddPaymentDialog;
