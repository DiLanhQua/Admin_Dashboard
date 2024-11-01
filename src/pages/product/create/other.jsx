/* eslint-disable react/prop-types */
import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

export default function OtherProduct({
  productData,
  handleInputChange,
  brandSelect,
  seriesSelect,
  categorySelect,
  tagsProduct,
  isSubmitted,
}) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormControl fullWidth>
          {isSubmitted &&
          !productData.category &&
          "Danh mục không được để trống" ? (
            <InputLabel error id="category">
              Danh mục
            </InputLabel>
          ) : (
            <InputLabel id="category">Danh mục</InputLabel>
          )}
          <Select
            labelId="category"
            value={productData.category}
            label="Danh mục"
            onChange={(e) => handleInputChange("category", e.target.value)}
            error={isSubmitted && !productData.category}
          >
            {categorySelect.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error>
            {isSubmitted &&
              !productData.category &&
              "Danh mục không được để trống"}
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          {isSubmitted &&
          !productData.brand &&
          "Thương hiệu không được để trống" ? (
            <InputLabel error id="brand">
              Thương hiệu
            </InputLabel>
          ) : (
            <InputLabel id="brand">Thương hiệu</InputLabel>
          )}
          <Select
            labelId="brand"
            value={productData.brand}
            label="Thương hiệu"
            onChange={(e) => handleInputChange("brand", e.target.value)}
            error={isSubmitted && !productData.brand}
          >
            {brandSelect.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error>
            {isSubmitted &&
              !productData.brand &&
              "Thương hiệu không được để trống"}
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          {isSubmitted &&
          !productData.series &&
          "Dòng sản phẩm không được để trống" ? (
            <InputLabel error id="series">
              Dòng sản phẩm
            </InputLabel>
          ) : (
            <InputLabel id="series">Dòng sản phẩm</InputLabel>
          )}
          <Select
            labelId="series"
            value={productData.series}
            label="Dòng sản phẩm"
            onChange={(e) => handleInputChange("series", e.target.value)}
            error={isSubmitted && !productData.series}
          >
            {seriesSelect.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error>
            {isSubmitted &&
              !productData.series &&
              "Dòng sản phẩm không được để trống"}
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <Autocomplete
            multiple
            options={tagsProduct}
            getOptionLabel={(option) => option.label}
            value={productData.tagsProduct
              .map((tag, index) => {
                const foundTag = tagsProduct.find((item) => item.value === tag);
                return foundTag ? { ...foundTag, key: index } : null;
              })
              .filter(Boolean)}
            onChange={(event, newValue) => {
              const values = newValue.map((item) => item.value);
              handleInputChange("tagsProduct", values);
            }}
            renderInput={(params) => <TextField {...params} label="Tags" />}
            renderOption={(props, option, { selected }) => {
              const { key, ...rest } = props;
              return (
                <li key={key} {...rest}>
                  <Checkbox checked={selected} style={{ marginRight: 8 }} />
                  {option.label}
                </li>
              );
            }}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}
