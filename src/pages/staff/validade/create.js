import * as Yup from "yup";

export const StaffSchema = Yup.object({
  name: Yup.string().required("Tên không được để trống"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  phone: Yup.string().required("Số điện thoại không được để trống"),
  role: Yup.string().required("Chức vụ không được để trống"),
  department: Yup.string().required("Phòng ban không được để trống"),
  base: Yup.string().required("Cơ sở làm việc không được để trống"),
  fixedSalary: Yup.number().required("Lương cơ bản không được để trống"),
  password: Yup.string().required("Mật khẩu không được để trống"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
    .required("Nhập lại mật khẩu không được để trống"),
});
