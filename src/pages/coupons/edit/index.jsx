import { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { handleToast } from "../../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCoupon,
  getCouponById,
  resetState,
  updateCoupon,
} from "../../../redux/slices/coupon";
import { getCategory } from "../../../redux/slices/category";
import { getBrand } from "../../../redux/slices/brand";
import { getAllCollections } from "../../../redux/slices/collection";
import { getProduct } from "../../../redux/slices/product";
import Textarea from "../../../components/textarea";

function UpdateCoupons() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [collectionOptions, setCollectionOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);

  const statusCategory = useSelector((state) => state.category.status);
  const statusBrand = useSelector((state) => state.brand.status);
  const statusCollection = useSelector((state) => state.collection.status);
  const statusProduct = useSelector((state) => state.product.status);
  const categories = useSelector((state) => state.category.data);
  const brands = useSelector((state) => state.brand.data);
  const collections = useSelector((state) => state.collection.data);
  const products = useSelector((state) => state.product.data);
  const coupon = useSelector((state) => state.coupon.data);
  const statusGetById = useSelector((state) => state.coupon.statusGetById);

  const formInitialValues = {
    code: "",
    name: "",
    discount: 0,
    type: "",
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
    quantity: "",
    quantityMin: "",
    quantityMax: "",
    status: "",
  };

  const formik = useFormik({
    initialValues: formInitialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const id = coupon?._id;
      console.log("values", values);
      dispatch(updateCoupon({ couponId: id, data: values })).then((res) => {
        console.log("res", res);
        if (res.type === "coupon/updateCoupon/fulfilled") {
          dispatch(getAllCoupon());
          handleToast("success", "Cập nhật giảm giá thành công");
          navigate("/dashboard/coupons");
        } else {
          handleToast("error", "Cập nhật giảm giá thất bại");
        }
      });
    },
  });

  const mapOptions = (data) =>
    data.map(({ _id, name }) => ({
      value: _id,
      option: name,
    }));

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        dispatch(getCouponById(id)),
        dispatch(getCategory()),
        dispatch(getBrand()),
        dispatch(getAllCollections()),
        dispatch(getProduct()),
      ]);
    };
    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    if (statusCategory === "success")
      setCategoryOptions(mapOptions(categories));
    if (statusBrand === "success") setBrandOptions(mapOptions(brands));
    if (statusCollection === "succeeded")
      setCollectionOptions(mapOptions(collections));
    if (statusProduct === "success")
      setProductOptions(mapOptions(products.products));
  }, [
    statusCategory,
    categories,
    statusBrand,
    brands,
    statusCollection,
    collections,
    statusProduct,
    products,
  ]);

  useEffect(() => {
    if (statusGetById === "success" && coupon) {
      formik.setValues({
        code: coupon.code || "",
        name: coupon.name || "",
        discount: coupon.discount || 0,
        type: coupon.type || "",
        description: coupon.description || "",
        startDate: coupon.startDate || "",
        endDate: coupon.endDate || "",
        categoryApply: coupon.categoryApply || [],
        brandApply: coupon.brandApply || [],
        collectionApply: coupon.collectionApply || [],
        productApply: coupon.productApply || [],
        productNotApply: coupon.productNotApply || [],
        brandNotApply: coupon.brandNotApply || [],
        collectionNotApply: coupon.collectionNotApply || [],
        categoryNotApply: coupon.categoryNotApply || [],
        quantity: coupon.quantity || "",
        quantityMin: coupon.quantityMin || "",
        quantityMax: coupon.quantityMax || "",
        status: coupon.status || "",
      });
    }
    dispatch(resetState({ key: "statusGetById", value: "idle" }));
  }, [statusGetById, coupon, dispatch]);

  const autocompleteFields = [
    {
      name: "categoryApply",
      label: "Danh mục áp dụng",
      options: categoryOptions,
    },
    { name: "brandApply", label: "Thương hiệu áp dụng", options: brandOptions },
    {
      name: "collectionApply",
      label: "Bộ sưu tập áp dụng",
      options: collectionOptions,
    },
    {
      name: "productApply",
      label: "Sản phẩm áp dụng",
      options: productOptions,
    },
    {
      name: "categoryNotApply",
      label: "Danh mục không áp dụng",
      options: categoryOptions,
    },
    {
      name: "brandNotApply",
      label: "Thương hiệu không áp dụng",
      options: brandOptions,
    },
    {
      name: "collectionNotApply",
      label: "Bộ sưu tập không áp dụng",
      options: collectionOptions,
    },
    {
      name: "productNotApply",
      label: "Sản phẩm không áp dụng",
      options: productOptions,
    },
  ];

  const renderAutocompleteFields = autocompleteFields.map((field) => (
    <Grid item xs={12} md={3} key={field.name}>
      <Autocomplete
        multiple
        options={field.options}
        getOptionLabel={(option) => (option ? option.option : "")}
        value={formik.values[field.name]}
        onChange={(event, newValue) =>
          formik.setFieldValue(field.name, newValue)
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={field.label}
            placeholder={`Chọn ${field.label.toLowerCase()}`}
          />
        )}
        renderOption={(props, option) => (
          <li {...props} key={option.value}>
            {option.option}
          </li>
        )}
      />
    </Grid>
  ));

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box p={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                Cập nhật thông tin giảm giá
              </Typography>
              <Grid container spacing={2}>
                {/* Input Fields */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Tên giảm giá"
                    name="name"
                    fullWidth
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Mã giảm giá"
                    name="code"
                    fullWidth
                    value={formik.values.code}
                    onChange={formik.handleChange}
                    error={formik.touched.code && Boolean(formik.errors.code)}
                    helperText={formik.touched.code && formik.errors.code}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Số tiền giảm"
                    name="discount"
                    type="number"
                    fullWidth
                    value={formik.values.discount}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.discount && Boolean(formik.errors.discount)
                    }
                    helperText={
                      formik.touched.discount && formik.errors.discount
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    label="Loại giảm giá"
                    name="type"
                    fullWidth
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    SelectProps={{ native: true }}
                    error={formik.touched.type && Boolean(formik.errors.type)}
                    helperText={formik.touched.type && formik.errors.type}
                  >
                    <option value="fixed">Cố định</option>
                    <option value="percentage">Phần trăm</option>
                  </TextField>
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
                {/* Date Fields */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Ngày bắt đầu"
                    type="date"
                    name="startDate"
                    fullWidth
                    value={
                      formik.values.startDate
                        ? new Date(formik.values.startDate)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    onChange={formik.handleChange}
                    error={
                      formik.touched.startDate &&
                      Boolean(formik.errors.startDate)
                    }
                    helperText={
                      formik.touched.startDate && formik.errors.startDate
                    }
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Ngày kết thúc"
                    type="date"
                    name="endDate"
                    fullWidth
                    value={
                      formik.values.endDate
                        ? new Date(formik.values.endDate)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    onChange={formik.handleChange}
                    error={
                      formik.touched.endDate && Boolean(formik.errors.endDate)
                    }
                    helperText={formik.touched.endDate && formik.errors.endDate}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                {/* Quantity Fields */}
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Số lượng"
                    name="quantity"
                    type="number"
                    fullWidth
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.quantity && Boolean(formik.errors.quantity)
                    }
                    helperText={
                      formik.touched.quantity && formik.errors.quantity
                    }
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Số lượng tối thiểu"
                    name="quantityMin"
                    type="number"
                    fullWidth
                    value={formik.values.quantityMin}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.quantityMin &&
                      Boolean(formik.errors.quantityMin)
                    }
                    helperText={
                      formik.touched.quantityMin && formik.errors.quantityMin
                    }
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Số lượng tối đa"
                    name="quantityMax"
                    type="number"
                    fullWidth
                    value={formik.values.quantityMax}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.quantityMax &&
                      Boolean(formik.errors.quantityMax)
                    }
                    helperText={
                      formik.touched.quantityMax && formik.errors.quantityMax
                    }
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    select
                    label="Trạng thái"
                    name="status"
                    fullWidth
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    SelectProps={{ native: true }}
                  >
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Ngừng hoạt động</option>
                  </TextField>
                </Grid>
                {/* Autocomplete Fields */}
                {renderAutocompleteFields}
                {/* Actions */}
                <Box mt={3} textAlign="right">
                  <Button variant="contained" color="success" type="submit">
                    Cập nhật giảm giá
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => navigate("/dashboard/coupons")}
                    style={{ marginLeft: 10 }}
                  >
                    Hủy
                  </Button>
                </Box>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}

export default UpdateCoupons;
