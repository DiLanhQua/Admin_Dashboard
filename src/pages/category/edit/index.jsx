import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Grid,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { handleToast } from "../../../utils/toast";

function CategoryEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
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
      const formData = new FormData();
      formData.append("CategoryName", values.CategoryName);
      if (file) {
        formData.append("Picture", file);
      }
      await handleEdit(formData);
    },
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleImageDelete = () => {
    setFile(null);
    setPreview(null);
    formik.setFieldValue("Picture", "");
  };

  const handleEdit = async (formData) => {
    try {
      // Gửi yêu cầu PUT để cập nhật danh mục
      const response = await axios.put(`https://localhost:7048/api/Category/update-category-by-id/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",  // Quan trọng khi gửi file
        },
      });
  
      handleToast("success", "Cập nhật danh mục thành công");
      navigate("/dashboard/category");
    } catch (error) {
      console.error("Lỗi khi cập nhật danh mục:", error);
      handleToast("error", "Lỗi khi cập nhật danh mục");
    } finally {
      setIsSubmitting(false);
    }
  };
  
 // CategoryEdit.js
useEffect(() => {
  const loadCategoryData = async () => {
    try {
      // Gửi yêu cầu GET để lấy dữ liệu danh mục từ API
      const response = await axios.get(`https://localhost:7048/api/Category/get-category-by-id/${id}`);
      const categoryData = response.data;

      // Nếu lấy được dữ liệu, cập nhật các giá trị cho form
      if (categoryData) {
        formik.setValues({
          CategoryName: categoryData.categoryName || "",
          Picture: categoryData.image || "", // Giá trị hình ảnh nếu có
        });

        // Nếu có hình ảnh, tạo preview cho ảnh
        if (categoryData.image) {
          setPreview(categoryData.image);  // Giả sử hình ảnh là một URL hoặc chuỗi base64
        }
      } else {
        handleToast("error", "Dữ liệu danh mục không hợp lệ");
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu danh mục:", error);
      handleToast("error", "Lỗi khi tải dữ liệu danh mục");
    }
  };

  // Gọi hàm khi component được render lần đầu tiên
  loadCategoryData();
}, [id]);


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
              {isSubmitting ? "Đang cập nhật..." : "Cập nhật danh mục"}
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

export default CategoryEdit;
