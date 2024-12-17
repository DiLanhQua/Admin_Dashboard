import { useDispatch, useSelector } from "react-redux";
// import ReusableTable from "../../components/Table";
// import EyeStaff from "./details";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { deleteStaff, getStaff, resetState } from "../../redux/slices/staff";
import { DeleteConfirmationModal, handleToast } from "../../utils/toast";
import { Row, Col, Card, Modal, Button } from 'react-bootstrap';
// import axios from 'axios';
import { getDeStaffAPI, getDeLoginAPI, getAPIStaff } from "./js/AxiosStaff";
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
  const [customersPerPage, setCustomersPerPage] = useState(100);
  const [currentMax, setCurrentMax] = useState(200);
  const [open, setOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const handleShow = () => setShowDetailModal(true);
  const handleClose = () => setShowDetailModal(false);
  const [account, setAccount] = useState();
  const [login, setLogin] = useState();
  const [cPage, sPage] = useState(1); // Trang hiện tại
  const [itemsPerPage, sitemsPerPage] = useState(5);
  useEffect(() => {
    const GetStall = async () => {
      try {
        const res = await getAPIStaff(currentMax, customersPerPage, currentPage);
       

        if (res && res.data) {
          setItems(res.data); 
        } else {
          setItems([]);
        }
      } catch (er) {
        alert("Không thể xuất danh sách:", er);
      }
    };

    GetStall();
  }, [currentMax, customersPerPage, currentPage]);
  const filteredItems = items.filter(item => {
    return item.fullName.toLowerCase().includes(searchTerm.toLowerCase()); 
  });
  const currentItems = filteredItems.slice(
    (cPage - 1) * itemsPerPage,
    cPage * itemsPerPage
  );
  const indexOfLastCustomer = itemsPerPage * cPage;
  const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);


  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      sPage(newPage);
    }
  };
  const handleChangePage = (event, newPage) => {
    setRowsPerPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setCustomersPerPage(+event.target.value);
    setRowsPerPage(0);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0); 
  };


  const detaile = async (id) => {
    const response = await getDeStaffAPI(id);
    const responsee = await getDeLoginAPI(id);
    setAccount(response);
    setLogin(responsee);
    handleShow();
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
      alert("Lỗi: " + err);
    }
  };

  const roleNames = {
    0: "Quản lý",
    1: "Nhân viên",
  };
  return (
    <>
      <React.Fragment>
        <Row>
          <Col sm={12}>
            <Card>



              <div className="bg-light rounded text-center h-100 p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div className="form-floating">
                    <input
                      type="text" 
                      className="form-control"
                      id="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Tìm kiếm"
                      required
                    />
                    <label htmlFor="search">Tìm kiếm</label>
                  </div>
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
                  {currentItems.length > 0 ? (

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
                        {currentItems.map((item, stt) => (

                          <tr key={stt}>
                            <th scope="row">{item.id}</th>
                            <td>{item.fullName}</td>
                            <td>{item.address || "Chưa có địa chỉ"}</td>
                            <td>{item.email || "Chưa có email"}</td>
                            <td>{item.phone || "Chưa có số điện thoại"}</td>
                            <td>{item.userName || "Chưa có tên đăng nhập"}</td>
                            <td>
                              <IconButton
                                color="primary"
                                onClick={() => detaile(item.id)}
                                sx={{ padding: "4px" }} 
                              >
                                <RemoveRedEyeIcon />
                              </IconButton>
                              
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
                              
                              <IconButton
                                color="primary"
                                onClick={() => CTNV(item.id)}
                                sx={{ padding: "4px" }}
                              >
                                <Edit />
                              </IconButton>
                            </td>
                          </tr>
                        ))}
                      </tbody>


                    </table>
                  ) : (
                    <div>Không có dữ liệu</div>
                  )}

                  <div className="row">
                    <div className="col-lg-9">
                    </div>
                    <div className="col-lg-3">
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
                          value={itemsPerPage}
                          onChange={(e) => sitemsPerPage(Number(e.target.value))}
                        >
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="15">15</option>
                        </select>
                        <span>{`${indexOfFirstCustomer + 1}-${Math.min(indexOfLastCustomer, items.length)}`} trong {items.length}</span>
                        <div>
                          <button
                            onClick={() => handlePageChange(cPage - 1)}
                            disabled={cPage === 1}
                          >

                            &lt;
                          </button>
                          <button
                            onClick={() => handlePageChange(cPage + 1)}
                            disabled={cPage === totalPages}
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
