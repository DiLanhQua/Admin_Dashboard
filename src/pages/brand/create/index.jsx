/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import ImageUploader from "../../../components/upload";
import Textarea from "../../../components/textarea";
import slugify from "../../../utils/slugify";

export default function BrandForm({
  title,
  onSubmit,
  initialValues,
  validationSchema,
  isUpdate,
}) {
  const [isSlugEdited, setIsSlugEdited] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {({ errors, touched, handleChange, values, setFieldValue }) => {
        // Update the slug when the name changes, but only if the user hasn't manually edited the slug
        useEffect(() => {
          if (values.name && !isSlugEdited) {
            const generatedSlug = slugify(values.name);
            setFieldValue("slug", generatedSlug);
          }
        }, [values.name, isSlugEdited, setFieldValue]);

        // Handle changes in the slug field and set the state accordingly
        const handleSlugChange = (e) => {
          setIsSlugEdited(true); // Mark slug as manually edited
          setFieldValue("slug", e.target.value);
        };

        // Handle image upload and set the image URL
        const handleImageUpload = (url) => {
          setFieldValue("image", url);
        };

        const handleImageDelete = () => {
          setFieldValue("image", "");
        };

        return (
          <Card>
            <CardHeader title={title} />
            <CardContent>
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <ImageUploader
                      label="Hình ảnh"
                      name="image"
                      onUploadComplete={handleImageUpload} // Custom handler for uploading images
                      onDelete={handleImageDelete} // Custom handler for deleting images
                      error={errors.image && touched.image}
                      helperText={
                        errors.image && touched.image ? errors.image : ""
                      }
                      fooder="brand" // Dynamic folder for image upload
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Field
                      name="name"
                      as={TextField}
                      fullWidth
                      label="Tên thương hiệu"
                      variant="outlined"
                      value={values.name || ""}
                      onChange={handleChange}
                      error={errors.name && touched.name}
                      helperText={
                        errors.name && touched.name ? errors.name : ""
                      }
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Slug"
                      variant="outlined"
                      value={values.slug || ""}
                      onChange={handleSlugChange} // Custom handler for slug changes
                      error={errors.slug && touched.slug}
                      helperText={
                        errors.slug && touched.slug ? errors.slug : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Textarea
                      label="Mô tả"
                      name="description"
                      value={values.description || ""}
                      onChange={handleChange}
                      error={errors.description && touched.description}
                      helperText={
                        errors.description && touched.description
                          ? errors.description
                          : ""
                      }
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
        );
      }}
    </Formik>
  );
}
