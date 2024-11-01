/* eslint-disable react/prop-types */
import {
  Grid,
  TextField,
  Button,
  Typography,
  TableRow,
  TableCell,
  Collapse,
  IconButton,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
  AvatarGroup,
  Avatar,
  InputAdornment,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ImageProductAttributes from "./images";

export default function AttributesSection({ formik, attributesSelect }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState();

  const handleToggleExpand = (index) =>
    setExpandedIndex(expandedIndex === index ? null : index);

  const handleSaveEdit = () => {
    const updatedAttributes = [...formik.values.attributes];
    updatedAttributes[editingIndex] = {
      ...updatedAttributes[editingIndex],
      ...formik.values,
    };
    formik.setFieldValue(updatedAttributes);
    setEditingIndex(null);
  };

  const handleAddAttribute = () => {
    const newAttribute = {
      aid: "",
      value: "",
      SKU: "",
      historicalPrice: 0,
      priceInMarket: 0,
      price: 0,
      discount: 0,
      onStock: 0,
      inStock: 0,
      inComing: 0,
      unit: "",
      minInventory: 0,
      maxInventory: 0,
      images: [],
    };

    formik.setFieldValue("attributes", [
      ...formik.values.attributes,
      newAttribute,
    ]);
  };

  const handleEditAttribute = (index) => {
    setEditingIndex(index);

    // Retrieve the attribute to be edited
    const attributeToEdit = formik.values.attributes[index];

    // Update only the specific attribute in the form state
    formik.setFieldValue(
      "attributes",
      formik.values.attributes.map((attr, i) =>
        i === index ? { ...attr, ...attributeToEdit } : attr
      )
    );
  };

  const handleDeleteAttribute = (index) => {
    const updatedAttributes = formik.values.attributes.filter(
      (attr, i) => i !== index
    );
    formik.setFieldValue("attributes", updatedAttributes);
  };

  const handleUploadImages = (images) => {
    const updatedAttributes = [...formik.values.attributes];
    updatedAttributes[editingIndex] = {
      ...updatedAttributes[editingIndex],
      images: images, // Cập nhật danh sách ảnh
    };
    formik.setFieldValue("attributes", updatedAttributes); // Cập nhật "attributes"
  };

  const handleDeleteImagesAttribute = (index) => {
    formik.setFieldValue((prevData) => {
      const updatedAttributes = [...prevData.attributes];
      updatedAttributes[editingIndex].images = updatedAttributes[
        editingIndex
      ].images.filter((img, i) => i !== index);
      return { ...prevData, attributes: updatedAttributes };
    });
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="aid">Thuộc tính</InputLabel>
            <Select
              id="aid"
              label="Thuộc tính"
              fullWidth
              value={formik.values.attributes[editingIndex]?.aid || ""}
              onChange={formik.handleChange}
              name={`attributes[${editingIndex}].aid`}
            >
              {attributesSelect?.map((item, i) => (
                <MenuItem key={i} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="value">Giá trị</InputLabel>
            <Select
              id="value"
              label="Giá trị"
              fullWidth
              value={formik.values.attributes[editingIndex]?.value || ""}
              onChange={formik.handleChange}
              name={`attributes[${editingIndex}].value`}
            >
              {attributesSelect
                .find(
                  (attr) =>
                    attr.id === formik.values.attributes[editingIndex]?.aid
                )
                ?.values.map((value) => (
                  <MenuItem key={value.value} value={value.value}>
                    <div
                      style={{
                        background: value.value,
                        width: "100%",
                      }}
                    >
                      {value.value}
                    </div>
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <TextField
            label="SKU"
            fullWidth
            value={formik.values.attributes[editingIndex]?.SKU || ""}
            onChange={formik.handleChange}
            name={`attributes[${editingIndex}].SKU`}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            label="Giá gốc (thuộc tính)"
            fullWidth
            type="number"
            value={formik.values.attributes[editingIndex]?.historicalPrice || 0}
            onChange={formik.handleChange}
            name={`attributes[${editingIndex}].historicalPrice`}
            InputProps={{
              endAdornment: <InputAdornment position="end">đ</InputAdornment>,
            }}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            label="Giá thị trường (thuộc tính)"
            fullWidth
            type="number"
            value={formik.values.attributes[editingIndex]?.priceInMarket || 0}
            onChange={formik.handleChange}
            name={`attributes[${editingIndex}].priceInMarket`}
            InputProps={{
              endAdornment: <InputAdornment position="end">đ</InputAdornment>,
            }}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            label="Giá (thuộc tính)"
            fullWidth
            type="number"
            value={formik.values.attributes[editingIndex]?.price || 0}
            onChange={formik.handleChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">đ</InputAdornment>,
            }}
            name={`attributes[${editingIndex}].price`}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            label="Giảm giá (thuộc tính)"
            fullWidth
            type="number"
            value={formik.values.attributes[editingIndex]?.discount || 0}
            onChange={formik.handleChange}
            name={`attributes[${editingIndex}].discount`}
            InputProps={{
              endAdornment: <InputAdornment position="end">đ</InputAdornment>,
            }}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            label="Số lượng tồn kho (thuộc tính)"
            fullWidth
            type="number"
            value={formik.values.attributes[editingIndex]?.inStock || 0}
            onChange={formik.handleChange}
            name={`attributes[${editingIndex}].inStock`}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            label="Số lượng có thể bán (thuộc tính)"
            fullWidth
            type="number"
            name={`attributes[${editingIndex}].onStock`}
            value={formik.values.attributes[editingIndex]?.onStock || 0}
            onChange={formik.handleChange}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            label="Số lượng hàng đang về (thuộc tính)"
            fullWidth
            type="number"
            value={formik.values.attributes[editingIndex]?.inComing || 0}
            onChange={formik.handleChange}
            name={`attributes[${editingIndex}].inComing`}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            label="Đơn vị (thuộc tính)"
            fullWidth
            type="text"
            value={formik.values.attributes[editingIndex]?.unit || ""}
            onChange={formik.handleChange}
            name={`attributes[${editingIndex}].unit`}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            label="Số lượng tối thiểu (thuộc tính)"
            fullWidth
            type="number"
            value={formik.values.attributes[editingIndex]?.minInventory || 0}
            onChange={formik.handleChange}
            name={`attributes[${editingIndex}].minInventory`}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            label="Số lượng tối đa (thuộc tính)"
            fullWidth
            type="number"
            name={`attributes[${editingIndex}].maxInventory`}
            value={formik.values.attributes[editingIndex]?.maxInventory || 0}
            onChange={formik.handleChange}
          />
        </Grid>

        <Grid item xs={6}>
          <ImageProductAttributes
            handleUploadImages={(images) => handleUploadImages(images)}
            onDelete={(index) => handleDeleteImagesAttribute(index)}
            images={formik.values.attributes[editingIndex]?.images || []}
            idUpload={formik.values.attributes[editingIndex]?.aid || ""}
          />
        </Grid>
      </Grid>

      {editingIndex !== null ? (
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveEdit}
          style={{ marginTop: "20px" }}
        >
          Lưu chỉnh sửa
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddAttribute}
          style={{ marginTop: "20px" }}
        >
          Thêm thuộc tính
        </Button>
      )}

      <div>
        <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
          Thuộc tính đã thêm:
        </Typography>
        {formik.values.attributes.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Giá trị</TableCell>
                  <TableCell>SKU</TableCell>
                  <TableCell>Giá lịch sử</TableCell>
                  <TableCell>Giá thị trường</TableCell>
                  <TableCell>Giá</TableCell>
                  <TableCell>Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formik.values?.attributes?.map((attr, index) => (
                  <React.Fragment key={index}>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>{attr.value}</TableCell>
                      <TableCell>{attr.SKU}</TableCell>
                      <TableCell>{attr.historicalPrice}</TableCell>
                      <TableCell>{attr.priceInMarket}</TableCell>
                      <TableCell>{attr.price}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleToggleExpand(index)}>
                          <ExpandMoreIcon
                            style={{
                              transform:
                                expandedIndex === index
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                              transition: "transform 0.3s",
                            }}
                          />
                        </IconButton>
                        <Tooltip title="Chỉnh sửa biến thể">
                          <IconButton
                            sx={{ color: "blue", padding: "4px" }}
                            onClick={() => handleEditAttribute(index)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Xóa biến thể">
                          <IconButton
                            sx={{ color: "red", padding: "4px" }}
                            onClick={() => handleDeleteAttribute(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>

                    {/* Đoạn Collapse bọc trong một TableRow riêng */}
                    <TableRow>
                      <TableCell colSpan={7}>
                        <Collapse
                          in={expandedIndex === index}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Grid
                            container
                            spacing={2}
                            style={{ padding: "10px" }}
                          >
                            <Grid item xs={3}>
                              <Typography variant="subtitle1">
                                Số lượng tồn kho: {attr.inStock}
                              </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography variant="subtitle1">
                                Số lượng có thể bán: {attr.onStock}
                              </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography variant="subtitle1">
                                Số lượng hàng đang về: {attr.inComing}
                              </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography variant="subtitle1">
                                Đơn vị: {attr.unit}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              {attr.images && attr.images.length > 0 && (
                                <Typography variant="subtitle1">
                                  Hình ảnh:
                                </Typography>
                              )}
                              <AvatarGroup max={4}>
                                {attr.images &&
                                  attr.images.map((img, i) => (
                                    <Avatar
                                      key={i}
                                      src={img}
                                      sx={{ width: 50, height: 50 }}
                                    />
                                  ))}
                              </AvatarGroup>
                            </Grid>
                          </Grid>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography> không có thuộc tính nào được thêm.</Typography>
        )}
      </div>
    </>
  );
}
