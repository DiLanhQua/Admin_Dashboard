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

export default function AttributesSection({
  attributeData,
  productData,
  handleAttributeChange,
  handleAddAttribute,
  handleDeleteAttribute,
  handleEditAttribute,
  attributesSelect,
  handleUploadImagesAttribute,
  handleDeleteImagesAttribute,
}) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleToggleExpand = (index) =>
    setExpandedIndex(expandedIndex === index ? null : index);
  const handleSaveEdit = () => {
    const updatedAttributes = [...productData.attributes];
    updatedAttributes[editingIndex] = { ...attributeData };
    handleAddAttribute(updatedAttributes);
    setEditingIndex(null);
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
              value={attributeData.aid}
              onChange={(e) => handleAttributeChange("aid", e.target.value)}
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
              value={attributeData.value}
              onChange={(e) => handleAttributeChange("value", e.target.value)}
            >
              {attributesSelect
                .find((attr) => attr.id === attributeData.aid)
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
            value={attributeData.SKU}
            onChange={(e) => handleAttributeChange("SKU", e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Giá gốc (thuộc tính)"
            fullWidth
            type="number"
            value={attributeData.historicalPrice}
            onChange={(e) =>
              handleAttributeChange("historicalPrice", e.target.value)
            }
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
            value={attributeData.priceInMarket}
            onChange={(e) =>
              handleAttributeChange("priceInMarket", e.target.value)
            }
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
            value={attributeData.price}
            onChange={(e) => handleAttributeChange("price", e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end">đ</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Giảm giá (thuộc tính)"
            fullWidth
            type="number"
            value={attributeData.discount}
            onChange={(e) => handleAttributeChange("discount", e.target.value)}
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
            value={attributeData.inStock}
            onChange={(e) => handleAttributeChange("inStock", e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Số lượng có thể bán (thuộc tính)"
            fullWidth
            type="number"
            value={attributeData.onStock}
            onChange={(e) => handleAttributeChange("onStock", e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Số lượng hàng đang về (thuộc tính)"
            fullWidth
            type="number"
            value={attributeData.inComing}
            onChange={(e) => handleAttributeChange("inComing", e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Đơn vị (thuộc tính)"
            fullWidth
            type="text"
            value={attributeData.unit}
            onChange={(e) => handleAttributeChange("unit", e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Số lượng tối thiểu (thuộc tính)"
            fullWidth
            type="number"
            value={attributeData.minInventory}
            onChange={(e) =>
              handleAttributeChange("minInventory", e.target.value)
            }
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Số lượng tối đa (thuộc tính)"
            fullWidth
            type="number"
            value={attributeData.maxInventory}
            onChange={(e) =>
              handleAttributeChange("maxInventory", e.target.value)
            }
          />
        </Grid>
        <Grid item xs={6}>
          <ImageProductAttributes
            handleUploadImages={(images) => handleUploadImagesAttribute(images)}
            onDelete={(index) => handleDeleteImagesAttribute(index)}
            images={attributeData.images}
            idUpload={attributeData.aid}
          />
        </Grid>
      </Grid>

      {editingIndex !== null ? (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveEdit}
            style={{ marginTop: "20px" }}
          >
            Lưu chỉnh sửa
          </Button>
        </>
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
        {productData.attributes.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>

                  <TableCell>Giá trị</TableCell>
                  <TableCell>SKU</TableCell>
                  <TableCell>Giá Giá lịch sử</TableCell>
                  <TableCell>Giá thị trường</TableCell>
                  <TableCell>Giá</TableCell>
                  <TableCell>Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productData.attributes.map((attr, index) => (
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
                                  attr.images
                                    // .flat() // Làm phẳng mảng lồng nhau
                                    // .filter((img) => typeof img === "string") // Đảm bảo chỉ có chuỗi
                                    .map((img, i) => (
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
          <Typography> có thuộc tính nào được thêm.</Typography>
        )}
      </div>
    </>
  );
}
