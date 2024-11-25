import { useDispatch, useSelector } from "react-redux";
// import ReusableTable from "../../components/Table";
// import EyeStaff from "./details";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { deleteStaff, getStaff, resetState } from "../../redux/slices/staff";
import { DeleteConfirmationModal, handleToast } from "../../utils/toast";
import { Row, Col, Card, Modal, Button } from 'react-bootstrap';
// import axios from 'axios';
import { getStaffAPI, getDeStaffAPI, getDeLoginAPI } from "./js/AxiosStaff";
import "../staff/css/staff.css";
import EyeStaff from './details/index';
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import { Edit } from "@mui/icons-material";
import {
  IconButton
} from "@mui/material";
export default function StaffPage() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [items, setItems] = useState([]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage, setCustomersPerPage] = useState(2);
  const [currentMax, setCurrentMax] = useState(200);
  const [open, setOpen] = useState(false);

  const [showDetailModal, setShowDetailModal] = useState(false);
  const handleShow = () => setShowDetailModal(true);
  const handleClose = () => setShowDetailModal(false);
  const [account, setAccount] = useState();
  const [login, setLogin] = useState();
  useEffect(() => {
    const GetStall = async () => {
      try {
        const res = await getStaffAPI(currentMax, customersPerPage, currentPage);
        console.log("DỮ LIỆU:", res.data);
        if (Array.isArray(res.data)) {
          setItems(res.data);
        } else {
          setItems([]);
        }
      } catch (er) {
        console.error("Không thể xuất danh sách: ", er);
      }
    };

    GetStall();
  }, [currentMax, customersPerPage, currentPage]);

  const detaile = async (id) => {
    console.log("id ", id)
    const response = await getDeStaffAPI(id);
    const responsee = await getDeLoginAPI(id);
    setAccount(response);
    setLogin(responsee);
    // handleShow(); 
    console.log("de: " + response);
    handleShow();
  };


  // const DetailStall = 
  // Tính tổng số trang dựa trên `currentMax` và `customersPerPage`
  const totalPages = Math.ceil(currentMax / customersPerPage); 
  console.log("totalPages ",totalPages) ;// Tính tổng số trang
  const indexOfLastCustomer = currentPage * customersPerPage;
  console.log("indexOfFirstCustomer ",indexOfLastCustomer);
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;

  console.log("indexOfFirstCustomer ",indexOfFirstCustomer);
  // Lọc ra dữ liệu của trang hiện tại
  const currentCustomers = items.slice(indexOfFirstCustomer, indexOfLastCustomer);

  console.log("currentCustomers ",currentCustomers);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);  // Cập nhật trang hiện tại
    }
  };

  const openDetailModal = (employee) => {
    setSelectedEmployee(employee);
    handleShow();
  };
  const CTNV = async (id) => {
    try {
      const response = await getDeStaffAPI(id);
      navigate(`/dashboard/staff/edit/${id}`);
      return response.data;
    } catch (err) {
      console.error("Lỗi: " + err);
    }
  };

  const roleNames = {
    0: "Quản lý",
    2: "Nhân viên",
    1: "Khách hàng"
  };
  return (
    <>
      <React.Fragment>
        <Row>
          <Col sm={12}>
            <Card>

              {/* Left side: Search Input and Filters */}



              <div className="bg-light rounded text-center h-100 p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div className="form-floating">
                    <input
                      type="text" // Thay đổi từ "password" thành "text" cho tìm kiếm
                      className="form-control"
                      id="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Tìm kiếm"
                      required
                    />
                    <label htmlFor="search">Tìm kiếm</label> {/* Thay đổi nhãn từ "Mật Khẩu" thành "Tìm kiếm" */}
                  </div>


                  {/* <a href="/dashboard/staff/create"
                    className="create-stall"

                  >
                    Thêm mới
                  </a> */}
                  <Link to={"/dashboard/staff/create"}>
                    <Button
                      variant="primary"
                      className="custom-button"
                      sx={{ mr: 2 }}
                    >
                      <ControlPointIcon sx={{ marginRight: 1 }} />
                      Thêm mới
                    </Button>
                  </Link>
                </div>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Họ tên</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Email</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Tên đăng nhập</th>
                        <th scope="col">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentCustomers?.map((item, stt) => (
                        <tr key={item.id}>
                          <th scope="row">{indexOfFirstCustomer + stt + 1}</th>
                          <td>{item.fullName}</td>
                          <td>{item.address || "Chưa có địa chỉ"}</td>
                          <td>{item.email || "Chưa có email"}</td>
                          <td>{item.phone || "Chưa có số điện thoại"}</td>
                          <td>{item.userName || "Chưa có tên đăng nhập"}</td>
                          <td>
                            <IconButton
                              color="primary"
                              onClick={() => detaile(item.id)}
                              sx={{ padding: "4px" }} // Reduced padding for action buttons
                            >
                              <RemoveRedEyeIcon />
                            </IconButton>
                            {/* <Button variant="primary" onClick={() => detaile(item.id)}>
        Xem 
      </Button> */}

                            {/* Modal hiển thị thông tin chi tiết nhân viên */}
                            <Modal show={showDetailModal} onHide={handleClose} size="lg">
                              <Modal.Header closeButton>
                                <Modal.Title>Thông Tin Chi Tiết Nhân Viên</Modal.Title>
                              </Modal.Header>
                              <Modal.Body >
                                {account ? (
                                  <div className="dialog">
                                    <div className="dialog-content">
                                      <div className="avatar-container">
                                        <img
                                          src={account?.image || '/static/images/avatar/1.jpg'}
                                          alt="Profile Image"
                                          className="avatar"
                                        />
                                        <h3 className="name">{account?.fullName}</h3>
                                        <p className="role"> Role: {roleNames[account?.role] || "Không xác định"}</p>

                                      </div>

                                      <div className="info-grid">
                                        <div className="info-item">
                                          <span className="icon">&#x1F4C5;</span>
                                          <p className="p-item">Id: {login?.accountId}</p>
                                        </div>
                                        <div className="info-item">
                                          <span className="icon">&#x2709;</span>
                                          <p className="p-item">Email: {account?.email}</p>
                                        </div>
                                        <div className="info-item">
                                          <span className="icon">&#x1F464;</span>
                                          <p className="p-item">Tên đăng nhập: {account?.userName}</p>
                                        </div>
                                        <div className="info-item">
                                          <span className="icon"><i class=" fas fa-solid fa-lock"></i></span>
                                          <p className="p-item">Mật khẩu: {account?.password}</p>
                                        </div>
                                        <div className="info-item">
                                          <span className="icon">&#x1F4F1;</span>
                                          <p className="p-item">SĐT: {account?.phone}</p>
                                        </div>
                                        <div className="info-item">
                                          {login?.action === 'Chờ xác nhận' ? (
                                            <span className="icon red-icon">&#x1F534;</span> // Icon màu đỏ
                                          ) : (
                                            <span className="icon green-icon">&#x1F7E2;</span> // Icon màu xanh
                                          )}
                                          <p className="p-item">Trạng Thái: {login?.action}</p>
                                        </div>


                                      </div>
                                      <div className="in-item">
                                        <div className="info-item">
                                          <span className="icon">
                                            <i className="fas fa-map-marker-alt" />
                                          </span>
                                          <p className="p-item">Địa chỉ: {account?.address}</p>
                                        </div>
                                        <div className="info-item">
                                          <span className="icon"><i class="fas fa-regular fa-clock"></i></span>
                                          <p className="p-item">Ngày tạo: {login?.timeStamp}</p>
                                        </div>
                                        <div className="info-item">
                                          <span className="icon"><i class="fas fa-solid fa-book-open"></i></span>
                                          <p className="p-item">Mô Tả: {login?.description}</p>
                                        </div>
                                      </div>
                                      <div className="dialog-actions">
                                        <button className="close-btn" onClick={handleClose}>Đóng</button>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <p>Đang tải thông tin...</p>
                                )}
                              </Modal.Body>
                            </Modal>
                            {/* <button className="btn btn-warning ml-2" onClick={() => CTNV(item.id)}>
                              Sửa
                            </button> */}
                            <IconButton
                              color="primary"
                              onClick={() => CTNV(item.id)}
                              sx={{ padding: "4px" }} // Reduced padding for action buttons
                            >
                              <Edit />
                            </IconButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>


                  </table>
                  <div className="row">
                    <div className="col-lg-8">
                      {/* Không cần thay đổi gì thêm ở đây */}
                    </div>
                    <div className="col-lg-4">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: "10px",
                        }}
                      >
                        <span>Số dòng mỗi trang</span>
                        <select
                          style={{ padding: "5px", border: "none" }}
                          value={customersPerPage}
                          onChange={(e) => setCustomersPerPage(Number(e.target.value))}
                        >
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="15">15</option>
                        </select>
                        <span>{`${indexOfFirstCustomer + 1}-${Math.min(indexOfLastCustomer, items.length)}`}</span>
                        <div>
                          <button
                            style={{ padding: "5px", marginRight: "5px", border: "none" }}
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            &lt;
                          </button>
                          <button
                            style={{ padding: "5px", border: "none" }}
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            &gt;
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </Card>
          </Col>
        </Row>
      </React.Fragment>
    </>
  );
}
