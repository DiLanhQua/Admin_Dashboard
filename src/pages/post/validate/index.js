import * as Yup from "yup";

export const PostSchema = Yup.object().shape({
  //   postTitle: Yup.string()
  //     .required("Tiêu đề bài viết là bắt buộc")
  //     .min(5, "Tiêu đề bài viết phải có ít nhất 5 ký tự"), // Example: Minimum length validation
  //   slug: Yup.string()
  //     .required("Slug là bắt buộc")
  //     .matches(
  //       /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  //       "Slug phải chỉ chứa chữ cái, số và dấu gạch nối"
  //     ), // Example: Slug format validation
  //   thumbnail: Yup.string().required("Ảnh bìa là bắt buộc"), // Assuming thumbnail is required
  //   postShortDescription: Yup.string()
  //     .required("Mô tả ngắn là bắt buộc")
  //     .max(150, "Mô tả ngắn không được vượt quá 150 ký tự"), // Example: Maximum length validation
  //   seoKeywords: Yup.string().max(
  //     255,
  //     "Từ khóa SEO không được vượt quá 255 ký tự"
  //   ), // Example: Maximum length validation
  //   metaDescription: Yup.string().max(
  //     255,
  //     "Mô tả SEO không được vượt quá 255 ký tự"
  //   ), // Example: Maximum length validation
  //   shortSeoDescription: Yup.string().max(
  //     150,
  //     "Mô tả SEO ngắn không được vượt quá 150 ký tự"
  //   ), // Example: Maximum length validation
  //   content: Yup.string()
  //     .required("Nội dung bài viết là bắt buộc")
  //     .min(20, "Nội dung bài viết phải có ít nhất 20 ký tự"), // Example: Minimum length validation
  //   category: Yup.array().of(Yup.string().required("Chọn ít nhất một danh mục")), // Example: Ensure at least one category is selected
});
