import { useState, useEffect } from "react";
import axios from "axios";
import ReusableTable from "@/components/table";
import { handleToast } from "../../utils/toast";  // Assuming you have a toast utility
import { useLocation } from "react-router-dom"; // Import useLocation from react-router-dom

// Helper functions for date and time formatting
export const fDateVN = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN");
};

export const fTimeVN = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("vi-VN");
};

// Columns for the ReusableTable
const columns = [
  { label: "ID account", field: "name" },  // Updated column name to "Tên account"
  { label: "Hành động", field: "action" },
  { label: "Dữ liệu", field: "data" },
  { label: "Ngày", field: "date" },
  { label: "Thời gian", field: "time" },
];

export default function History() {
  const [historyData, setHistoryData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1000);
  const [totalCount, setTotalCount] = useState(1000); // Tổng số bản ghi
  
  // Fetch data from the API
  const fetchHistoryData = async () => {
    try {
      const response = await axios.get(`https://localhost:7048/api/Login/get-all-login?maxPageSize=${totalCount}&PageSize=${rowsPerPage}&PageNumber=${page + 1}`); // Replace with your actual API URL

      // Log the entire response to inspect the data structure

      // Get the listLogins from the response
      const responseData = response.data.listLogins;

      // Log the raw listLogins data

      if (responseData && Array.isArray(responseData)) {
        // Map the data to match the required columns
        const formattedData = responseData.map(item => ({
          id: item.id,
          // Assuming accountId is used to fetch the account name
          name: `Account ID: ${item.accountId}`, // Replace with actual logic to fetch account name
          action: item.action || "N/A",
          data: item.description || "Không có dữ liệu",
          date: item.timeStamp ? fDateVN(item.timeStamp) : "Không xác định",
          time: item.timeStamp ? fTimeVN(item.timeStamp) : "Không xác định",
        }));

        setHistoryData(formattedData);
      } else {
        throw new Error("Dữ liệu không hợp lệ");
      }
    } catch (error) {
      handleToast("error", "Không thể tải lịch sử");
    }
  };

  useEffect(() => {
    fetchHistoryData();
  }, []); // Empty dependency array means this will run once on component mount

  // Use `useLocation` to determine if we're on the history page
  const location = useLocation();

  // Check if the URL contains 'history' to hide the 'Hành động' column
  const isHistoryPage = location.pathname.includes("history");

  const handleDelete = (index) => {
  };

  return (
    <ReusableTable
      data={historyData}
      columns={columns.filter(column => !(isHistoryPage && column.field === "acac"))} // Filter out "Hành động" column if on history page
    />
  );
}
