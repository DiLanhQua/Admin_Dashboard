import { Grid, Box, Typography, Paper, Button } from "@mui/material";
import { useFormik } from "formik";
import CustomInputField from "../../../components/InputField";
import CustomDropdown from "../../../components/Dropdown";
import Textarea from "../../../components/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { handleToast } from "../../../utils/toast";
import ImageUploader from "../../../components/upload";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStaffById, updateStaff } from "../../../redux/slices/staff";

// Static options for dropdowns
const roles = [
  { value: "0", label: "Quản trị" },
  { value: "1", label: "Quản trị viên" },
  { value: "2", label: "Biên tập viên" },
  { value: "3", label: "Nhân viên" },
];

const departments = [
  { value: "Sale", label: "Marketing" },
  { value: "Support", label: "Hỗ trợ viên" },
  { value: "Warehouse", label: "Kho" },
  { value: "Accounting", label: "Kế toán" },
];

const bases = [
  { value: "cơ sở 1", label: "cơ sở 1" },
  { value: "cơ sở 2", label: "cơ sở 2" },
];

const EditStaff = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const status = useSelector((state) => state.staff.getStaffByIdStatus);
  const Data = useSelector((state) => state.staff.data);

  const [staffData, setStaffData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "",
    department: "",
    base: "",
    fixedSalary: "",
    description: "",
    avatar: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(getStaffById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (status === "success" && Data) {
      setStaffData({
        name: Data.name || "",
        email: Data.email || "",
        phone: Data.phone || "",
        address: Array.isArray(Data.address)
          ? Data.address.join(", ")
          : Data.address || "",
        role: Array.isArray(Data.role) ? Data.role.join(", ") : Data.role || "",
        department: Data.department || "",
        base: Array.isArray(Data.base) ? Data.base.join(", ") : Data.base || "",
        fixedSalary: Data.fixedSalary || "",
        description: Data.description || "",
        avatar: Data.avatar || "",
      });
    }
  }, [status, Data]);

  const formik = useFormik({
    initialValues: staffData,
    // validationSchema: StaffSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await dispatch(updateStaff({ staffId: id, data: values })).then((res) => {
        if (res.type === "auth/updateStaff/fulfilled") {
          handleToast("success", "Cập nhật nhân viên thành công", "top-right");
          navigate("/dashboard/staff");
        } else {
          handleToast(
            "error",
            "Cập nhật nhân viên không thành công",
            "top-right"
          );
        }
      });
    },
  });

  const handleUploadComplete = (url) => {
    formik.setFieldValue("avatar", url);
  };

  const handleDelete = () => {
    formik.setFieldValue("avatar", "");
  };

  const getErrorProps = (name) => ({
    error: formik.touched[name] && Boolean(formik.errors[name]),
    helperText: formik.touched[name] && formik.errors[name],
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box p={3}>
        <Grid container spacing={3}>
          {/* Profile Upload Section */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Box textAlign="center" mb={2}>
                <Typography variant="h6">Ảnh hồ sơ</Typography>
                <ImageUploader
                  onUploadComplete={handleUploadComplete}
                  onDelete={handleDelete}
                  avatarSize={100}
                  {...getErrorProps("avatar")}
                  onBlur={formik.handleBlur}
                  fooder="staff"
                />
              </Box>
            </Paper>
          </Grid>

          {/* User Information Section */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <CustomInputField
                    label="Họ và tên"
                    {...formik.getFieldProps("name")}
                    {...getErrorProps("name")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomInputField
                    label="Email"
                    {...formik.getFieldProps("email")}
                    {...getErrorProps("email")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomInputField
                    label="Số điện thoại"
                    {...formik.getFieldProps("phone")}
                    {...getErrorProps("phone")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomInputField
                    label="Địa chỉ"
                    {...formik.getFieldProps("address")}
                    {...getErrorProps("address")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomDropdown
                    label="Chức vụ"
                    name="role"
                    options={roles}
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    {...getErrorProps("role")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomDropdown
                    label="Phòng ban"
                    name="department"
                    options={departments}
                    value={formik.values.department}
                    onChange={formik.handleChange}
                    {...getErrorProps("department")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomDropdown
                    label="Cơ sở làm việc"
                    name="base"
                    options={bases}
                    value={formik.values.base}
                    onChange={formik.handleChange}
                    {...getErrorProps("base")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomInputField
                    label="Lương cơ bản"
                    {...formik.getFieldProps("fixedSalary")}
                    {...getErrorProps("fixedSalary")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Textarea
                    label="Mô tả"
                    {...formik.getFieldProps("description")}
                    {...getErrorProps("description")}
                    height={300}
                  />
                </Grid>
              </Grid>

              {/* Submit Button */}
              <Box mt={3} textAlign="right">
                <Button
                  variant="contained"
                  type="submit"
                  color="success"
                  aria-label="Save Staff"
                >
                  Lưu thay đổi
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => navigate("/dashboard/staff")}
                  style={{ marginLeft: 10 }}
                  aria-label="Cancel"
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
};

export default EditStaff;
