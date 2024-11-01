import {
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Checkbox,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import propTypes from "prop-types";
import { StatustPostChip } from "../../../components/StatusColor";
import { extractTextFromHtml } from "../../../utils/extractTextFromHtml";

const TableRowComponent = ({
  row,
  handleDelete,
  columns,
  handleEdit,
  handleEye,
  handleSelectRow,
  isSelected,
}) => {
  return (
    <TableRow
      sx={{
        "&:hover": {
          backgroundColor: "#f0f0f0",
        },
      }}
      role="checkbox"
      aria-checked={isSelected}
      selected={isSelected}
    >
      {/* Checkbox for selecting the row */}
      <TableCell padding="checkbox">
        <Checkbox
          checked={isSelected}
          onChange={() => handleSelectRow(row.id)}
        />
      </TableCell>

      {/* Map through columns to render the appropriate data */}
      {columns.map((column) => (
        <TableCell
          key={column.field}
          sx={{
            verticalAlign: "middle",
            padding: "4px 8px", // Reduced padding
            whiteSpace: "nowrap",
          }}
        >
          {column.field === "statustPost" ? (
            <StatustPostChip status={row[column.field]} />
          ) : column.field === "thumbnail" ? (
            <img
              src={row[column.field]} // Đường dẫn hình ảnh từ dữ liệu
              alt="Thumbnail"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                marginRight: "10px",
              }} // Thêm margin phải
            />
          ) : column.field === "postTitle" ? (
            <Typography sx={{ marginLeft: "5x" }}>
              {row[column.field]}
            </Typography> // Thêm khoảng cách cho tiêu đề
          ) : column.field === "postShortDescription" ? (
            <div>{extractTextFromHtml(row[column.field])}</div>
          ) : (
            row[column.field]
          )}
        </TableCell>
      ))}

      {/* Action buttons for View, Edit, and Delete */}
      <TableCell>
        {handleEye && (
          <Tooltip title="View">
            <IconButton
              color="primary"
              onClick={() => handleEye(row)}
              sx={{ padding: "4px" }} // Reduced padding for action buttons
            >
              <RemoveRedEyeIcon />
            </IconButton>
          </Tooltip>
        )}

        {handleEdit && (
          <Tooltip title="Edit">
            <IconButton
              color="primary"
              onClick={() => handleEdit(row)}
              sx={{ padding: "4px" }} // Reduced padding for action buttons
            >
              <Edit />
            </IconButton>
          </Tooltip>
        )}

        {handleDelete && (
          <Tooltip title="Delete">
            <IconButton
              sx={{ color: "red", padding: "4px" }} // Reduced padding for action buttons
              onClick={() => handleDelete(row)}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        )}
      </TableCell>
    </TableRow>
  );
};

TableRowComponent.propTypes = {
  row: propTypes.object.isRequired,
  columns: propTypes.array.isRequired,
  handleDelete: propTypes.func,
  handleEdit: propTypes.func,
  handleEye: propTypes.func,
  handleSelectRow: propTypes.func.isRequired, // Function to handle row selection
  isSelected: propTypes.bool.isRequired, // Boolean to indicate if row is selected
};

export default TableRowComponent;
