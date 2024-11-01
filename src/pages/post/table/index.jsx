import React, { useState, useEffect } from "react";
import {
  Table,
  TableContainer,
  TableBody,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert
} from "@mui/material";
import TableHeader from "./TableHeader";
import TableRowComponent from "./TableRowComponent";
import SearchInput from "./SearchInput";
import TablePaginationComponent from "./TablePaginationComponent";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import SelectStatus from "./Select";

const ReusableTablePost = ({
  handleDelete,
  handleEdit,
  data,
  columns,
  handleEye,
  navigate,
  buttonAdd,
  optionStatus,
  StatusOrder,
}) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleOrderStatusChange = (event) => {
    setOrderStatusFilter(event.target.value);
  };

  const filteredData = data.filter(
    (row) =>
      row.name.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "" || row.status?.toLowerCase() === statusFilter.toLowerCase()) &&
      (orderStatusFilter === "" || row.orderStatus?.toLowerCase() === orderStatusFilter.toLowerCase())
  );

  const handleSelectRow = (rowId) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(rowId)
        ? prevSelectedRows.filter((id) => id !== rowId)
        : [...prevSelectedRows, rowId]
    );
  };

  const handleSelectAllRows = (isSelected) => {
    if (isSelected) {
      const allRowIds = filteredData.map((row) => row.id);
      setSelectedRows(allRowIds);
    } else {
      setSelectedRows([]);
    }
  };

  const isAllSelected = filteredData.length > 0 && selectedRows.length === filteredData.length;

  useEffect(() => {
    if (page > Math.ceil(filteredData.length / rowsPerPage) - 1) {
      setPage(0);
    }
  }, [filteredData, page, rowsPerPage]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    handleDelete(selectedRows);
    setSelectedRows([]);
    handleCloseDialog();
    setSnackbarMessage("Xóa thành công!");
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Paper>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <SearchInput search={search} setSearch={setSearch} />
          {optionStatus && optionStatus.length > 0 && (
            <SelectStatus
              valua={statusFilter}
              onChange={handleStatusChange}
              options={optionStatus}
            />
          )}
          {StatusOrder && StatusOrder.length > 0 && (
            <SelectStatus
              valua={orderStatusFilter}
              onChange={handleOrderStatusChange}
              options={StatusOrder}
            />
          )}
        </div>
        <div className="d-flex" style={{ gap: '8px' }}>
          {navigate && (
            <Link to={navigate}>
              <Button
                variant="contained"
                sx={{
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#3498db",
                  color: "white",
                  width: "fit-content",
                  "&:hover": {
                    backgroundColor: "#2980b9",
                  },
                }}
              >
                <ControlPointIcon sx={{ marginRight: 1 }} />
                Thêm mới
              </Button>
            </Link>
          )}
          {buttonAdd && (
            <Button
              variant="contained"
              sx={{
                margin: 0,
                display: "flex",
                alignItems: "center",
                backgroundColor: "#3498db",
                color: "white",
                width: "fit-content",
                "&:hover": {
                  backgroundColor: "#2980b9",
                },
              }}
              onClick={buttonAdd}
            >
              <ControlPointIcon sx={{ marginRight: 0 }} />
              Thêm mới
            </Button>
          )}
          <Button
            variant="contained"
            sx={{
              marginRight: '20px',
              backgroundColor: "red",
              color: "white",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "#cc0000",
              },
            }}
            onClick={handleOpenDialog}
            disabled={selectedRows.length === 0}
          >
            Xóa tất cả
          </Button>
        </div>
      </div>
      <TableContainer>
        <Table>
          <TableHeader
            columns={columns}
            onSelectAll={handleSelectAllRows}
            isAllSelected={isAllSelected}
          />
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRowComponent
                  key={row.id}
                  row={row}
                  index={index}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  columns={columns}
                  handleEye={handleEye}
                  handleSelectRow={handleSelectRow}
                  isSelected={selectedRows.includes(row.id)}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePaginationComponent
        rowsPerPage={rowsPerPage}
        page={page}
        count={filteredData.length}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Xác Nhận Xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa tất cả các hàng đã chọn?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Hủy
          </Button>
          <Button
            onClick={handleConfirmDelete}
            sx={{
              backgroundColor: "#cc0000",
              color: "white",
              "&:hover": {
                backgroundColor: "#b30000",
              },
            }}
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

ReusableTablePost.propTypes = {
  handleDelete: propTypes.func.isRequired,
  handleEdit: propTypes.func.isRequired,
  data: propTypes.array.isRequired,
  columns: propTypes.array.isRequired,
  handleEye: propTypes.func,
  navigate: propTypes.string,
  buttonAdd: propTypes.func,
  optionStatus: propTypes.array,
  StatusOrder: propTypes.array,
};

export default ReusableTablePost;
