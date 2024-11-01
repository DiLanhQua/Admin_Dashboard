import { useState, useEffect } from "react";
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
} from "@mui/material";
import propTypes from "prop-types";
import VietQRBankList from "../backs";

const EditPaymentDialog = ({ open, onClose, initialValues, onSave }) => {
  const [formData, setFormData] = useState(initialValues || {});

  // Cập nhật state formData khi initialValues thay đổi
  useEffect(() => {
    setFormData(initialValues || {});
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData); // Gọi hàm onSave và truyền dữ liệu đã chỉnh sửa
  };

  const handleBankSelect = (selectedBank) => {
    setFormData({ ...formData, bank: selectedBank.shortName });
  };
  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>Chỉnh sửa tài khoản</DialogTitle>
        <DialogContent>
          <TextField
            label="Tên tài khoản"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Số tài khoản"
            name="accountNumber"
            value={formData.accountNumber || ""}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <VietQRBankList
            data={handleBankSelect}
            valuedata={{ short_name: formData.bank }}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="bankBranch-label">Chi nhánh</InputLabel>
            <Select
              labelId="bankBranch-label"
              name="bankBranch"
              value={formData.bankBranch || ""}
              onChange={handleChange}
            >
              <MenuItem value="Hà Nội">Hà Nội</MenuItem>
              <MenuItem value="Hồ Chí Minh">Hồ Chí Minh</MenuItem>
              <MenuItem value="Đà Nẵng">Đà Nẵng</MenuItem>
              <MenuItem value="Khác">Khác</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Chủ tài khoản"
            name="accountOwner"
            value={formData.accountOwner || ""}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />

          {/* Select cho Ghi chú */}
          <FormControl fullWidth margin="dense">
            <InputLabel id="note-label">Ghi chú</InputLabel>
            <Select
              labelId="note-label"
              name="note"
              value={formData.note || ""}
              onChange={handleChange}
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
            <Button onClick={handleSave} variant="contained" color="primary">
              Lưu
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

EditPaymentDialog.propTypes = {
  open: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  initialValues: propTypes.object,
  onSave: propTypes.func.isRequired,
};

export default EditPaymentDialog;
