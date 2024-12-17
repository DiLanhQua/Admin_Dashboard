import {
  Grid,
  Box,
  Typography,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  TextField,
  Card,
} from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../../../components/upload";
import { BannerSchema } from "../validate/bannerConllection";
import { handleToast } from "../../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCollections } from "../../../redux/slices/collection";
import { getCategory } from "../../../redux/slices/category";
import { getBrand } from "../../../redux/slices/brand";
import { createBannerCollection } from "../../../redux/slices/BannerCollection";
import Textarea from "../../../components/textarea";

const collectionStatus = [
  { value: "true", label: "Hoạt động" },
  { value: "false", label: "Không hoạt động" },
];

function AddBannerCollection() {
  const dispatch = useDispatch();

  const [collectionOptions, setCollectionOptions] = useState([]);
  const [categorySelect, setCategorySelect] = useState([]);
  const [brandSelect, setBrandSelect] = useState([]);

  const statusCollection = useSelector((state) => state.collection.status);
  const dataCollection = useSelector((state) => state.collection.data);
  const statusCategory = useSelector((state) => state.category.status);
  const dataCategory = useSelector((state) => state.category.data);
  const statusBrand = useSelector((state) => state.brand.status);
  const dataBrand = useSelector((state) => state.brand.data);

  useEffect(() => {
    dispatch(getAllCollections());
  }, [dispatch]);

  useEffect(() => {
    if (statusCollection === "succeeded") {
      const collectionOptions = dataCollection.map((item) => ({
        value: item._id,
        label: item.name,
      }));
      setCollectionOptions(collectionOptions);
    }
  }, [statusCollection, dataCollection]);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    if (statusCategory === "success") {
      const categorySelect = dataCategory.map((item) => ({
        value: item._id,
        label: item.name,
      }));
      setCategorySelect(categorySelect);
    }
  }, [statusCategory, dataCategory]);

  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);

  useEffect(() => {
    if (statusBrand === "success") {
      const brandSelect = dataBrand.map((item) => ({
        value: item._id,
        label: item.name,
      }));
      setBrandSelect(brandSelect);
    }
  }, [statusBrand, dataBrand]);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      series: "",
      brand: "",
      category: "",
      status: "active",
      banner: [
        {
          urlImage: "",
          refUrl: "",
          position: 0,
        },
      ],
      startDate: "",
      endDate: "",
    },
    validationSchema: BannerSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values, { resetForm }) => {
      dispatch(createBannerCollection(values)).then((result) => {
        if (
          result.type === "bannerCollection/createBannerCollection/fulfilled"
        ) {
          handleToast("success", "Thêm bộ sưu tập banner thành công");
          resetForm();
        } else {
          handleToast("error", "Thêm bộ sưu tập banner thất bại");
        }
      });
    },
  });

  const handleUploadComplete = (url, index) => {
    formik.setFieldValue(`banner[${index}].urlImage`, url);
  };

  const handleDelete = (index) => {
    formik.setFieldValue(`banner[${index}].urlImage`, "");
  };

  const addNewBanner = () => {
    formik.setFieldValue("banner", [
      ...formik.values.banner,
      { urlImage: "", refUrl: "", position: "" },
    ]);
  };

  const removeBanner = (index) => {
    const updatedBanners = formik.values.banner.filter((_, i) => i !== index);
    formik.setFieldValue("banner", updatedBanners);
  };

  const getErrorProps = (name) => ({
    error: formik.touched[name] && Boolean(formik.errors[name]),
    helperText: formik.touched[name] && formik.errors[name],
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box p={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box>
              {formik.values.banner.map((bannerItem, index) => (
                <Card key={index} sx={{ mb: 2, p: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <ImageUploader
                        onUploadComplete={(url) =>
                          handleUploadComplete(url, index)
                        }
                        onDelete={() => handleDelete(index)}
                        avatarSize={100}
                        idupload={`banner[${index}].urlImage`}
                        value={bannerItem.urlImage}
                        {...getErrorProps(`banner[${index}].urlImage`)}
                        onBlur={formik.handleBlur}
                      />
                    </Grid>
                    <TextField
                      label="Ref URL"
                      name={`banner[${index}].refUrl`}
                      value={bannerItem.refUrl}
                      onChange={formik.handleChange}
                      fullWidth
                      sx={{ mt: 1, ml: 2 }}
                    />
                    <TextField
                      label="Position"
                      name={`banner[${index}].position`}
                      value={bannerItem.position}
                      onChange={formik.handleChange}
                      fullWidth
                      sx={{ mt: 1, ml: 2 }}
                    />
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => removeBanner(index)}
                      sx={{ ml: 2, mt: 2 }}
                    >
                      Xóa
                    </Button>
                  </Grid>
                </Card>
              ))}
            </Box>

            <Button
              variant="contained"
              color="primary"
              onClick={addNewBanner}
              sx={{ mt: 2 }}
            >
              Thêm Banner Mới
            </Button>
          </Grid>
          {/* Banner Information Section */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Tiêu đề"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    fullWidth
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Bộ sưu tập</InputLabel>
                    <Select
                      label="Bộ sưu tập"
                      name="series"
                      value={formik.values.series}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.series && Boolean(formik.errors.series)
                      }
                    >
                      {collectionOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.series && formik.errors.series && (
                      <FormHelperText error>
                        {formik.errors.series}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Danh mục</InputLabel>
                    <Select
                      label="Danh mục"
                      name="category"
                      value={formik.values.category}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.category &&
                        Boolean(formik.errors.category)
                      }
                    >
                      {categorySelect.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.category && formik.errors.category && (
                      <FormHelperText error>
                        {formik.errors.category}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Thương hiệu</InputLabel>
                    <Select
                      label="Thương hiệu"
                      name="brand"
                      value={formik.values.brand}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.brand && Boolean(formik.errors.brand)
                      }
                    >
                      {brandSelect.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.brand && formik.errors.brand && (
                      <FormHelperText error>
                        {formik.errors.brand}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Ngày Bắt Đầu"
                    name="startDate"
                    type="date"
                    value={formik.values.startDate}
                    onChange={formik.handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    {...getErrorProps("startDate")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Ngày Kết Thúc"
                    name="endDate"
                    type="date"
                    value={formik.values.endDate}
                    onChange={formik.handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    {...getErrorProps("endDate")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Trạng thái</InputLabel>
                    <Select
                      label="Trạng thái"
                      name="status"
                      value={formik.values.status}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.status && Boolean(formik.errors.status)
                      }
                    >
                      {collectionStatus.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.status && formik.errors.status && (
                      <FormHelperText error>
                        {formik.errors.status}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Textarea
                    label="Mô tả"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    errorMessage={formik.errors.description}
                  />
                </Grid>
              </Grid>

              {/* Submit and Cancel Buttons */}
              <Box mt={3} textAlign="right">
                <Button
                  variant="contained"
                  type="submit"
                  color="success"
                  aria-label="Add Banner"
                >
                  Thêm bộ sưu tập banner
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => navigate("/dashboard/bannercollection")}
                  style={{ marginLeft: 10 }}
                  aria-label="Cancel"
                >
                  Hủy
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}

export default AddBannerCollection;
