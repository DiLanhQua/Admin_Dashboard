/* eslint-disable react/prop-types */
import React from "react";
import { TableHead, TableRow, TableCell, Checkbox, Typography } from "@mui/material";

const TableHeader = ({ columns, isAllSelected, onSelectAll }) => (
  <TableHead>
    <TableRow>
      <TableCell padding="checkbox">
        <div style={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            checked={isAllSelected}
            onChange={(event) => onSelectAll(event.target.checked)}
          />
          <Typography variant="body2" style={{ marginLeft: "8px", whiteSpace: "nowrap" }}>
          </Typography>
        </div>
      </TableCell>
      {columns.map((column, index) => (
        <TableCell key={index}>{column.label}</TableCell>
      ))}
      <TableCell>Hoạt Động</TableCell>
    </TableRow>
  </TableHead>
);

export default TableHeader;
