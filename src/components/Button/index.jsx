import Button from "@mui/material/Button";
import PropTypes from "prop-types";

const CustomButton = ({
  label,
  onClick,
  variant = "contained",
  color = "primary",
  size = "medium",
  icons,
  style,
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      onClick={onClick}
      startIcon={icons}
      sx={style}
    >
      {label}
    </Button>
  );
};

CustomButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["text", "outlined", "contained"]), // Restrict variant values
  color: PropTypes.oneOf([
    "inherit",
    "primary",
    "secondary",
    "success",
    "error",
    "info",
    "warning",
  ]), // Restrict color values
  size: PropTypes.oneOf(["small", "medium", "large"]),
  icons: PropTypes.element,
  style: PropTypes.object,
};

export default CustomButton;
