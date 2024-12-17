import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { handleToast } from "../../../utils/toast";
import { styled } from "@mui/material";
import MuiCard from "@mui/material/Card";

import { Stack } from "react-bootstrap";
import { resetpassword } from "../../../redux/slices/staff";

const BackgroundContainer = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-443f6.appspot.com/o/background%2Fbackground%20ecommerce.png?alt=media&token=0b18035b-1d5b-4e1a-b916-ce03c4333a76")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "blur(0.2px)",
});

const ResetPasswordContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(2),
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
}));

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password.trim() !== confirmPassword.trim()) {
      return setError("Mật khẩu không khớp");
    }

    setError(null);

    // Dispatch password reset action
    dispatch(resetpassword({ token, password })).then((result) => {
      if (result.type === "staff/resetpassword/fulfilled") {
        handleToast("success", "Password reset successful", "top-right");
        navigate("/");
      } else {
        handleToast("error", "Password reset failed", "top-right");
      }
    });
  };

  return (
    <ResetPasswordContainer direction="column">
      <BackgroundContainer />
      <Card variant="outlined">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
        >
          <Typography variant="h5">Đặt lại mật khẩu</Typography>
          <Typography>Vui lòng nhập mật khẩu mới của bạn bên dưới.</Typography>
          {error && <Typography color="error">{error}</Typography>}
          <OutlinedInput
            required
            id="password"
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            aria-label="New Password"
          />
          <OutlinedInput
            required
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            aria-label="Confirm Password"
          />
          <Button variant="contained" type="submit">
            Đặt lại mật khẩu
          </Button>
        </Box>
      </Card>
    </ResetPasswordContainer>
  );
};

export default ResetPassword;
