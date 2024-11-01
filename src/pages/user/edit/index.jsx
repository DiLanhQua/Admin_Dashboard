/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
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

const EditStatusDialog = ({
  open,
  handleClose,
  currentStatus,
  onSubmit,
  statusOptions,
  data,
}) => {
  const [status, setStatus] = useState(currentStatus);

  // Update status when currentStatus changes
  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  // Handle status change
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  // Handle form submission
  const handleSubmit = () => {
    onSubmit(status, data);
    handleClose();
  };

  // Reset the dialog state when it closes
  const handleDialogClose = () => {
    handleClose();
    setStatus(currentStatus); // Reset to current status on close
  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle>
        Chỉnh sửa trạng thái
        <IconButton
          aria-label="close"
          onClick={handleDialogClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <form>
          {/* Dropdown for selecting status */}
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
        <Button onClick={handleDialogClose} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditStatusDialog;
