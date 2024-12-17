import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ReusableTable from "../../components/Table";
import { handleToast } from "../../utils/toast";
import LoadingWrapper from "../../components/loading/LoadingWrapper";

export default function UserPage() {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({ pageSize: 3, pageNumber: 1, pageCount: 1 });
  const [loading, setLoading] = useState(false);
  const [maxPageSize, setMaxPageSize] = useState(50); 
  const [rowsPerPage, setRowsPerPage] = useState(100); 
  const [page, setPage] = useState(0);

  const [search, setSearch] = useState("");
  // Fetch customers from API
  const fetchCustomers = useCallback(async (pageNumber = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://localhost:7048/api/Account/get-all-account?maxPageSize=${maxPageSize}&PageSize=${rowsPerPage}&PageNumber=${page + 1}&Search=${search}`, {
        params: { pageNumber, pageSize: pagination.pageSize },
      });

      const { data, pageSize, pageNumber: currentPage, pageCount } = response.data;
      const formattedData = data.filter((item) => item.role === 2).map((item) => ({
        id: item.id,
        UserName: item.userName,
        Email: item.email,
        Phone: item.phone,
        FullName: item.fullName,
        Address: item.address,
        Role: item.role,
        Status: item.status,
        image: item.image,
      }));

      setItems(formattedData);
      setPagination({ pageSize, pageNumber: currentPage, pageCount,search });
    } catch {
      handleToast("error", "Hiển thị người dùng thất bại", "top-right");
    } finally {
      setLoading(false);
    }
  }, [pagination.pageSize]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers, maxPageSize, rowsPerPage, page,search]);

  // Approve action
const handleApprove = useCallback(async (id) => {
  
  try {
    await axios.post(`https://localhost:7048/api/Account/un-block-account/${id}`);
    handleToast("success", "Người dùng đã được cho phép hoạt động!", "top-right");
    fetchCustomers(pagination.pageNumber);
  } catch {
    handleToast("error", "Cho phép hoạt động thất bại!", "top-right");
  }
}, [fetchCustomers, pagination.pageNumber]);

// Reject action
const handleReject = useCallback(async (id) => {
  
  try {
    await axios.post(`https://localhost:7048/api/Account/block-account/${id}`);
    handleToast("error", "Người dùng đã bị cấm đăng nhập!", "top-right");
    fetchCustomers(pagination.pageNumber);
  } catch {
    handleToast("error", "Cấm đăng nhập thất bại!", "top-right");
  }
}, [fetchCustomers, pagination.pageNumber]);


  // Handle page change

  const columns = [
    { label: "Tên tài khoản", field: "UserName" },
    { label: "Email", field: "Email" },
    { label: "Số điện thoại", field: "Phone" },
    { label: "Họ và tên", field: "FullName" },
    { label: "Địa chỉ", field: "Address" },
    { label: "Vai trò tài khoản", field: "Role" },
    { label: "Trạng thái", field: "Status" },
    { label: "Hình", field: "image" },
  ];

  return (
    <LoadingWrapper loading={loading}>
      <ReusableTable
        data={items}
        columns={columns}
        handleApprove={handleApprove}
        handleReject={handleReject}
        search={search}  
        setSearch={setSearch} 
      />

    </LoadingWrapper>
  );
}
