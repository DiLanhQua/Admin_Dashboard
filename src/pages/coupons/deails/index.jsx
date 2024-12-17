import React, { useState } from "react"; // Make sure to import React and useState
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import propTypes from "prop-types";
import { StatusChip } from "../../../components/StatusColor"; // Assuming you have a StatusChip component

import "./details.scss";

const EyeCoupons = ({ open, handleClose, selectedData }) => {
  //   const renderDiscount = () => {
  //     if (selectedData?.type === "fixed") {
  //       return selectedData.discount;
  //     } else if (selectedData?.type === "percent") {
  //       return selectedData.discount;
  //     }
  //     return selectedData?.discount || "";
  //   };
  const renderDiscount = () => {
    if (selectedData?.DiscountType === "Fixed") {
      return `${selectedData.Discount
        }.000VND`;
    } else if (selectedData?.DiscountType === "Percentage") {
      return `${selectedData.Discount
        }%`;
    } else {
      return "No discount available";
    }
  };
  const [status, setStatus] = useState(selectedData?.status);

  // Hàm thay đổi trạng thái
  const handleChangeStatus = () => {
    // Thay đổi giữa 'active' và 'inactive'
    const newStatus = status === "active" ? "inactive" : "active";
    setStatus(newStatus);
  };
  const [showMore, setShowMore] = useState(false); // State for showing more info
  //   const displayedCategories = selectedData.categoryApply.slice(0, 3); // Hiển thị tối đa 3 danh mục
  //   const showMoreCategories = selectedData.categoryApply.length > 3;
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogContent>
        <Box className="boxContainer" sx={{ textAlign: "center", mb: 2 }}>
          <Typography
            className="title"
            variant="h5"
            sx={{ fontWeight: "bold" }}
          >
            <span>Chiến dịch</span>
            <span>: </span>
            {selectedData?.VoucherName}
          </Typography>
          <Typography
            variant="body1"
            color="rgb(24, 28, 26)"
            sx={{ fontWeight: "bold" }}
          >
            {selectedData?.description}
          </Typography>

          {/* Loại giảm giá */}

        </Box>
        <Box className="boxContainer" sx={{ textAlign: "center", mb: 2 }}>
          <Typography
            className="title"
            variant="h5"
            sx={{ fontWeight: "bold" }}
          >
            <span>Loại</span>
            <span>: </span>
            {selectedData?.DiscountType}
          </Typography>
          <Typography
            variant="body1"
            color="rgb(24, 28, 26)"
            sx={{ fontWeight: "bold" }}
          >
            {selectedData?.description}
          </Typography>

          {/* Loại giảm giá */}

        </Box>
        <Grid container spacing={2}>
          {/* Ngày bắt đầu */}
          <Grid
            item
            xs={12}
            sm={6}
            display="flex"
            alignItems="center"
            sx={{ borderBottom: "1px solid #ccc", paddingBottom: 1 }}
          >
            <DateRangeIcon sx={{ marginRight: 1 }} />
            <Typography>
              <span>Ngày bắt đầu: </span>
              <span className="date">{selectedData?.TimeStart}</span>
            </Typography>
          </Grid>

          {/* Ngày kết thúc */}
          <Grid
            item
            xs={12}
            sm={6}
            display="flex"
            alignItems="center"
            sx={{ borderBottom: "1px solid #ccc", paddingBottom: 1 }}
          >
            <DateRangeIcon sx={{ marginRight: 1 }} />
            <Typography>
              <span>Ngày kết thúc: </span>
              <span>{selectedData?.TimeEnd}</span>
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            display="flex"
            alignItems="center"
            sx={{ borderBottom: "1px solid #ccc", paddingBottom: 1 }}
          >
            <DateRangeIcon sx={{ marginRight: 1 }} />
            <Typography>
              <span>Giá tối thiểu: </span>
              <span>
                {selectedData?.min_Order_Value

                  ? new Intl.NumberFormat('vi-VN').format(selectedData.min_Order_Value
                  )
                  : 'N/A'}.000 Đ
              </span>
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            display="flex"
            alignItems="center"
            sx={{ borderBottom: "1px solid #ccc", paddingBottom: 1 }}
          >
            <DateRangeIcon sx={{ marginRight: 1 }} />
            <Typography>
              <span>Giá tối đa: </span>
              <span>
                {selectedData?.max_Discount
                  ? new Intl.NumberFormat('vi-VN').format(selectedData.max_Discount)
                  : 'N/A'}.000 Đ
              </span>
            </Typography>
          </Grid>


          {/* Số lượng */}
          <Grid
            item
            xs={12}
            sm={12}
            display="flex"
            alignItems="center"
            sx={{ borderBottom: "1px solid #ccc", paddingBottom: 1 }}
          >
            <Typography>{`Số lượng: ${selectedData?.Quantity}`}</Typography>
          </Grid>

          {/* Hiển thị thông tin bổ sung khi showMore là true */}
          {showMore && (
            <>
              {/* Danh mục áp dụng */}
              <Grid
                item
                xs={12}
                sm={6}
                display="flex"
                sx={{ borderBottom: "1px solid #ccc", paddingBottom: 1 }}
              >
                <Typography>
                  <span className="block-span" style={{ display: "block" }}>
                    Danh mục áp dụng
                  </span>
                  <span>{selectedData?.categoryApply.join(", ")}</span>
                </Typography>
              </Grid>
              {/* Danh mục không áp dụng */}
              <Grid
                item
                xs={12}
                sm={6}
                display="flex"
                sx={{ borderBottom: "1px solid #ccc", paddingBottom: 1 }}
              >
                <Typography>
                  <span className="block-span" style={{ display: "block" }}>
                    Danh mục không áp dụng
                  </span>
                  <span>{selectedData?.categoryNotApply.join(", ")}</span>
                </Typography>
              </Grid>
              {/* Hãng áp dụng */}
              <Grid
                item
                xs={12}
                sm={6}
                display="flex"
                sx={{ borderBottom: "1px solid #ccc", paddingBottom: 1 }}
              >
                <Typography>
                  <span className="block-span" style={{ display: "block" }}>
                    Hãng áp dụng
                  </span>
                  <span>{selectedData?.brandApply.join(", ")}</span>
                </Typography>
              </Grid>
              {/* Hãng không áp dụng */}
              <Grid
                item
                xs={12}
                sm={6}
                display="flex"
                sx={{ borderBottom: "1px solid #ccc", paddingBottom: 1 }}
              >
                <Typography>
                  <span className="block-span" style={{ display: "block" }}>
                    Hãng không áp dụng
                  </span>
                  <span>{selectedData?.brandNotApply.join(", ")}</span>
                </Typography>
              </Grid>
              {/* Bộ sưu tập áp dụng */}
              <Grid
                item
                xs={12}
                sm={6}
                display="flex"
                sx={{ borderBottom: "1px solid #ccc", paddingBottom: 1 }}
              >
                <Typography>
                  <span className="block-span" style={{ display: "block" }}>
                    Bộ sưu tập áp dụng
                  </span>
                  <span>{selectedData?.collectionApply.join(", ")}</span>
                </Typography>
              </Grid>
              {/* Bộ sưu tập không áp dụng */}
              <Grid
                item
                xs={12}
                sm={6}
                display="flex"
                sx={{ borderBottom: "1px solid #ccc", paddingBottom: 1 }}
              >
                <Typography>
                  <span className="block-span" style={{ display: "block" }}>
                    Bộ sưu tập không áp dụng
                  </span>
                  <span>{selectedData?.collectionNotApply.join(", ")}</span>
                </Typography>
              </Grid>
              {/* Sản phẩm áp dụng */}
              <Grid
                item
                xs={12}
                sm={6}
                display="flex"
                sx={{ borderBottom: "1px solid #ccc", paddingBottom: 1 }}
              >
                <Typography>
                  <span className="block-span" style={{ display: "block" }}>
                    Sản phẩm áp dụng
                  </span>
                  <span>{selectedData?.productApply.join(", ")}</span>
                </Typography>
              </Grid>
              {/* Sản phẩm không áp dụng */}
              <Grid
                item
                xs={12}
                sm={6}
                display="flex"
                sx={{ borderBottom: "1px solid #ccc", paddingBottom: 1 }}
              >
                <Typography>
                  <span className="block-span" style={{ display: "block" }}>
                    Sản phẩm không áp dụng
                  </span>
                  <span>{selectedData?.productNotApply.join(", ")}</span>
                </Typography>
              </Grid>
              {/* Trạng thái */}
              <Grid container spacing={2}>
                {/* Hiển thị trạng thái có thể nhấn vào */}
                <Grid item xs={12} sm={6} display="flex">
                  {status && (
                    <div
                      onClick={handleChangeStatus}
                      className="statusChipContainer"
                    >
                      <StatusChip status={status} />
                    </div>
                  )}
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EyeCoupons.propTypes = {
  open: propTypes.bool,
  handleClose: propTypes.func,
  selectedData: propTypes.object,
};

export default EyeCoupons;
