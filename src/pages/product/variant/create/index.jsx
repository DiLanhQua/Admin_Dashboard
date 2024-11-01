/* eslint-disable react/prop-types */
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Select,
  MenuItem,
  Chip,
  Autocomplete,
} from "@mui/material";
import { HexColorPicker } from "react-colorful"; // Thay thế ChromePicker bằng HexColorPicker
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export default function VariantForm({
  open,
  handleClose,
  variantData,
  handleVariantChange,
  handleSubmit,
}) {
  const typeOfValue = [
    { value: "text", label: "Text" },
    { value: "number", label: "Number" },
    { value: "date", label: "Date" },
    { value: "boolean", label: "Boolean" },
  ];

  const [selectedColor, setSelectedColor] = useState("#fff"); // Màu hiện tại

  // Hàm thêm màu mới vào danh sách khi nhấn Enter
  const handleColorAdd = (color) => {
    if (!variantData.values.includes(color)) {
      const newColors = [...(variantData.values || []), color];
      handleVariantChange("values", newColors); // Lưu màu đã chọn
    }
  };

  const handleDeleteColor = (colorToDelete) => {
    const updatedColors = variantData.values.filter(
      (color) => color !== colorToDelete
    );
    handleVariantChange("values", updatedColors);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleColorAdd(selectedColor);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Nhập biến thể sản phẩm</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Tên biến thể"
                variant="outlined"
                value={variantData.name}
                onChange={(e) => handleVariantChange("name", e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Key"
                variant="outlined"
                value={variantData.key}
                onChange={(e) => handleVariantChange("key", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                fullWidth
                label="Loại giá trị"
                variant="outlined"
                value={variantData.typeOfValue}
                onChange={(e) =>
                  handleVariantChange("typeOfValue", e.target.value)
                }
              >
                {typeOfValue.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            {variantData.key === "color" && (
              <Grid
                container
                spacing={2}
                sx={{
                  marginTop: "10px",
                }}
              >
                <Grid item xs={6}>
                  <HexColorPicker
                    color={selectedColor}
                    onChange={setSelectedColor}
                    onKeyDown={handleKeyPress}
                  />
                </Grid>
                <Grid item xs={6}>
                  <div style={{ marginTop: "10px" }}>
                    {variantData.values &&
                      variantData.values.map((color, index) => (
                        <Chip
                          key={index}
                          label={color}
                          style={{
                            backgroundColor: color,
                            color: "#fff",
                            marginRight: "5px",
                            marginBottom: "5px",
                          }}
                          onDelete={() => handleDeleteColor(color)}
                          deleteIcon={<DeleteIcon />}
                        />
                      ))}
                  </div>
                </Grid>
              </Grid>
            )}

            {variantData.key !== "color" && (
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  freeSolo
                  options={[]}
                  value={
                    Array.isArray(variantData.values) ? variantData.values : []
                  } // Đảm bảo luôn là mảng
                  onChange={(event, newValue) =>
                    handleVariantChange("values", newValue)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Giá trị"
                      placeholder="Nhập giá trị"
                    />
                  )}
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Hủy
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Lưu biến thể
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
