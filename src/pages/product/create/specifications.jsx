import {
  Button,
  IconButton,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Collapse,
  TextField,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit"; // Thêm icon để chỉnh sửa tiêu đề
import React, { useState } from "react";

export default function Specifications({ productData, handleInputChange }) {
  const [expandedIndex, setExpandedIndex] = useState(null); // Trạng thái theo dõi mục mở rộng
  const [editingIndex, setEditingIndex] = useState(null); // Trạng thái theo dõi mục đang chỉnh sửa tiêu đề

  // Hàm toggle mở rộng/thu gọn
  const handleToggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Hàm cập nhật tiêu đề
  const handleUpdateTitle = (index, newTitle) => {
    const updatedSpecifications = productData.specifications.map((spec, i) =>
      i === index ? { ...spec, title: newTitle } : spec
    );
    handleInputChange("specifications", updatedSpecifications);
    setEditingIndex(null); // Dừng chỉnh sửa sau khi cập nhật
  };

  // Hàm thêm thông số kỹ thuật
  const handleAddSpecification = () => {
    handleInputChange("specifications", [
      ...productData.specifications,
      { title: "", details: [] },
    ]);
  };

  // Hàm xóa thông số kỹ thuật
  const handleRemoveSpecification = (index) => {
    handleInputChange(
      "specifications",
      productData.specifications.filter((spec, i) => i !== index)
    );
  };

  // Hàm xóa cặp key-value

  const handleRemoveDetail = (specIndex, detailIndex) => {
    const newDetails = productData.specifications[specIndex].details.filter(
      (detail, i) => i !== detailIndex
    );
    handleInputChange(
      "specifications",
      productData.specifications.map((spec, i) =>
        i === specIndex ? { ...spec, details: newDetails } : spec
      )
    );
  };

  // Hàm cập nhật key-value
  const handleChangeDetail = (specIndex, detailIndex, key, value) => {
    const newDetails = productData.specifications[specIndex].details.map(
      (detail, i) => (i === detailIndex ? { ...detail, [key]: value } : detail)
    );
    handleInputChange(
      "specifications",
      productData.specifications.map((spec, i) =>
        i === specIndex ? { ...spec, details: newDetails } : spec
      )
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="h6">Thêm thông số kỹ thuật</Typography>
      </Grid>
      <Grid item xs={6} textAlign="end">
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddSpecification}
        >
          Thêm thông số
        </Button>
      </Grid>

      {productData.specifications.length > 0 && (
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tiêu đề</TableCell>
                  <TableCell>Key</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productData.specifications.map((spec, specIndex) => (
                  <React.Fragment key={specIndex}>
                    {/* Hiển thị tiêu đề của mỗi thông số với khả năng mở rộng */}
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Grid container alignItems="center">
                          <Grid item xs={10}>
                            <TextField
                              fullWidth
                              label="Tiêu đề"
                              value={spec.title}
                              onChange={(e) =>
                                handleUpdateTitle(specIndex, e.target.value)
                              }
                            />
                          </Grid>
                          <Grid item xs={1}>
                            <Tooltip title="Xóa Thông số">
                              <IconButton
                                sx={{ color: "red", padding: "4px", ml: 2 }}
                                onClick={() =>
                                  handleRemoveSpecification(specIndex)
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </Grid>
                          <Grid item xs={1}>
                            <IconButton
                              onClick={() => handleToggleExpand(specIndex)}
                            >
                              <ExpandMoreIcon
                                style={{
                                  transform:
                                    expandedIndex === specIndex
                                      ? "rotate(180deg)"
                                      : "rotate(0deg)",
                                  transition: "transform 0.3s",
                                }}
                              />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>

                    {/* Collapse cho các chi tiết key-value */}
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Collapse
                          in={expandedIndex === specIndex}
                          timeout="auto"
                          unmountOnExit
                        >
                          {spec.details.map((detail, detailIndex) => (
                            <>
                              <Grid container spacing={2} key={detailIndex}>
                                <Grid item xs={5}>
                                  <TextField
                                    fullWidth
                                    label="Key"
                                    value={detail.key}
                                    onChange={(e) =>
                                      handleChangeDetail(
                                        specIndex,
                                        detailIndex,
                                        "key",
                                        e.target.value
                                      )
                                    }
                                  />
                                </Grid>
                                <Grid item xs={5}>
                                  <TextField
                                    fullWidth
                                    label="Value"
                                    value={detail.value}
                                    onChange={(e) =>
                                      handleChangeDetail(
                                        specIndex,
                                        detailIndex,
                                        "value",
                                        e.target.value
                                      )
                                    }
                                  />
                                </Grid>
                                <Grid
                                  item
                                  xs={2}
                                  justifyContent="center"
                                  textAlign="start"
                                  sx={{
                                    mt: 1,
                                  }}
                                >
                                  <Tooltip title="Xóa">
                                    <IconButton
                                      sx={{ color: "red", padding: "4px" }}
                                      onClick={() =>
                                        handleRemoveDetail(
                                          specIndex,
                                          detailIndex
                                        )
                                      }
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </Tooltip>
                                </Grid>
                              </Grid>
                            </>
                          ))}
                          <Grid item xs={12} textAlign="end">
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => {
                                const newDetails = [
                                  ...productData.specifications[specIndex]
                                    .details,
                                  { key: "", value: "" },
                                ];
                                handleInputChange(
                                  "specifications",
                                  productData.specifications.map((spec, i) =>
                                    i === specIndex
                                      ? { ...spec, details: newDetails }
                                      : spec
                                  )
                                );
                              }}
                            >
                              Thêm
                            </Button>
                          </Grid>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
    </Grid>
  );
}
