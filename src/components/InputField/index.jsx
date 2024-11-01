import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";

const CustomInputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  error = false,
  helperText = "",
  onBlur,
}) => {
  return (
    <TextField
      fullWidth
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange} // Directly pass onChange
      error={error}
      helperText={helperText}
      onBlur={onBlur}
    />
  );
};

CustomInputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  onBlur: PropTypes.func, // Make sure this is added for completeness
};

export default CustomInputField;
