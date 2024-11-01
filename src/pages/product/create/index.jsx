/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Button, Tabs, Tab, Card, Typography, Box } from "@mui/material";
import TabPanel, { a11yProps } from "../tags";
import Information from "./information";
import SEOInformation from "./SEOInformation";
import AttributesSection from "./attributes/AttributesSection";
import { Grid } from "@mui/material";
import ImagesProduct from "./image/images";
import VideoProduct from "./image/video";
import ThumbnailProduct from "./image/thumbnail";
import OtherProduct from "./other";
import Specifications from "./specifications";
import Gifts from "./gifts";
import { useDispatch, useSelector } from "react-redux";
import { getAttribute } from "../../../redux/slices/attribute";
import { getCategory } from "../../../redux/slices/category";
import { getBrand } from "../../../redux/slices/brand";
import { getAllCollections } from "../../../redux/slices/collection";
import { getAllTags as getTags } from "../../../redux/slices/tags";
import { getAllWarehouses } from "../../../redux/slices/warehouse";
import { createProduct } from "../../../redux/slices/product";
import { handleToast } from "./../../../utils/toast";

export default function CreateProduct() {
  const dispatch = useDispatch();
  const [mainTabValue, setMainTabValue] = useState(0);
  const [subTabValue, setSubTabValue] = useState(0);
  const [subTabValue2, setSubTabValue2] = useState(0);
  const [categorySelect, setCategorySelect] = useState([]);
  const [brandSelect, setBrandSelect] = useState([]);
  const [seriesSelect, setSeriesSelect] = useState([]);
  const [tagsSelect, setTagsSelect] = useState([]);
  const [warehouseSelect, setWarehouseSelect] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleMainTabChange = (event, newValue) => setMainTabValue(newValue);
  const handleSubTabChange = (event, newValue) => setSubTabValue(newValue);
  const handleSubTabChange2 = (event, newValue) => setSubTabValue2(newValue);

  const [attributesSelect, setAttributesSelect] = useState([]);
  const statusGetAttribute = useSelector((state) => state.attribute.status);
  const dataAttribute = useSelector((state) => state.attribute.data);
  useEffect(() => {
    dispatch(getAttribute());
  }, [dispatch]);

  const [productData, setProductData] = useState({
    name: "",
    slug: "",
    SKU: "",
    historicalPrice: "",
    priceInMarket: "",
    price: "",
    discount: "",
    onStock: "",
    inStock: "",
    inComing: "",
    unit: "",
    minInventory: "",
    maxInventory: "",
    weight: "",
    isBattery: false,
    isStopSelling: false,
    description: "",
    shortDescription: "",
    keywords: "",
    titleSEO: "",
    descriptionSEO: "",
    thumbnail: "",
    images: "",
    videos: "",
    status: "available",
    series: "",
    brand: "",
    category: "",
    warehouse: "",
    tagsProduct: [],
    attributes: [],
    specifications: [],
    gifts: [],
    views: 0,
  });

  const [attributeData, setAttributeData] = useState({
    aid: "",
    value: "",
    SKU: "",
    historicalPrice: "",
    priceInMarket: "",
    price: "",
    discount: "",
    onStock: "", // hàng có thể bán
    inStock: "", // hàng tồn kho
    inComing: "", // hàng đang về
    unit: "",
    minInventory: "",
    maxInventory: "",
    images: "",
  });

  useEffect(() => {
    if (statusGetAttribute === "success") {
      const attributes = dataAttribute.map((item) => ({
        id: item._id,
        name: item.name,
        values: item.values.map((value) => ({
          name: value,
          value: value, // Thêm giá trị để sử dụng trong Select
        })),
      }));
      setAttributesSelect(attributes);
    }
  }, [dataAttribute, statusGetAttribute]);

  const handleInputChange = (field, value) => {
    setProductData({ ...productData, [field]: value });
  };

  const handleAttributeChange = (field, value) =>
    setAttributeData({ ...attributeData, [field]: value });

  const handleUploadThumbnail = (url) =>
    setProductData({ ...productData, thumbnail: url });

  const handleUploadImages = (url) => {
    setProductData((prevData) => ({
      ...prevData,
      images: url,
    }));
  };

  const handleUploadVideo = (url) =>
    setProductData({ ...productData, videos: url });

  const handleAddAttribute = () => {
    setProductData({
      ...productData,
      attributes: [...productData.attributes, attributeData],
    });
    setAttributeData({
      aid: "",
      value: "",
      SKU: "",
      historicalPrice: "",
      priceInMarket: "",
      price: "",
      discount: "",
      onStock: "", // hàng có thể bán
      inStock: "", // hàng tồn kho
      inComing: "", // hàng đang về
      unit: "",
      minInventory: "",
      maxInventory: "",
      images: "",
    });
  };

  // Lưu sản phẩm
  const handleSaveProduct = () => {
    setIsSubmitted(true);
    if (
      !productData ||
      !productData.name ||
      !productData.category ||
      !productData.brand ||
      !productData.series ||
      !productData.warehouse
    ) {
      handleToast("error", "Vui lòng nhập thông tin sản phẩm");
      return;
    }
    dispatch(createProduct(productData)).then((result) => {
      if (result.type === "product/createProduct/fulfilled") {
        handleToast("success", "Thêm sản phẩm thành công");
      } else {
        handleToast("error", "Thêm sản phẩm thất bại");
      }
    });
  };

  const handleDeleteAttribute = (index) => {
    setProductData({
      ...productData,
      attributes: productData.attributes.filter((_, i) => i !== index),
    });
  };

  const handleUploadImagesAttribute = (url) => {
    setAttributeData((prevData) => ({
      ...prevData,
      images: Array.isArray(prevData.images)
        ? { ...prevData.images, url }
        : url,
    }));
  };
  const handleDeleteImagesAttribute = (index) => {
    setAttributeData((prevData) => ({
      ...prevData,
      images: Array.isArray(prevData.images)
        ? prevData.images.filter((_, i) => i !== index)
        : [],
    }));
  };

  const handleEditAttribute = (index) => {
    const attribute = productData.attributes[index];
    setAttributeData({
      aid: attribute.aid,
      value: attribute.value,
      SKU: attribute.SKU,
      historicalPrice: attribute.historicalPrice,
      priceInMarket: attribute.priceInMarket,
      price: attribute.price,
      discount: attribute.discount,
      onStock: attribute.onStock,
      inStock: attribute.inStock,
      inComing: attribute.inComing,
      unit: attribute.unit,
      minInventory: attribute.minInventory,
      maxInventory: attribute.maxInventory,
      images: Array.isArray(attribute.images) ? attribute.images : [], // Ensure images is an array
    });
  };
  const statusGetCategory = useSelector((state) => state.category.status);
  const dataCategory = useSelector((state) => state.category.data);
  const statusBrand = useSelector((state) => state.brand.status);
  const dataBrand = useSelector((state) => state.brand.data);
  const statusSeries = useSelector((state) => state.collection.status);
  const dataSeries = useSelector((state) => state.collection.data);
  const statusTag = useSelector((state) => state.tag.status);
  const dataTag = useSelector((state) => state.tag.data.tags);
  const statusWarehouse = useSelector((state) => state.warehouse.status);
  const dataWarehouse = useSelector((state) => state.warehouse.data.wareHouses);
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
    dispatch(getTags());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllWarehouses());
  }, [dispatch]);

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
    if (statusWarehouse === "success") {
      const warehouses = dataWarehouse.map((item) => ({
        value: item._id,
        label: item.name,
      }));
      setWarehouseSelect(warehouses);
    }
  }, [statusWarehouse, dataWarehouse]);

  return (
    <>
      <Card sx={{ mt: 2, p: 3 }}>
        <Tabs value={mainTabValue} onChange={handleMainTabChange}>
          <Tab label="Thông tin sản phẩm" {...a11yProps(0)} />
          <Tab label="Thông tin SEO" {...a11yProps(1)} />
          <Tab label="Biến thể" {...a11yProps(2)} />
        </Tabs>
      </Card>

      <TabPanel value={mainTabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Information
              productData={productData}
              handleInputChange={handleInputChange}
              warehouseSelect={warehouseSelect}
              isSubmitted={isSubmitted}
            />
          </Grid>
        </Grid>
        <Card sx={{ mt: 2, p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography sx={{ mb: 2 }} variant="h6">
                Thông tin danh mục
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <OtherProduct
                productData={productData}
                handleInputChange={handleInputChange}
                categorySelect={categorySelect}
                brandSelect={brandSelect}
                seriesSelect={seriesSelect}
                tagsProduct={tagsSelect}
                isSubmitted={isSubmitted}
              />
            </Grid>
          </Grid>
        </Card>

        <Card sx={{ mt: 2, p: 3 }}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs={12}>
              <Typography sx={{ mb: 2 }} variant="h6">
                hình ảnh và thông số
              </Typography>
            </Grid>

            <Grid item xs={1}>
              <Tabs
                value={subTabValue}
                onChange={handleSubTabChange}
                orientation="vertical"
                aria-label="Tabs phụ dọc"
                sx={{ borderRight: 1, borderColor: "divider" }}
              >
                <Tab label="Hình và video" {...a11yProps(0)} />
                <Tab label="Thông số" {...a11yProps(1)} />
                <Tab label="Khác" {...a11yProps(2)} />
              </Tabs>
            </Grid>

            <Grid item xs={11}>
              <TabPanel value={subTabValue} index={0}>
                <Tabs
                  value={subTabValue2}
                  onChange={handleSubTabChange2}
                  orientation="horizontal"
                  aria-label="Tabs phụ dọc"
                  centered
                >
                  <Tab label="hình" {...a11yProps(0)} />
                  <Tab label="video" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={subTabValue2} index={0}>
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={6}>
                      <ThumbnailProduct
                        handleUploadThumbnail={handleUploadThumbnail}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="h6"
                        sx={{
                          alignItems: "center",
                          justifyContent: "center",
                          display: "flex",
                        }}
                      >
                        Hình ảnh
                      </Typography>
                      <ImagesProduct
                        handleUploadImages={handleUploadImages}
                        onDelete={(index) => {
                          const newImages = [...productData.images];
                          newImages.splice(index, 1);
                          setProductData({
                            ...productData,
                            images: newImages,
                          });
                        }}
                      />
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={subTabValue2} index={1}>
                  <Grid sx={{ mt: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      Video
                    </Typography>
                    <VideoProduct
                      handleUploadVideo={handleUploadVideo}
                      onDelete={(index) => {
                        const newVideos = [...productData.videos];
                        newVideos.splice(index, 1);
                        setProductData({
                          ...productData,
                          videos: newVideos,
                        });
                      }}
                    />
                  </Grid>
                </TabPanel>
              </TabPanel>
              <TabPanel value={subTabValue} index={1}>
                <Specifications
                  productData={productData}
                  handleInputChange={handleInputChange}
                />
              </TabPanel>
              <TabPanel value={subTabValue} index={2}>
                <Gifts
                  productData={productData}
                  handleInputChange={handleInputChange}
                />
              </TabPanel>
            </Grid>
          </Grid>
        </Card>
      </TabPanel>

      <TabPanel value={mainTabValue} index={1}>
        <Card sx={{ mt: 2, p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">Thông tin Seo</Typography>
            </Grid>
            <Grid item xs={12}>
              <SEOInformation
                productData={productData}
                handleInputChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </Card>
      </TabPanel>

      <TabPanel value={mainTabValue} index={2}>
        <Card sx={{ mt: 2, p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">Biến thể</Typography>
            </Grid>
            <Grid item xs={12}>
              <AttributesSection
                attributeData={attributeData}
                productData={productData}
                handleAttributeChange={handleAttributeChange}
                handleAddAttribute={handleAddAttribute}
                handleDeleteAttribute={handleDeleteAttribute}
                handleEditAttribute={handleEditAttribute}
                attributesSelect={attributesSelect}
                handleUploadImagesAttribute={handleUploadImagesAttribute}
                handleDeleteImagesAttribute={handleDeleteImagesAttribute}
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
          onClick={handleSaveProduct}
          sx={{ mr: 2 }}
        >
          Lưu sản phẩm
        </Button>
        <Button variant="contained" color="error">
          Hủy
        </Button>
      </Box>
    </>
  );
}
