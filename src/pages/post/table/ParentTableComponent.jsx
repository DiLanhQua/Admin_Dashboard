/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Button } from "@mui/material";
import ReusableTablePost from "./ReusableTablePost"; // Import component bảng
import data from "./data"; // Giả sử bạn có dữ liệu trong file data.js
import columns from "./columns"; // Giả sử bạn có cấu trúc cột trong file columns.js

const ParentTableComponent = () => {
    const [selectedRows, setSelectedRows] = useState([]);

    const handleSelectAll = (isSelected) => {
        if (isSelected) {
            const allRowIds = data.map((row) => row.id); // Lấy tất cả id hàng
            setSelectedRows(allRowIds);
        } else {
            setSelectedRows([]);
        }
    };

    const handleRowSelect = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    };

    const handleDeleteSelected = () => {
        // Thực hiện xóa các mục đã chọn
        // Cập nhật dữ liệu (tùy theo cách bạn quản lý dữ liệu)
        setSelectedRows([]); // Xóa danh sách đã chọn sau khi xóa
    };

    return (
        <div>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleDeleteSelected}
                disabled={selectedRows.length === 0} // Vô hiệu hóa nút nếu không có mục nào được chọn
            >
                Xóa đã chọn
            </Button>
            <ReusableTablePost
                data={data}
                columns={columns}
                handleSelect={handleRowSelect}
                onSelectAll={handleSelectAll}
                selectedRows={selectedRows}
            />
        </div>
    );
};

export default ParentTableComponent;
