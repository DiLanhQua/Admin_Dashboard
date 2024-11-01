/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  TextField,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const EditStatusOrder = ({
  open,
  handleClose,
  currentStatus,
  onSubmit,
  statusOptions,
}) => {
  const [status, setStatus] = useState(currentStatus);

  // Cập nhật trạng thái khi currentStatus thay đổi
  useEffect(() => {
    if (currentStatus) {
      setStatus(currentStatus);
    }
  }, [currentStatus]);

  // Hàm xử lý khi thay đổi trạng thái
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  // Hàm submit form
  const handleSubmit = () => {
    onSubmit(status);
    handleClose(); // Đóng hộp thoại sau khi gửi
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Chỉnh sửa trạng thái
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <form>
          {/* Dropdown chọn trạng thái */}
          <TextField
            select
            label="Trạng thái"
            value={status}
            onChange={handleStatusChange}
            fullWidth
            variant="outlined"
            margin="normal"
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditStatusOrder;
