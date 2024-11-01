import {
  Button,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Gifts({ formik }) {
  const [isEditing, setIsEditing] = useState(null);

  const handleAddGifts = () => {
    const newGift = { title: "", key: "", value: "" };
    formik.setFieldValue("gifts", [...formik.values.gifts, newGift]);
    setIsEditing(formik.values.gifts.length);
  };

  const handleRemoveGifts = (index) => {
    const newGifts = formik.values.gifts.filter((item, i) => i !== index);
    formik.setFieldValue("gifts", newGifts);
  };

  const handleChangeGifts = (index, field, value) => {
    const updatedGifts = formik.values.gifts.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    formik.setFieldValue("gifts", updatedGifts);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="h6">Thêm quà tặng</Typography>
      </Grid>
      <Grid item xs={6} textAlign="end">
        <Button variant="contained" color="primary" onClick={handleAddGifts}>
          Thêm quà tặng
        </Button>
      </Grid>

      {/* Hiển thị input cho thông số đang chỉnh sửa */}
      {isEditing !== null && (
        <Grid item xs={12} key={isEditing}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Tiêu đề"
                value={formik.values.gifts[isEditing]?.title || ""}
                onChange={(e) =>
                  handleChangeGifts(isEditing, "title", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Key"
                value={formik.values.gifts[isEditing]?.key || ""}
                onChange={(e) =>
                  handleChangeGifts(isEditing, "key", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Value"
                value={formik.values.gifts[isEditing]?.value || ""}
                onChange={(e) =>
                  handleChangeGifts(isEditing, "value", e.target.value)
                }
              />
            </Grid>
          </Grid>
        </Grid>
      )}

      {/* Hiển thị bảng thông số kỹ thuật */}
      {formik.values.gifts.length > 0 && (
        <Grid item xs={12}>
          <TableContainer>
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
                {formik.values.gifts.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.key}</TableCell>
                    <TableCell>{item.value}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => setIsEditing(index)}>
                        <EditIcon /> {/* Chỉnh sửa */}
                      </IconButton>
                      <IconButton onClick={() => handleRemoveGifts(index)}>
                        <DeleteIcon /> {/* Xóa */}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
    </Grid>
  );
}
