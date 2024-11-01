/* eslint-disable react/prop-types */
import { MenuItem, Select } from "@mui/material";

export default function SelectStatus({ value, onChange, options }) {
  return (
    <Select
      value={value} // Ensure value is not undefined; fallback to empty string
      onChange={onChange}
      style={{ margin: 16 }}
      variant="outlined"
      fullWidth
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}
