import { Chip } from "@mui/material";
import PropTypes from "prop-types";
import { statusColors, statustPost, statusOrder } from "../../utils/statusConfig";
export const StatusChip = ({ status }) => {
  const { label, color } = statusColors[status?.toLowerCase()] || {
    label: "N/A",
    color: "default",
  };
  return (
    <Chip
      label={label}
      color={color}
      sx={{
        textTransform: "capitalize",
        fontWeight: "bold",
        width: "10rem",
        height: "2rem",
      }}
    />
  );
};

StatusChip.propTypes = {
  status: PropTypes.string.isRequired,
};

export const StatusOrderChip = ({ status }) => {
  const { label, color } = statusOrder[status?.toLowerCase()] || {
    label: "Đã hủy",
    color: "default",
  };
  return (
    <Chip
      label={label}
      color={color}
      sx={{
        textTransform: "capitalize",
        fontWeight: "bold",
        width: "10rem",
        height: "2rem",
      }}
    />
  );
};

export const StatustPostChip = ({ status }) => {
  const { label, color } = statustPost[status?.toLowerCase()] || {
    label: "N/A",
    color: "default",
  };
  return (
    <Chip
      label={label}
      color={color}
      sx={{
        textTransform: "capitalize",
        fontWeight: "bold",
        width: "10rem",
        height: "2rem",
      }}
    />
  );
};
StatusOrderChip.propTypes = {
  status: PropTypes.string.isRequired,
};
