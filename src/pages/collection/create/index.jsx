/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import slugify from "../../../utils/slugify";
import Textarea from "../../../components/Textarea";
export default function CreateCollection({ open, handleClose, handleCreate }) {
  const [isSlugEdited, setIsSlugEdited] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Tên bộ sưu tập không được để trống"),
    titleSEO: Yup.string().required("Tiêu đề SEO không được để trống"),
    keywordsSEO: Yup.string().required("Từ khóa SEO không được để trống"),
    descriptionSEO: Yup.string().required("Mô tả SEO không được để trống"),
    slug: Yup.string().required("Slug không được để trống"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      titleSEO: "",
      keywordsSEO: "",
      descriptionSEO: "",
      slug: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleCreate(values);
    },
  });

  useEffect(() => {
    if (!isSlugEdited && formik.values.name) {
      const generatedSlug = slugify(formik.values.name);
      formik.setFieldValue("slug", generatedSlug);
    }
  }, [formik.values.name, isSlugEdited]);

  const handleSlugChange = (e) => {
    formik.setFieldValue("slug", e.target.value);
    setIsSlugEdited(true);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Tạo mới bộ sưu tập</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Tên bộ sưu tập"
                type="text"
                fullWidth
                {...formik.getFieldProps("name")}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                id="slug"
                label="Slug"
                type="text"
                fullWidth
                value={formik.values.slug}
                onChange={handleSlugChange} // Allow manual changes
                error={formik.touched.slug && Boolean(formik.errors.slug)}
                helperText={formik.touched.slug && formik.errors.slug}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                id="titleSEO"
                label="Tiêu đề SEO"
                type="text"
                fullWidth
                {...formik.getFieldProps("titleSEO")}
                error={
                  formik.touched.titleSEO && Boolean(formik.errors.titleSEO)
                }
                helperText={formik.touched.titleSEO && formik.errors.titleSEO}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                id="keywordsSEO"
                label="Từ khóa SEO"
                type="text"
                fullWidth
                {...formik.getFieldProps("keywordsSEO")}
                error={
                  formik.touched.keywordsSEO &&
                  Boolean(formik.errors.keywordsSEO)
                }
                helperText={
                  formik.touched.keywordsSEO && formik.errors.keywordsSEO
                }
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                height: "400px",
              }}
            >
              <Textarea
                id="descriptionSEO"
                label="Mô tả SEO"
                fullWidth
                {...formik.getFieldProps("descriptionSEO")}
                error={
                  formik.touched.descriptionSEO &&
                  Boolean(formik.errors.descriptionSEO)
                }
                helperText={
                  formik.touched.descriptionSEO && formik.errors.descriptionSEO
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">
            Hủy
          </Button>
          <Button type="submit" variant="contained" color="success">
            Tạo
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
