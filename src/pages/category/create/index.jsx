import { useEffect, useState } from "react";
import { Button, TextField, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { handleToast } from "../../../utils/toast";

function CategoryCreate() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const formik = useFormik({
    initialValues: {
      CategoryName: "",
      Picture: "", 
    },
    validationSchema: Yup.object({
      CategoryName: Yup.string().required("Tên danh mục là bắt buộc"),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);

      // Prepare the form data for image upload
      const formData = new FormData();
      formData.append("CategoryName", values.CategoryName);
      if (file) {
        formData.append("Picture", file);
      }

      // Call the handleAdd function here
      await handleAdd(formData);
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result); // Preview the image after selecting it
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setFile(null);
    setPreview(null);
    formik.setFieldValue("Picture", ""); // Optionally clear the image field
  };

  const handleAdd = async (formData) => {
    try {
      console.log("FormData gửi lên:", formData);

      // Send the POST request to the API using axios
      const response = await axios.post("https://localhost:7048/api/Category/add-catagory", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response); // Log response for debugging
      handleToast("success", "Thêm danh mục thành công");
      navigate("/dashboard/category");
    } catch (error) {
      console.error("Error adding category:", error);
      handleToast("error", "Lỗi khi thêm danh mục");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "4px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div
            style={{
              border: "2px dashed #ccc",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
              width: "100%",
              minHeight: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
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
                    objectFit: "contain",
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

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Tên danh mục"
            name="CategoryName"
            value={formik.values.CategoryName}
            onChange={formik.handleChange}
            margin="normal"
            error={formik.touched.CategoryName && Boolean(formik.errors.CategoryName)}
            helperText={formik.touched.CategoryName && formik.errors.CategoryName}
          />
        </Grid>

        <Grid item xs={12} container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              type="submit"
              sx={{ mt: 2 }}
              color="success"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang thêm..." : "Thêm danh mục"}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="error"
              sx={{ mt: 2 }}
              onClick={() => navigate("/dashboard/category")}
              disabled={isSubmitting}
            >
              Hủy
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default CategoryCreate;
