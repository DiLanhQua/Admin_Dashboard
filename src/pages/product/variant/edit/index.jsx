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

export default function EditVariant({
  open,
  initialData,
  handleClose,
  handleSave,
}) {
  const [variantData, setVariantData] = useState(() => {
    return {
      name: initialData.name,
      key: initialData.key,
      typeOfValue: initialData.typeOfValue,
      values: initialData.values,
    };
  });
  const [selectedColor, setSelectedColor] = useState("#fff");

  // Hàm thêm màu mới vào danh sách
  const handleColorAdd = (color) => {
    if (!variantData.values.includes(color)) {
      const newColors = [...variantData.values, color];
      setVariantData({ ...variantData, values: newColors });
    }
  };

  // Hàm xóa màu khỏi danh sách
  const handleDeleteColor = (colorToDelete) => {
    const updatedColors = variantData.values.filter(
      (color) => color !== colorToDelete
    );
    setVariantData({ ...variantData, values: updatedColors });
  };

  // Xử lý thay đổi input
  const handleInputChange = (field, value) => {
    setVariantData({ ...variantData, [field]: value });
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleColorAdd(selectedColor);
    }
  };
  // Khi submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    const attributeId = initialData.id;
    handleSave({ attributeId, data: variantData });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Chỉnh sửa biến thể sản phẩm</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Tên biến thể"
                variant="outlined"
                value={variantData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Key"
                variant="outlined"
                value={variantData.key}
                onChange={(e) => handleInputChange("key", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                fullWidth
                label="Loại giá trị"
                variant="outlined"
                value={variantData.typeOfValue}
                onChange={(e) =>
                  handleInputChange("typeOfValue", e.target.value)
                }
              >
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="number">Number</MenuItem>
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="boolean">Boolean</MenuItem>
                <MenuItem value="color">Color</MenuItem>
              </Select>
            </Grid>

            {/* Nếu loại giá trị là màu sắc, hiển thị bảng chọn màu */}
            {variantData.key === "color" && (
              <Grid container spacing={2} sx={{ marginTop: "10px" }}>
                <Grid item xs={6}>
                  <HexColorPicker
                    color={selectedColor}
                    onChange={setSelectedColor}
                    onKeyPress={handleKeyPress}
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

            {/* Nếu không phải loại màu, hiển thị autocomplete */}
            {variantData.key !== "color" && (
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  freeSolo
                  options={[]}
                  value={variantData.values}
                  onChange={(event, newValue) =>
                    handleInputChange("values", newValue)
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
            Lưu thay đổi
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
