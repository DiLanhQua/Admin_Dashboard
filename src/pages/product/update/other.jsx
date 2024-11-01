/* eslint-disable react/prop-types */
import {
  Autocomplete,
  Card,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";

export default function OtherProductEdit({
  formik,
  brandSelect,
  seriesSelect,
  categorySelect,
  tagsProduct,
}) {
  return (
    <Card sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Thông tin danh mục</Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            {formik.touched.category && Boolean(formik.errors.category) ? (
              <InputLabel error id="category">
                Danh mục
              </InputLabel>
            ) : (
              <InputLabel id="category">Danh mục</InputLabel>
            )}
            <Select
              labelId="category"
              value={formik.values.category}
              label="Danh mục"
              onChange={formik.handleChange}
              name="category"
              onBlur={formik.handleBlur}
              error={formik.touched.category && Boolean(formik.errors.category)}
            >
              {categorySelect.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error>
              {formik.touched.category && formik.errors.category}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            {formik.touched.warehouse && Boolean(formik.errors.warehouse) ? (
              <InputLabel error id="warehouse">
                Kho
              </InputLabel>
            ) : (
              <InputLabel id="warehouse">Kho</InputLabel>
            )}
            <Select
              labelId="brand"
              value={formik.values.brand}
              label="Thương hiệu"
              onChange={formik.handleChange}
              name="brand"
              onBlur={formik.handleBlur}
              error={formik.touched.brand && Boolean(formik.errors.brand)}
            >
              {brandSelect.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error>
              {formik.touched.brand && formik.errors.brand}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            {formik.touched.series && Boolean(formik.errors.series) ? (
              <InputLabel error id="series">
                Dòng sản phẩm
              </InputLabel>
            ) : (
              <InputLabel id="series">Dòng sản phẩm</InputLabel>
            )}
            <Select
              labelId="series"
              value={formik.values.series}
              label="Dòng sản phẩm"
              onChange={formik.handleChange}
              name="series"
              error={formik.touched.series && Boolean(formik.errors.series)}
            >
              {seriesSelect.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error>
              {formik.touched.series && formik.errors.series}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <Autocomplete
              multiple
              options={tagsProduct}
              getOptionLabel={(option) => option.label}
              value={formik.values.tagsProduct
                .map((tag, index) => {
                  const foundTag = tagsProduct.find(
                    (item) => item.value === tag
                  );
                  return foundTag ? { ...foundTag, key: index } : null;
                })
                .filter(Boolean)}
              onChange={(event, newValue) => {
                const values = newValue.map((item) => item.value);
                formik.setFieldValue("tagsProduct", values);
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
    </Card>
  );
}
