import { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import * as Yup from "yup";

export default function BrandForm({
  title,
  onAdd,
  onUpdate,
  initialValues,
  isUpdate,
}) {
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setImageFile(null);
    setPreview(null);
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("BrandName", values.BrandName);
    formData.append("country", values.country);

    if (imageFile) {
      formData.append("Picture", imageFile);
    }
    for (let pair of formData.entries()) {
    }

    try {
      if (isUpdate) {
        await onUpdate(formData);
      } else {
        await onAdd(formData);
      }
    } catch (error) {
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        BrandName: Yup.string().required("Tên thương hiệu không được để trống")
          .test('no-number', 'Tên thương hiệu không được chứa số', value => !/[0-9]/.test(value)),
        country: Yup.string().required("Xuất xứ không được để trống")
          .test('no-number', 'Xuất xứ không được chứa số', value => !/[0-9]/.test(value)),
      })}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ errors, touched, handleChange, values }) => (
        <Card>
          <CardHeader title={title} />
          <CardContent>
            <Form encType="multipart/form-data">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {/* Khung chứa ảnh */}
                  <div
                    style={{
                      border: "2px dashed #ccc", // Viền khung ảnh
                      borderRadius: "8px", // Góc bo tròn
                      padding: "10px",
                      textAlign: "center",
                      width: "100%",
                      minHeight: "200px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {/* Chọn ảnh */}
                    {!preview ? (
                      <>
                        <input
                          name="image"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                          id="image-upload"
                        />
                        <label htmlFor="image-upload">
                          <Button variant="contained" component="span">
                            Chọn ảnh
                          </Button>
                        </label>
                      </>
                    ) : (
                      <>
                        <img
                          src={preview}
                          alt="Preview"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "200px",
                            objectFit: "contain", // Đảm bảo ảnh không bị méo
                          }}
                        />
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={handleImageDelete}
                          style={{
                            marginTop: "10px",
                            marginLeft: "10px",
                          }}
                        >
                          Xóa ảnh
                        </Button>
                      </>
                    )}
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <Field
                    name="BrandName"
                    as={TextField}
                    fullWidth
                    label="Tên thương hiệu"
                    value={values.BrandName || ""}
                    onChange={handleChange}
                    error={errors.BrandName && touched.BrandName}
                    helperText={errors.BrandName && touched.BrandName ? errors.BrandName : ""}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    name="country"
                    as={TextField}
                    fullWidth
                    label="Xuất Xứ"
                    value={values.country || ""}
                    onChange={handleChange}
                    error={errors.country && touched.country}
                    helperText={errors.country && touched.country ? errors.country : ""}
                  />
                </Grid>

                <Grid item xs={12} container justifyContent="flex-end">
                  <Button type="submit" variant="contained" color="success">
                    {isUpdate ? "Cập nhật thương hiệu" : "Thêm thương hiệu"}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </CardContent>
        </Card>
      )}
    </Formik>
  );
}
