import * as Yup from "yup";
export const WebconFigValidate = Yup.object({
  title: Yup.string().required("title is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});
