import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RateReviewIcon from "@mui/icons-material/RateReview";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import propTypes from "prop-types";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import { StatusChip } from "../../../components/StatusColor";
import { fDateVN } from "../../../utils/format-time";

// Mock Avatar image (replace with the actual image or icon as needed)

export default function EyeStaff({ open, handleClose, selectedData }) {
  return (
    <div class="dialog">
      <div class="dialog-content">
        <div class="avatar-container">
          <img src="selectedData?.Image || '/static/images/avatar/1.jpg'" alt="Profile Image" class="avatar" />
          <h3 class="name">selectedData?.FullName</h3>
          <p class="role">Role: selectedData?.Role</p>
        </div>

        <div class="info-grid">
          <div class="info-item">
            <span class="icon">&#x1F4C5;</span>
            <p>Id: selectedData?.Id</p>
          </div>
          <div class="info-item">
            <span class="icon">&#x1F464;</span>
            <p>UserName: selectedData?.UserName</p>
          </div>
          <div class="info-item">
            <span class="icon">&#x2709;</span>
            <p>Email: selectedData?.Email</p>
          </div>
          <div class="info-item">
            <span class="icon">&#x1F4F1;</span>
            <p>Phone: selectedData?.Phone</p>
          </div>
          <div class="info-item">
            <span class="icon">&#x1F4CD;</span>
            <p>Address: selectedData?.Address</p>
          </div>
          <div class="info-item">
            <span class="icon">&#x1F4B0;</span>
            <p>Role: selectedData?.Role</p>
          </div>
        </div>

        <div class="dialog-actions">
          <button class="close-btn" onclick="handleClose()">Đóng</button>
        </div>
      </div>
    </div>

  );
}

EyeStaff.propTypes = {
  open: propTypes.bool,
  handleClose: propTypes.func,
  selectedData: propTypes.object,
  handleDelete: propTypes.func,
  handleEdit: propTypes.func,
  getStatusColor: propTypes.func,
};
