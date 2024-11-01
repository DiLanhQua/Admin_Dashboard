import * as Yup from "yup";

export const CouponSchema = Yup.object().shape({
  name: Yup.string().required("Tên mã giảm giá là bắt buộc"),
  code: Yup.string().required("Mã giảm giá là bắt buộc"),
  discount: Yup.number()
    .required("Số tiền giảm giá là bắt buộc")
    .min(1, "Số tiền giảm giá phải lớn hơn 0"),
  type: Yup.string()
    .oneOf(["fixed", "percent"], "Loại giảm giá không hợp lệ")
    .required("Loại giảm giá là bắt buộc"),
  description: Yup.string().required("Mô tả là bắt buộc"),
  startDate: Yup.date().required("Ngày bắt đầu là bắt buộc"),
  endDate: Yup.date()
    .required("Ngày kết thúc là bắt buộc")
    .min(Yup.ref("startDate"), "Ngày kết thúc không được trước ngày bắt đầu"),
  categoryApply: Yup.array()
    .of(Yup.string())
    .min(1, "Cần phải chọn ít nhất một danh mục"),
  brandApply: Yup.array()
    .of(Yup.string())
    .min(1, "Cần phải chọn ít nhất một thương hiệu"),
  collectionApply: Yup.array()
    .of(Yup.string())
    .min(1, "Cần phải chọn ít nhất một bộ sưu tập"),
  productApply: Yup.array()
    .of(Yup.string())
    .min(1, "Cần phải chọn ít nhất một sản phẩm"),
  productNotApply: Yup.array().of(Yup.string()).nullable(), // Optional
  brandNotApply: Yup.array().of(Yup.string()).nullable(), // Optional
  collectionNotApply: Yup.array().of(Yup.string()).nullable(), // Optional
  categoryNotApply: Yup.array().of(Yup.string()).nullable(), // Optional
  quantity: Yup.number()
    .required("Số lượng là bắt buộc")
    .min(1, "Số lượng phải lớn hơn 0"),
  quantityMin: Yup.number()
    .required("Số lượng tối thiểu là bắt buộc")
    .min(1, "Số lượng tối thiểu phải lớn hơn 0"),
  quantityMax: Yup.number()
    .required("Số lượng tối đa là bắt buộc")
    .min(
      Yup.ref("quantityMin"),
      "Số lượng tối đa phải lớn hơn số lượng tối thiểu"
    ),
  status: Yup.string().required("Trạng thái là bắt buộc"),
});
