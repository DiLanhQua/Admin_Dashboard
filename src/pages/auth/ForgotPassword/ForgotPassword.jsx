import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useDispatch } from "react-redux";
import { forgotpassword } from "../../../redux/slices/staff";
import { handleToast } from "../../../utils/toast";
import LoadingWrapper from "../../../components/loading/LoadingWrapper";
import { useState } from "react";

function ForgotPassword({ open, handleClose }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true); // Start loading when submit is clicked
    const email = event.target.email.value;

    dispatch(forgotpassword({ email })).then((result) => {
      setLoading(false); // Stop loading after the request is completed
      if (result.type === "auth/forgotpassword/fulfilled") {
        handleToast("success", "Vui lòng kiểm tra email", "top-right");
        handleClose(); // Close the dialog after successful request
      } else {
        handleToast(
          "error",
          "Không thể gửi email đặt lại mật khẩu",
          "top-right"
        );
      }
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
      }}
    >
      {/* Only show LoadingWrapper when loading is true */}
      {loading ? (
        <LoadingWrapper loading={loading}>
          {/* This can be an empty div, or you can show some loading-specific UI */}
        </LoadingWrapper>
      ) : (
        <>
          <DialogTitle>Đặt lại mật khẩu</DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
          >
            <DialogContentText>
              Nhập địa chỉ email tài khoản của bạn và chúng tôi sẽ gửi cho bạn
              liên kết để đặt lại mật khẩu.
            </DialogContentText>
            <OutlinedInput
              autoFocus
              required
              margin="dense"
              id="email"
              name="email"
              placeholder="Email address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions sx={{ pb: 3, px: 3 }}>
            <Button onClick={handleClose} disabled={loading}>
              Hủy
            </Button>
            <Button variant="contained" type="submit" disabled={loading}>
              Tiếp tục
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

ForgotPassword.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ForgotPassword;
