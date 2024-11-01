/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { TablePagination, Box } from "@mui/material";
import { viVN } from "@mui/material/locale";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const TablePaginationComponent = ({
  count,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const theme = createTheme({}, viVN);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <TablePagination
          component="div"
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          labelRowsPerPage="Số dòng mỗi trang"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} trong ${count !== -1 ? count : `hơn ${to}`}`
          }
          sx={{
            "& .MuiTablePagination-selectLabel": {
              marginBottom: "4px", // Tùy chỉnh khoảng cách cho "Số dòng mỗi trang"
            },
            "& .MuiTablePagination-displayedRows": {
              marginTop: "16px", // Tăng khoảng cách để đẩy "1–5 trong 11" xuống
            },
          }}
        />
      </Box>
    </ThemeProvider>
  );
};

export default TablePaginationComponent;
