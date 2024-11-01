import * as Yup from "yup";

export const BannerSchema = Yup.object().shape({
  // // id: Yup.string().required("ID là bắt buộc"),
  // name: Yup.string().required("Tên banner là bắt buộc"),
  // collection: Yup.string().required("Bộ sưu tập là bắt buộc"),
  // image: Yup.string()
  //     .required("Hình ảnh là bắt buộc")
  //     .url("Hình ảnh phải là một URL hợp lệ"),
  // status: Yup.string()
  //     .oneOf(["active", "inactive", "pending", "archived"], "Trạng thái không hợp lệ")
  //     .required("Trạng thái là bắt buộc"),
  // priority: Yup.number()
  //     .required("Mức độ ưu tiên là bắt buộc")
  //     .min(1, "Mức độ ưu tiên phải lớn hơn 0"),
  // startDate: Yup.date().required("Ngày bắt đầu là bắt buộc"),
  // endDate: Yup.date()
  //     .required("Ngày kết thúc là bắt buộc")
  //     .min(Yup.ref("startDate"), "Ngày kết thúc không được trước ngày bắt đầu"),
});
