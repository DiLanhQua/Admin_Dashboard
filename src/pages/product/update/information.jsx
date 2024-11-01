import {
  Card,
  TextField,
  Typography,
  Grid,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import Textarea from "../../../components/textarea";

export default function InformationEdit({ formik, warehouseSelect }) {
  return (
    <>
      <Card sx={{ mt: 2, p: 3 }}>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h6">Thông tin sản phẩm</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Tên sản phẩm"
              fullWidth
              value={formik.values.name || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="name"
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Slug"
              fullWidth
              value={formik.values.slug || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="slug"
              error={formik.touched.slug && Boolean(formik.errors.slug)}
              helperText={formik.touched.slug && formik.errors.slug}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="SKU"
              fullWidth
              value={formik.values.SKU || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="SKU"
              error={formik.touched.SKU && Boolean(formik.errors.SKU)}
              helperText={formik.touched.SKU && formik.errors.SKU}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Trọng lượng"
              fullWidth
              value={formik.values.weight || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="weight"
              error={formik.touched.weight && Boolean(formik.errors.weight)}
              helperText={formik.touched.weight && formik.errors.weight}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Đơn vị"
              fullWidth
              value={formik.values.unit || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="unit"
              error={formik.touched.unit && Boolean(formik.errors.unit)}
              helperText={formik.touched.unit && formik.errors.unit}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Số lượng tồn kho"
              fullWidth
              value={formik.values.inStock || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="inStock"
              error={formik.touched.inStock && Boolean(formik.errors.inStock)}
              helperText={formik.touched.inStock && formik.errors.inStock}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Số lượng hàng đang về"
              fullWidth
              value={formik.values.inComing || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="inComing"
              error={formik.touched.inComing && Boolean(formik.errors.inComing)}
              helperText={formik.touched.inComing && formik.errors.inComing}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Số lượng có thể bán"
              fullWidth
              value={formik.values.onStock || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="onStock"
              error={formik.touched.onStock && Boolean(formik.errors.onStock)}
              helperText={formik.touched.onStock && formik.errors.onStock}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Số lượng tối thiểu"
              fullWidth
              value={formik.values.minInventory || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="minInventory"
              error={
                formik.touched.minInventory &&
                Boolean(formik.errors.minInventory)
              }
              helperText={
                formik.touched.minInventory && formik.errors.minInventory
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Số lượng tối đa"
              fullWidth
              value={formik.values.maxInventory || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="maxInventory"
              error={
                formik.touched.maxInventory &&
                Boolean(formik.errors.maxInventory)
              }
              helperText={
                formik.touched.maxInventory && formik.errors.maxInventory
              }
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              {formik.touched.warehouse && Boolean(formik.errors.warehouse) ? (
                <InputLabel error id="warehouse-label">
                  Kho
                </InputLabel>
              ) : (
                <InputLabel id="warehouse-label">Kho</InputLabel>
              )}
              <Select
                labelId="warehouse-label"
                label="Kho"
                value={formik.values.warehouse || ""}
                onChange={formik.handleChange}
                name="warehouse"
                error={
                  formik.touched.warehouse && Boolean(formik.errors.warehouse)
                }
              >
                {warehouseSelect.map((warehouse) => (
                  <MenuItem key={warehouse.value} value={warehouse.value}>
                    {warehouse.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error>
                {formik.touched.warehouse && formik.errors.warehouse}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.isBattery}
                  onChange={formik.handleChange}
                />
              }
              label="Có pin"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.isStopSelling}
                  onChange={formik.handleChange}
                />
              }
              label="Ngừng bán"
            />
          </Grid>
        </Grid>
      </Card>

      <Card sx={{ mt: 2, p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Giá sản phẩm</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Giá gốc"
              fullWidth
              value={formik.values.historicalPrice || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="historicalPrice"
              InputProps={{
                endAdornment: <InputAdornment position="end">đ</InputAdornment>,
              }}
              error={
                formik.touched.historicalPrice &&
                Boolean(formik.errors.historicalPrice)
              }
              helperText={
                formik.touched.historicalPrice && formik.errors.historicalPrice
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Giá thị trường"
              fullWidth
              value={formik.values.priceInMarket || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="priceInMarket"
              InputProps={{
                endAdornment: <InputAdornment position="end">đ</InputAdornment>,
              }}
              error={
                formik.touched.priceInMarket &&
                Boolean(formik.errors.priceInMarket)
              }
              helperText={
                formik.touched.priceInMarket && formik.errors.priceInMarket
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Giá"
              fullWidth
              value={formik.values.price || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="price"
              InputProps={{
                endAdornment: <InputAdornment position="end">đ</InputAdornment>,
              }}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
          </Grid>
        </Grid>
      </Card>

      <Card sx={{ mt: 2, p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Textarea
              label="Mô tả ngắn"
              name="shortDescription"
              value={formik.values.shortDescription || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>
          <Grid item xs={6}>
            <Textarea
              name="description"
              label="Mô tả sản phẩm"
              value={formik.values.description || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
