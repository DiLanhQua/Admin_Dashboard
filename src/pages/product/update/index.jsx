import { Box, Button, Card, Grid, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import TabPanel, { a11yProps } from "../tags";
import InformationEdit from "./information";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, updateProduct } from "../../../redux/slices/product";
import { getAllWarehouses } from "../../../redux/slices/warehouse";
import OtherProductEdit from "./other";
import { getCategory } from "../../../redux/slices/category";
import { getBrand } from "../../../redux/slices/brand";
import { getAllCollections } from "../../../redux/slices/collection";
import { getAllTags } from "../../../redux/slices/tags";
import SEOInformation from "./SEOInformation";
import AttributesSection from "./attributes/AttributesSection";
import { getAttribute } from "../../../redux/slices/attribute";
import Specifications from "./Specifications";
import Gifts from "./Gifts";
import ThumbnailProduct from "./image/thumbnai";
import ImageProduct from "./image/images";
import VideosProduct from "./image/video";
import { handleToast } from "./../../../utils/toast";
import { validationProductSchema } from "./validate";

export default function EditProduct() {
  const dispatch = useDispatch();
  const [mainTabValue, setMainTabValue] = useState(0);

  const [dataProduct, setDataProduct] = useState([]);
  const [warehouseSelect, setWarehouseSelect] = useState([]);
  const [categorySelect, setCategorySelect] = useState([]);
  const [brandSelect, setBrandSelect] = useState([]);
  const [seriesSelect, setSeriesSelect] = useState([]);
  const [tagsSelect, setTagsSelect] = useState([]);
  const [attributesSelect, setAttributesSelect] = useState([]);
  const handleMainTabChange = (event, newValue) => setMainTabValue(newValue);

  const { id } = useParams();

  const statusGetById = useSelector((state) => state.product.statusGetById);
  const productData = useSelector((state) => state.product.data?.products);
  const statusWarehouse = useSelector((state) => state.warehouse.status);
  const dataWarehouse = useSelector((state) => state.warehouse.data.wareHouses);
  const statusGetCategory = useSelector((state) => state.category.status);
  const dataCategory = useSelector((state) => state.category.data);
  const statusBrand = useSelector((state) => state.brand.status);
  const dataBrand = useSelector((state) => state.brand.data);
  const statusSeries = useSelector((state) => state.collection.status);
  const dataSeries = useSelector((state) => state.collection.data);
  const statusTag = useSelector((state) => state.tag.status);
  const dataTag = useSelector((state) => state.tag.data.tags);
  const statusGetAttribute = useSelector((state) => state.attribute.status);
  const dataAttribute = useSelector((state) => state.attribute.data);
  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);
  useEffect(() => {
    dispatch(getAllWarehouses());
  }, [dispatch]);
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
    dispatch(getAllTags());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAttribute());
  }, [dispatch]);
  useEffect(() => {
    if (statusGetAttribute === "success") {
      const attributes = dataAttribute.map((item) => ({
        id: item._id,
        name: item.name,
        values: item.values.map((value) => ({
          name: value,
          value: value,
        })),
      }));
      setAttributesSelect(attributes);
    }
  }, [statusGetAttribute, dataAttribute]);
  useEffect(() => {
    if (statusGetById === "success" && productData) {
      setDataProduct(productData);
    }
  }, [statusGetById, productData]);

  useEffect(() => {
    if (statusWarehouse === "success") {
      const warehouses = dataWarehouse.map((item) => ({
        value: item._id,
        label: item.name,
      }));
      setWarehouseSelect(warehouses);
    }
  }, [statusWarehouse, dataWarehouse]);
  useEffect(() => {
    if (statusGetCategory === "success") {
      const categories = dataCategory.map((item) => ({
        value: item._id,
        label: item.name,
      }));
      setCategorySelect(categories);
    }
  }, [statusGetCategory, dataCategory]);
  useEffect(() => {
    if (statusBrand === "success") {
      const brands = dataBrand.map((item) => ({
        value: item._id,
        label: item.name,
      }));
      setBrandSelect(brands);
    }
  }, [statusBrand, dataBrand]);

  useEffect(() => {
    if (statusSeries === "succeeded") {
      const series = dataSeries.map((item) => ({
        value: item._id,
        label: item.name,
      }));
      setSeriesSelect(series);
    }
  }, [statusSeries, dataSeries]);

  useEffect(() => {
    if (statusTag === "succeeded") {
      const tags = dataTag.map((item) => ({
        value: item._id,
        label: item.name,
      }));
      setTagsSelect(tags);
    }
  }, [statusTag, dataTag]);
  useEffect(() => {
    if (statusGetById === "success" && productData) setDataProduct(productData);
  }, [statusGetById, productData]);
  const formik = useFormik({
    initialValues: {
      name: dataProduct[0]?.name || "",
      slug: dataProduct[0]?.slug || "",
      SKU: dataProduct[0]?.SKU || "",
      historicalPrice: dataProduct[0]?.historicalPrice || 0,
      priceInMarket: dataProduct[0]?.priceInMarket || 0,
      price: dataProduct[0]?.price || 0,
      discount: dataProduct[0]?.discount || 0,
      onStock: dataProduct[0]?.onStock || 0,
      inStock: dataProduct[0]?.inStock || 0,
      inComing: dataProduct[0]?.inComing || 0,
      unit: dataProduct[0]?.unit || "",
      minInventory: dataProduct[0]?.minInventory || 0,
      maxInventory: dataProduct[0]?.maxInventory || 0,
      weight: dataProduct[0]?.weight || 0,
      isBattery: dataProduct[0]?.isBattery || false,
      isStopSelling: dataProduct[0]?.isStopSelling || false,
      description: dataProduct[0]?.description || "",
      shortDescription: dataProduct[0]?.shortDescription || "",
      keywords: dataProduct[0]?.keywords || "",
      titleSEO: dataProduct[0]?.titleSEO || "",
      descriptionSEO: dataProduct[0]?.descriptionSEO || "",
      thumbnail: dataProduct[0]?.thumbnail || "",
      images: dataProduct[0]?.images || [],
      videos: dataProduct[0]?.videos || "",
      status: dataProduct[0]?.status || "",
      series: dataProduct[0]?.series || "",
      brand: dataProduct[0]?.brand || "",
      category: dataProduct[0]?.category || "",
      warehouse: dataProduct[0]?.warehouse || "",
      tagsProduct: dataProduct[0]?.tagsProduct || [],
      attributes: Array.isArray(dataProduct[0]?.attributes)
        ? dataProduct[0].attributes.map((attr) => ({
            aid: attr.aid || "",
            value: attr.value || "",
            SKU: attr.SKU || "",
            historicalPrice: attr.historicalPrice || 0,
            priceInMarket: attr.priceInMarket || 0,
            price: attr.price || 0,
            discount: attr.discount || 0,
            onStock: attr.onStock || 0,
            inStock: attr.inStock || 0,
            inComing: attr.inComing || 0,
            unit: attr.unit || "",
            minInventory: attr.minInventory || 0,
            maxInventory: attr.maxInventory || 0,
            images: attr.images || [],
          }))
        : [],
      specifications: [],
      gifts: [],
      views: 0,
    },
    validationSchema: validationProductSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(updateProduct({ productId: id, data: { values } })).then(
        (res) => {
          if (res.type === "product/updateProduct/fulfilled") {
            handleToast("success", "Cập nhật sản phẩm thành công");
          } else {
            handleToast("error", "Cập nhật sản phẩm thất bại");
          }
        }
      );
    },
  });

  return (
    <>
      <Card sx={{ mt: 1, p: 1 }}>
        <Tabs value={mainTabValue} onChange={handleMainTabChange}>
          <Tab label="Thông tin sản phẩm" {...a11yProps(0)} />
          <Tab label="Thông tin SEO" {...a11yProps(1)} />
          <Tab label="Biến thể" {...a11yProps(2)} />
        </Tabs>
      </Card>
      <form onSubmit={formik.handleSubmit}>
        <TabPanel value={mainTabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <InformationEdit
                formik={formik}
                warehouseSelect={warehouseSelect}
              />
            </Grid>
            <Grid item xs={12}>
              <OtherProductEdit
                formik={formik}
                brandSelect={brandSelect}
                seriesSelect={seriesSelect}
                categorySelect={categorySelect}
                tagsProduct={tagsSelect}
              />
            </Grid>
          </Grid>
          <Card sx={{ mt: 2, p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <ThumbnailProduct
                  formik={formik}
                  dataImage={formik.values.thumbnail}
                />
              </Grid>
              <Grid item xs={4}>
                <ImageProduct
                  formik={formik}
                  dataImage={formik.values.images}
                />
              </Grid>
              <Grid item xs={4}>
                <VideosProduct
                  formik={formik}
                  dataImage={formik.values.videos}
                />
              </Grid>
            </Grid>
          </Card>

          <Card sx={{ mt: 2, p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Specifications formik={formik} />
              </Grid>
            </Grid>
          </Card>
          <Card sx={{ mt: 2, p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Gifts formik={formik} />
              </Grid>
            </Grid>
          </Card>
        </TabPanel>

        <TabPanel value={mainTabValue} index={1}>
          <Card sx={{ mt: 2, p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <SEOInformation formik={formik} />
              </Grid>
            </Grid>
          </Card>
        </TabPanel>

        <TabPanel value={mainTabValue} index={2}>
          <Card sx={{ mt: 2, p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <AttributesSection
                  formik={formik}
                  attributesSelect={attributesSelect}
                />
              </Grid>
            </Grid>
          </Card>
        </TabPanel>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 2,
            p: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mr: 2 }}
          >
            Lưu sản phẩm
          </Button>
          <Button variant="contained" color="error">
            Hủy
          </Button>
        </Box>
      </form>
    </>
  );
}
