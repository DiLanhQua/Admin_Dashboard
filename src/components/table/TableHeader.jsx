/* eslint-disable react/prop-types */
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import propTypes from "prop-types";

const TableHeader = ({ columns, handleSort, sortColumn, sortOrder }) => (
  <TableHead>
    <TableRow>
      <TableCell></TableCell>
      {columns.map((column, index) => (
        <TableCell key={index}>
          <Tooltip title={column.label} arrow>
            <TableSortLabel
              active={sortColumn === column.field}
              direction={sortColumn === column.field ? sortOrder : "asc"}
              onClick={() => handleSort(column.field)}
            >
              {column.label}
            </TableSortLabel>
          </Tooltip>
        </TableCell>
      ))}
      <TableCell>Hoạt Động</TableCell>
    </TableRow>
  </TableHead>
);

TableHeader.propTypes = {
  columns: propTypes.arrayOf(
    propTypes.shape({
      label: propTypes.string.isRequired, // Added id to propTypes
      field: propTypes.string.isRequired,
    })
  ).isRequired,
  handleSort: propTypes.func.isRequired,
  sortColumn: propTypes.string, // this is the currently sorted column's id
  sortOrder: propTypes.oneOf(["asc", "desc"]).isRequired,
};

export default TableHeader;
