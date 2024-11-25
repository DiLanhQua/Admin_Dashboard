import { useState } from 'react';
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addCategory } from '../apicata'; // Import your add category API
import { handleToast } from '../../../utils/toast'; // Assuming you have a handleToast utility
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // Form validation with Formik and Yup
  const formik = useFormik({
    initialValues: {
      CategoryName: '',
      Picture: '',
    },
    validationSchema: Yup.object({
      CategoryName: Yup.string().required('Tên danh mục là bắt buộc'),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append('CategoryName', values.CategoryName);
      if (file) formData.append('Picture', file);

      await handleAddCategory(formData);
    },
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    if (selectedFile) reader.readAsDataURL(selectedFile);
  };

  const handleImageDelete = () => {
    setFile(null);
    setPreview(null);
    formik.setFieldValue('Picture', '');
  };

  const handleAddCategory = async (formData) => {
    await addCategory(formData);
    navigate('/dashboard/category');
    fetchCategoriesData();
    setInitialValues({ CategoryName: "", image: ""});
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Thêm Danh Mục
      </Typography>
      <form onSubmit={formik.handleSubmit}
      style={{
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "4px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}>
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
              label="Tên Danh Mục"
              name="CategoryName"
              value={formik.values.CategoryName}
              onChange={formik.handleChange}
              error={formik.touched.CategoryName && Boolean(formik.errors.CategoryName)}
              helperText={formik.touched.CategoryName && formik.errors.CategoryName}
              variant="outlined"
              size="small"
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Đang Xử Lý...' : 'Thêm Danh Mục'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AddCategory;
