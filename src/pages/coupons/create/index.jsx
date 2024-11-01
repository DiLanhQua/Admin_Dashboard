import { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import CustomInputField from "../../../components/InputField";
import Textarea from "../../../components/textarea";
import { useNavigate } from "react-router-dom";
import { CouponSchema } from "../validate";
import { useDispatch, useSelector } from "react-redux";
import { createCoupon } from "../../../redux/slices/coupon";
import { handleToast } from "./../../../utils/toast";
import { getCategory } from "../../../redux/slices/category";
import { getBrand } from "../../../redux/slices/brand";
import { getAllCollections } from "../../../redux/slices/collection";
import { getProduct } from "../../../redux/slices/product";

function AddCoupon() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [collectionOptions, setCollectionOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);

  const formik = useFormik({
    initialValues: {
      code: "",
      name: "",
      discount: 0,
      type: "fixed",
      description: "",
      startDate: "",
      endDate: "",
      categoryApply: [],
      brandApply: [],
      collectionApply: [],
      productApply: [],
      productNotApply: [],
      brandNotApply: [],
      collectionNotApply: [],
      categoryNotApply: [],
      quantity: 100,
      quantityMin: 10,
      quantityMax: 100,
      status: "active",
    },
    validationSchema: CouponSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(createCoupon(values)).then((result) => {
        if (result.type === "coupon/createCoupon/fulfilled") {
          handleToast("success", "Thêm mã giảm giá thành công");
          resetForm();
        } else {
          handleToast("error", "Thêm mã giảm giá thất bại");
        }
      });
    },
  });
  const statusCtegory = useSelector((state) => state.category.status);
  const statusBrand = useSelector((state) => state.brand.status);
  const statusCollection = useSelector((state) => state.collection.status);
  const statusProduct = useSelector((state) => state.product.status);
  const categories = useSelector((state) => state.category.data);
  const brands = useSelector((state) => state.brand.data);
  const collections = useSelector((state) => state.collection.data);
  const products = useSelector((state) => state.product.data);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllCollections());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    if (statusCtegory === "success") {
      setCategoryOptions(
        categories.map((category) => ({
          value: category._id,
          option: category.name,
        }))
      );
    }
  }, [statusCtegory, categories]);

  useEffect(() => {
    if (statusBrand === "success") {
      setBrandOptions(
        brands.map((brand) => ({
          value: brand._id,
          option: brand.name,
        }))
      );
    }
  }, [statusBrand, brands]);

  useEffect(() => {
    if (statusCollection === "succeeded") {
      setCollectionOptions(
        collections.map((collection) => ({
          value: collection._id,
          option: collection.name,
        }))
      );
    }
  }, [statusCollection, collections]);

  useEffect(() => {
    if (statusProduct === "success") {
      setProductOptions(
        products.products.map((product) => ({
          value: product._id,
          option: product.name,
        }))
      );
    }
  }, [statusProduct, products]);

  const handleAdvancedToggle = () => {
    setShowAdvanced(!showAdvanced);
    formik.setTouched({
      ...formik.touched,
      collectionApply: true,
      productApply: true,
      categoryApply: true,
      brandApply: true,
    });
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box p={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Thêm mã giảm giá
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <CustomInputField
                      label="Tên Mã Giảm Giá"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      onBlur={formik.handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomInputField
                      label="Mã Giảm Giá"
                      name="code"
                      value={formik.values.code}
                      onChange={formik.handleChange}
                      error={formik.touched.code && Boolean(formik.errors.code)}
                      helperText={formik.touched.code && formik.errors.code}
                      onBlur={formik.handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomInputField
                      label="Số Tiền Giảm Giá"
                      name="discount"
                      type="number"
                      value={formik.values.discount.toString()}
                      onChange={(e) =>
                        formik.setFieldValue("discount", e.target.value)
                      }
                      error={
                        formik.touched.discount &&
                        Boolean(formik.errors.discount)
                      }
                      helperText={
                        formik.touched.discount && formik.errors.discount
                      }
                      onBlur={formik.handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl
                      fullWidth
                      error={formik.touched.type && Boolean(formik.errors.type)}
                    >
                      <InputLabel>Loại Giảm Giá</InputLabel>
                      <Select
                        name="type"
                        value={formik.values.type}
                        onChange={formik.handleChange}
                      >
                        <MenuItem value="fixed">Giảm Giá Cố Định</MenuItem>
                        <MenuItem value="percent">
                          Giảm Giá Theo Phần Trăm
                        </MenuItem>
                      </Select>
                      {formik.touched.type && formik.errors.type && (
                        <FormHelperText>{formik.errors.type}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Textarea
                      label="Mô Tả"
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                      }
                      helperText={
                        formik.touched.description && formik.errors.description
                      }
                      onBlur={formik.handleBlur}
                      height={250}
                    />
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
                      error={
                        formik.touched.startDate &&
                        Boolean(formik.errors.startDate)
                      }
                      helperText={
                        formik.touched.startDate && formik.errors.startDate
                      }
                      onBlur={formik.handleBlur}
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
                      error={
                        formik.touched.endDate && Boolean(formik.errors.endDate)
                      }
                      helperText={
                        formik.touched.endDate && formik.errors.endDate
                      }
                      onBlur={formik.handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <CustomInputField
                      label="Số Lượng"
                      name="quantity"
                      type="number"
                      value={formik.values.quantity.toString()}
                      onChange={(e) =>
                        formik.setFieldValue("quantity", e.target.value)
                      }
                      error={
                        formik.touched.quantity &&
                        Boolean(formik.errors.quantity)
                      }
                      helperText={
                        formik.touched.quantity && formik.errors.quantity
                      }
                      onBlur={formik.handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <CustomInputField
                      label="Số Lượng Tối Thiểu"
                      name="quantityMin"
                      type="number"
                      value={formik.values.quantityMin.toString()}
                      onChange={(e) =>
                        formik.setFieldValue("quantityMin", e.target.value)
                      }
                      error={
                        formik.touched.quantityMin &&
                        Boolean(formik.errors.quantityMin)
                      }
                      helperText={
                        formik.touched.quantityMin && formik.errors.quantityMin
                      }
                      onBlur={formik.handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <CustomInputField
                      label="Số Lượng Tối Đa"
                      name="quantityMax"
                      type="number"
                      value={formik.values.quantityMax.toString()}
                      onChange={(e) =>
                        formik.setFieldValue("quantityMax", e.target.value)
                      }
                      error={
                        formik.touched.quantityMax &&
                        Boolean(formik.errors.quantityMax)
                      }
                      helperText={
                        formik.touched.quantityMax && formik.errors.quantityMax
                      }
                      onBlur={formik.handleBlur}
                    />
                  </Grid>
                </Grid>

                <Box mt={2}>
                  <Button variant="outlined" onClick={handleAdvancedToggle}>
                    {showAdvanced ? "Ẩn Nâng Cao" : "Hiển Thị Nâng Cao"}
                  </Button>
                </Box>

                {showAdvanced && (
                  <Grid container spacing={2} mt={2}>
                    <Grid item xs={12} md={6}>
                      <FormControl
                        fullWidth
                        error={
                          formik.touched.collectionApply &&
                          Boolean(formik.errors.collectionApply)
                        }
                      >
                        <InputLabel>Áp Dụng Cho Bộ Sưu Tập</InputLabel>
                        <Select
                          name="collectionApply"
                          value={formik.values.collectionApply}
                          onChange={(event) =>
                            formik.setFieldValue(
                              "collectionApply",
                              event.target.value
                            )
                          }
                          multiple
                        >
                          {collectionOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.option}
                            </MenuItem>
                          ))}
                        </Select>
                        {formik.touched.collectionApply &&
                          formik.errors.collectionApply && (
                            <FormHelperText>
                              {formik.errors.collectionApply}
                            </FormHelperText>
                          )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl
                        fullWidth
                        error={
                          formik.touched.productApply &&
                          Boolean(formik.errors.productApply)
                        }
                      >
                        <InputLabel>Áp Dụng Cho Sản Phẩm</InputLabel>
                        <Select
                          name="productApply"
                          value={formik.values.productApply}
                          onChange={(event) =>
                            formik.setFieldValue(
                              "productApply",
                              event.target.value
                            )
                          }
                          multiple
                        >
                          {productOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.option}
                            </MenuItem>
                          ))}
                        </Select>
                        {formik.touched.productApply &&
                          formik.errors.productApply && (
                            <FormHelperText>
                              {formik.errors.productApply}
                            </FormHelperText>
                          )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl
                        fullWidth
                        error={
                          formik.touched.categoryApply &&
                          Boolean(formik.errors.categoryApply)
                        }
                      >
                        <InputLabel>Áp Dụng Cho Danh Mục</InputLabel>
                        <Select
                          name="categoryApply"
                          value={formik.values.categoryApply}
                          onChange={(event) =>
                            formik.setFieldValue(
                              "categoryApply",
                              event.target.value
                            )
                          }
                          multiple
                        >
                          {categoryOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.option}
                            </MenuItem>
                          ))}
                        </Select>
                        {formik.touched.categoryApply &&
                          formik.errors.categoryApply && (
                            <FormHelperText>
                              {formik.errors.categoryApply}
                            </FormHelperText>
                          )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl
                        fullWidth
                        error={
                          formik.touched.brandApply &&
                          Boolean(formik.errors.brandApply)
                        }
                      >
                        <InputLabel>Áp Dụng Cho Thương Hiệu</InputLabel>
                        <Select
                          name="brandApply"
                          value={formik.values.brandApply}
                          onChange={(event) =>
                            formik.setFieldValue(
                              "brandApply",
                              event.target.value
                            )
                          }
                          multiple
                        >
                          {brandOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.option}
                            </MenuItem>
                          ))}
                        </Select>
                        {formik.touched.brandApply &&
                          formik.errors.brandApply && (
                            <FormHelperText>
                              {formik.errors.brandApply}
                            </FormHelperText>
                          )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel>Sản Phẩm Không Áp Dụng</InputLabel>
                        <Select
                          name="productNotApply"
                          value={formik.values.productNotApply}
                          onChange={(event) =>
                            formik.setFieldValue(
                              "productNotApply",
                              event.target.value
                            )
                          }
                          multiple
                        >
                          {productOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.option}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel>Thương Hiệu Không Áp Dụng</InputLabel>
                        <Select
                          name="brandNotApply"
                          value={formik.values.brandNotApply}
                          onChange={(event) =>
                            formik.setFieldValue(
                              "brandNotApply",
                              event.target.value
                            )
                          }
                          multiple
                        >
                          {brandOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.option}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel>Bộ Sưu Tập Không Áp Dụng</InputLabel>
                        <Select
                          name="collectionNotApply"
                          value={formik.values.collectionNotApply}
                          onChange={(event) =>
                            formik.setFieldValue(
                              "collectionNotApply",
                              event.target.value
                            )
                          }
                          multiple
                        >
                          {collectionOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.option}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel>Danh Mục Không Áp Dụng</InputLabel>
                        <Select
                          name="categoryNotApply"
                          value={formik.values.categoryNotApply}
                          onChange={(event) =>
                            formik.setFieldValue(
                              "categoryNotApply",
                              event.target.value
                            )
                          }
                          multiple
                        >
                          {categoryOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.option}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Box>
        <Box mt={3} textAlign="right">
          <Button
            variant="contained"
            type="submit"
            color="success"
            aria-label="Add Coupon"
          >
            Thêm mã giảm giá
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => navigate("/dashboard/coupons")}
            style={{ marginLeft: 10 }}
            aria-label="Cancel"
          >
            Hủy
          </Button>
        </Box>
      </form>
    </>
  );
}

export default AddCoupon;
