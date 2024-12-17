import { useState, useMemo } from "react";
import { Table, TableContainer, TableBody, Paper, Button } from "@mui/material";
import TableHeader from "./TableHeader";
import TableRowComponent from "./TableRowComponent";
import SearchInput from "./SearchInput";
import TablePaginationComponent from "./TablePaginationComponent";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import SelectStatus from "./Select";
import { applyFilter, getComparator } from "../../utils/sortUtils";

const ReusableTable = ({
  handleDelete,
  handleEdit,
  data,
  columns,
  handleEye,
  navigate,
  buttonAdd,
  optionStatus,
  StatusOrder,
  handleApprove,
  handleReject,
}) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // State for filtering by `status`
  const [orderStatusFilter, setOrderStatusFilter] = useState(""); // State for filtering by `orderStatus`
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Separate handler for status filter
  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  // Separate handler for order status filter
  const handleOrderStatusChange = (event) => {
    setOrderStatusFilter(event.target.value);
  };

  const handleSort = (field) => {
    if (sortColumn === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(field);
      setSortOrder("asc");
    }
  };

  // Sorting and filtering combined logic
  const filteredData = useMemo(() => {
    const comparator = getComparator(sortOrder, sortColumn);
    return applyFilter({
      inputData: data,
      comparator,
      filterName: search,
    }).filter((row) => {
      const matchesStatus =
        statusFilter === "" ||
        statusFilter === "all" ||
        row.status?.toLowerCase() === statusFilter.toLowerCase() ;
      const matchesOrderStatus =
        orderStatusFilter === "" ||
        row.orderStatus?.toLowerCase() === orderStatusFilter.toLowerCase();
      return matchesStatus && matchesOrderStatus;
    });
  }, [data, sortOrder, sortColumn, search, statusFilter, orderStatusFilter]);

  return (
    <Paper>
      <div className="d-flex justify-content-between align-items-center">
        {/* Left side: Search Input and Filters */}
        <div className="d-flex">
          <SearchInput search={search} setSearch={setSearch} />
          {optionStatus && optionStatus.length > 0 && (
            <SelectStatus
              value={statusFilter ? statusFilter : "all"}
              onChange={handleStatusChange}
              options={optionStatus}
            />
          )}

          {/* Order Status Filter (this can be customized as needed) */}
          {StatusOrder && StatusOrder.length > 0 && (
            <SelectStatus
              value={orderStatusFilter}
              onChange={handleOrderStatusChange}
              options={StatusOrder}
            />
          )}
        </div>

        {/* Right side: Button */}
        {navigate && (
          <Link to={navigate}>
            <Button
              variant="contained"
              className="custom-button"
              sx={{ mr: 2 }}
            >
              <ControlPointIcon sx={{ marginRight: 1 }} />
              Thêm mới
            </Button>
          </Link>
        )}
        {buttonAdd && (
          <Button
            variant="contained"
            className="custom-button"
            onClick={buttonAdd}
            sx={{ mr: 2 }}
          >
            <ControlPointIcon sx={{ marginRight: 1 }} />
            Thêm mới
          </Button>
        )}
      </div>

      <TableContainer>
        <Table>
          <TableHeader
            columns={columns}
            handleSort={handleSort}
            sortColumn={sortColumn}
            sortOrder={sortOrder}
          />

          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRowComponent
                  key={index}
                  row={row}
                  item={row}
                  index={index}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  columns={columns}
                  handleEye={handleEye}
                  handleApprove={() => handleApprove(row.id)}  // Truyền row.id ở đây
                  handleReject={() => handleReject(row.id)}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePaginationComponent
        count={filteredData.length}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

// Prop validation with prop-types
ReusableTable.propTypes = {
  handleDelete: propTypes.func,
  handleEdit: propTypes.func.isRequired,
  data: propTypes.array.isRequired,
  columns: propTypes.array.isRequired,
  handleEye: propTypes.func,
  navigate: propTypes.string,
  buttonAdd: propTypes.func,
  optionStatus: propTypes.array,
  StatusOrder: propTypes.array,
  handleApprove: propTypes.func.isRequired,  // Added prop validation for handleApprove
  handleReject: propTypes.func.isRequired,   // Added prop validation for handleReject
  search: propTypes.string.isRequired,  // Thêm prop search
  setSearch: propTypes.func.isRequired,
};

export default ReusableTable;
