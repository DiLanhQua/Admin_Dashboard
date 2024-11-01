/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Button,
  Typography,
  Select,
  MenuItem,
  Input,
  Tabs,
  Tab,
  Box,
  IconButton,
  Badge,
} from "@mui/material";
import formatCurrency from "../../../config/formatCurrency";

export default function ProductDetailsDialog({
  product,
  handleAddToCart,
  selectedColor,
  setSelectedColor,
  quantity,
  setQuantity,
  selectedSize,
  setSelectedSize,
  tabValue,
  handleTabChange,
  open,
  onClose, // controls opening and closing the dialog
}) {
  // State to track the currently displayed image
  const [selectedImage, setSelectedImage] = useState("");

  // Set the first image as the default selected image
  useEffect(() => {
    if (product?.images?.length) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogContent>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <div
              style={{
                width: "17rem",
                height: "17rem",
              }}
            >
              <img
                src={selectedImage}
                alt="Selected Product Image"
                style={{
                  objectFit: "contain",
                  marginBottom: 5,
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>

            <Grid container spacing={2}>
              {product?.images?.map((img, index) => (
                <Grid item xs={3} key={index}>
                  <div
                    style={{
                      width: "3.5rem",
                      height: "3.5rem",
                    }}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      style={{
                        marginTop: 10,
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                        objectFit: "cover",
                        borderBottom:
                          selectedImage === img ? "4px solid #66adff" : "none",
                      }}
                      onClick={() => setSelectedImage(img)}
                    />
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={8} sx={{ mt: 2 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {product?.name}
            </Typography>
            <Typography variant="h4" color="primary" gutterBottom>
              {formatCurrency(product?.priceOnline, "VND", "vi-VN")}
            </Typography>

            {/* Colors */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography variant="body1" fontWeight="bold" sx={{ mr: 2 }}>
                Màu sắc:
              </Typography>
              {product?.colors?.map((color, index) => (
                <IconButton
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  sx={{
                    backgroundColor: color,
                    border:
                      selectedColor === color ? "2px solid black" : "none",
                    width: 24,
                    height: 24,
                    marginRight: 1,
                  }}
                />
              ))}
            </Box>

            {/* Size Selector */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography variant="body1" fontWeight="bold">
                kích cỡ:
              </Typography>
              <Select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                sx={{ minWidth: 100, ml: 3 }}
              >
                {product?.sizes?.map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            {/* Quantity Selector */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography variant="body1" fontWeight="bold">
                Số lượng :
              </Typography>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                inputProps={{ min: 1, max: product?.onStock }}
                sx={{ width: 60, ml: 2, mr: 2 }}
              />
              <Typography variant="body2">
                Có sẵn : {product?.onStock}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
                sx={{ ml: "auto" }}
              >
                Thêm vào giỏ hàng
              </Button>
            </Box>

            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="product details tabs"
            >
              <Tab label="Mô tả" />
              <Tab label="ĐÁNH GIÁ" />
            </Tabs>

            <Box sx={{ p: 3 }}>
              {tabValue === 0 && (
                <div>
                  <Typography variant="body1">
                    {product?.description}
                  </Typography>

                  <Typography variant="body2">{product?.materials}</Typography>
                </div>
              )}
              {tabValue === 1 && (
                <Typography variant="body1">No reviews yet.</Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
