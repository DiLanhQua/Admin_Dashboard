/* eslint-disable react/prop-types */
import { TextField, Grid, InputAdornment } from "@mui/material";

export default function PriceProduct({
  productData,
  handleInputChange,
  isSubmitted,
}) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <TextField
          label="Giá gốc"
          fullWidth
          value={productData.historicalPrice}
          onChange={(e) => handleInputChange("historicalPrice", e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="end">đ</InputAdornment>,
          }}
          error={isSubmitted && !productData.historicalPrice}
          helperText={
            isSubmitted &&
            !productData.historicalPrice &&
            "Giá gốc không được để trống"
          }
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Giá thị trường"
          fullWidth
          value={productData.priceInMarket}
          onChange={(e) => handleInputChange("priceInMarket", e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="end">đ</InputAdornment>,
          }}
          error={isSubmitted && !productData.priceInMarket}
          helperText={
            isSubmitted &&
            !productData.priceInMarket &&
            "Giá thị trường không được để trống"
          }
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Giá"
          fullWidth
          value={productData.price}
          onChange={(e) => handleInputChange("price", e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="end">đ</InputAdornment>,
          }}
          error={isSubmitted && !productData.price}
          helperText={
            isSubmitted && !productData.price && "Giá không được để trống"
          }
        />
      </Grid>
    </Grid>
  );
}
