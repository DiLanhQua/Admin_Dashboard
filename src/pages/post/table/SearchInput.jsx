/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { TextField } from "@mui/material";

const SearchInput = ({ search, setSearch }) => (
  <TextField
    label="Tìm kiếm"
    variant="outlined"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{ margin: 16 }}
    fullWidth
  />
);

export default SearchInput;
