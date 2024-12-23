import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Html5QrcodeScanner } from 'html5-qrcode';

import { Modal } from 'react-bootstrap';

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

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

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(2),
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

export default function SignIn() {
  const navigate = useNavigate();
  const [usernameError, setUsernameError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [scanResult] = React.useState(null);
  const [modelopen, setModelOpen] = React.useState(false);
  const [scannerVisible, setScannerVisible] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const OpenClick = () => {
    setModelOpen(true); setScannerVisible(true);
  };

  const CloseClick = () => {
    setModelOpen(false); setScannerVisible(false);
  };
  React.useEffect(() => {
    if(scannerVisible){
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: { width: 250, height: 250 },
      fps: 5,
      verbose: true,
    });

    const success = (result) => {
      scanner.clear();
      try {
        const rawData = result.trim();

        const usernameMatch = rawData.match(/Username:\s*([\w]+)/);
        const passwordMatch = rawData.match(/pass:\s*([\w]+)/);

        const Username = usernameMatch ? usernameMatch[1] : null;
        const pass = passwordMatch ? passwordMatch[1] : null;

        if (Username && pass) {
          document.getElementById("username").value = Username;
          document.getElementById("password").value = pass;
          CloseClick();
          handleSubmit(new Event("submit"));
        } else {
          toast.error("Không tìm thấy username hoặc password trong mã QR.");
        }
      } catch (error) {
        toast.error("Không thể phân tích dữ liệu từ mã QR.");
      }
    };

    const error = (err) => {
    };

    scanner.render(success, error);

    return () => {
      scanner.clear();
    };
  };
  }, [scannerVisible]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    const data = {
      userName: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };

    try {
      const response = await axios.post("https://localhost:7048/api/Account/login", data);
      toast.success("Đăng nhập thành công");

      // Lưu thông tin vào localStorage
      localStorage.setItem("userInfo", JSON.stringify(response.data.data));

      // Điều hướng đến trang profile
      navigate("/dashboard");
    } catch (error) {
      alert("Đăng nhập thất bại!");
    }
  };

  const validateInputs = () => {
    const username = document.getElementById("username");
    const password = document.getElementById("password");

    let isValid = true;

    if (!username.value) {
      setUsernameError(true);
      isValid = false;
    } else {
      setUsernameError(false);
    }

    if (!password.value || password.value.length < 5) {
      setPasswordError(true);
      setPasswordErrorMessage("Mật khẩu phải dài ít nhất 5 ký tự.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column">
        <BackgroundContainer />
        <Card variant="outlined">
          <div className="row">
            <div className="col-11">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Đăng nhập
          </Typography>
            </div>
            <div className="col-1">
            <Button
                variant="outlined"
                sx={{
                  // position: 'absolute',
                  // top: '10px',
                  // marginRight: '10px',
                  right: '20px',
                  borderRadius: '50%',
                  minWidth: '40px',
                  minHeight: '40px',
                  padding: 0,
                }}
              onClick={OpenClick}
              >
                <img src="https://img.icons8.com/ios-filled/50/000000/qr-code.png" alt="QR Code" width="30" height="30" />
              </Button>
              <Modal show={modelopen} onHide={CloseClick} size="lg">
                              <Modal.Header closeButton>
                                <Modal.Title>Quét Mã QR</Modal.Title>
                              </Modal.Header>
                              <Modal.Body >
                              <div id="reader" style={{ marginTop: '20px' }}></div>
                              {scanResult && <div>Thông tin quét: {scanResult}</div>}
                              </Modal.Body>
                            </Modal>
            </div>
          </div>

          {/* <div id="reader" style={{ marginTop: '20px' }}></div>
          {scanResult && <div>Thông tin quét: {scanResult}</div>} */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="username">Tài khoản</FormLabel>
              <TextField
                error={usernameError}
                id="username"
                type="text"
                name="username"
                placeholder="Tên tài khoản"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={usernameError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <FormLabel htmlFor="password">Mật Khẩu</FormLabel>
                <Link
                  component="button"
                  type="button"
                  onClick={handleClickOpen}
                  variant="body2"
                  sx={{ alignSelf: "baseline" }}
                >
                  Quên mật khẩu?
                </Link>
              </Box>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <ForgotPassword open={open} handleClose={handleClose} />
            <Button type="submit" fullWidth variant="contained">
              Đăng nhập
            </Button>
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
}
