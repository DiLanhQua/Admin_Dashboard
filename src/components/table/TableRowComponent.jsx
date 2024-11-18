import {
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Avatar,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {StatusOrderChip, StatustPostChip } from "../StatusColor";
import propTypes from "prop-types";
import { extractTextFromHtml } from "../../utils/extractTextFromHtml";
import Iconify from "../../pages/category/Iconify";

const TableRowComponent = ({
  row,
  handleDelete,
  columns,
  handleEdit,
  handleEye,
  handleReject, // Thêm xử lý cho nút X
  handleApprove, // Thêm xử lý cho nút ✓
}) => {
  // Function to determine status text and color based on `Status`
  const getStatusTextAndColor = (Status) => {
    switch (Status) {
      case 0:
        return { text: "Chờ xác nhận", color: "gold" }; // Yellow color
      case 1:
        return { text: "Đang hoạt động", color: "green" }; // Green color
      case 2:
        return { text: "Bị khóa", color: "red" }; // Red color
      default:
        return { text: "Không xác định", color: "gray" }; // Default case for undefined statuses
    }
  };

  const { text, color } = getStatusTextAndColor(row.Status);

  return (
    <TableRow
      sx={{
        "&:hover": {
          backgroundColor: "#f0f0f0",
        },
      }}
    >
      <TableCell></TableCell>
      {columns.map((column) => (
        <TableCell
          key={column.field}
          sx={{
            verticalAlign: "middle",
            padding: "4px 8px", // Reduced padding
            whiteSpace: "nowrap",
          }}
        >
          {column.field === "Role" ? (
            row[column.field] === 1 ? (
              "Khách hàng mới"
            ) : row[column.field] === 2 ? (
              "Khách hàng tiềm năng"
            ) : (
              "Không rõ"
            )
          ) : column.field === "orderStatus" ? (
            <StatusOrderChip status={row[column.field]} />
          ) : column.field === "Status" ? (
            // Apply the dynamic status color and text here
            <span style={{ color: color }}>{text}</span>
          ) : column.field === "statustPost" ? (
            <StatustPostChip status={row[column.field]} />
          ) : column.field === "description" ? (
            <div>
              {row[column.field] && row[column.field].length > 50
                ? extractTextFromHtml(row[column.field].slice(0, 50) + "...")
                : extractTextFromHtml(row[column.field] || "Không có dữ liệu")}
            </div>
          ) : column.field === "values" ? (
            <div>
              {row[column.field] && Array.isArray(row[column.field]) ? (
                row[column.field].map((item, index) => (
                  <span
                    key={index}
                    style={{ display: "inline-block", marginRight: "5px" }}
                  >
                    {item.startsWith("#") ? (
                      <div
                        style={{
                          display: "inline-block",
                          width: "20px",
                          height: "20px",
                          backgroundColor: item,
                          border: "1px solid #000",
                          marginRight: "5px",
                        }}
                      ></div>
                    ) : (
                      item
                    )}
                    {index !== row[column.field].length - 1 && ", "}
                  </span>
                ))
              ) : (
                <span>Không có dữ liệu</span>
              )}
            </div>
          ) : column.field === "image" || column.field === "logo" ? (
            <Avatar
              alt={row[column.name]}
              variant="rounded"
              src={row[column.field]}
              sx={{ width: 50, height: 50 }}
            />
          ) : column.field === "images" ? (
            <Avatar
              alt={row[column.name]}
              variant="rounded"
              src={row[column.field][0]}
              sx={{ width: 50, height: 50 }}
            />
          ) : column.field === "priceInMarket" ? (
            <span>{row[column.field].toLocaleString()} VNĐ</span>
          ) : column.field === "icon" ? (
            <Iconify icon={row[column.field]} width={30} />
          ) : column.field === "priceInStore" ? (
            <span>{row[column.field].toLocaleString()} VNĐ</span>
          ) : column.field === "priceOnline" ? (
            <span>{row[column.field].toLocaleString()} VNĐ</span>
          ) : column.field === "address" ? (
            row[column.field].length > 50 ? (
              row[column.field].slice(0, 50) + "..."
            ) : (
              row[column.field] || "Không có dữ liệu"
            )
          ) : (
            row[column.field]
          )}
        </TableCell>
      ))}

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

        {/* Các nút phê duyệt và từ chối */}
        {handleApprove && row.Status === 2 && (  // Ẩn nút Cho phép hoạt động khi Status = 1
          <Tooltip title="Cho phép hoạt động">
            <IconButton
              sx={{ color: "green", padding: "4px" }}
              onClick={() => handleApprove(row)}
            >
              <CheckIcon />
            </IconButton>
          </Tooltip>
        )}

        {handleReject && row.Status === 1 && (  // Ẩn nút Cấm đăng nhập khi Status = 2
          <Tooltip title="Cấm hoạt động">
            <IconButton
              sx={{ color: "orange", padding: "4px" }}
              onClick={() => handleReject(row)}
            >
              <CloseIcon />
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
  handleReject: propTypes.func, // Prop mới cho nút X
  handleApprove: propTypes.func, // Prop mới cho nút ✓
};

export default TableRowComponent;
