import { useCallback, useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { getBlog, deleteBlogApi } from "./post-api/post-api";

export default function PostList() {
  const [data, setData] = useState([]);
  const [cPage, sPage] = useState(1);
  const [itemsPerPage, sitemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const getAllBlog = async () => {
    try {
      const response = await getBlog();
      setData(response);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getAllBlog();
  }, []);
  const filteredItems = data.filter(item => {
    return item.headLine.toLowerCase().includes(searchTerm.toLowerCase()); 
  });
  const currentItems = filteredItems.slice(
    (cPage - 1) * itemsPerPage,
    cPage * itemsPerPage
  );
  const indexOfLastCustomer = itemsPerPage * cPage;
  const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const deleteBlog = async (id) => {
    try {
      const response = await deleteBlogApi(id);
      if (response) {
        alert("Xóa bài viết thành công");
        getAllBlog();
      }
    }
    catch (error) {
      alert(error);
    }
  }
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      sPage(newPage);
    }
  };
  return (
    <>
      <Row>
        <Col sm={12}>
          <div className="bg-light rounded text-center h-100 p-4 page-header bg-white">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm kiếm"
                />
                <label htmlFor="search">Tìm kiếm</label>
              </div>
              {/* <a href="/dashboard/staff/create" className="create-stall">
                  Thêm mới
                </a> */}
              <Link to={"/dashboard/post/create"}>
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
                    <th scope="col">Hình ảnh</th>
                    <th scope="col">Tiêu đề</th>
                    <th scope="col">Người đăng</th>
                    <th scope="col">Ngày đăng</th>
                    <th scope="col">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr key={index}>
                      <th>
                        {index + 1}
                      </th>
                      <th>
                        <img
                          src={`https://localhost:7048/${item.image}`}
                          alt={`media-${item.id}`}
                          style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        />
                      </th>
                      <th>
                        {item.headLine}
                      </th>
                      <th>
                        {item.fullName}
                      </th>
                      <th>
                        {item.datePush}
                      </th>
                      <th>
                        <Link to={`/dashboard/post/edit/${item.id}`}>
                          <IconButton
                            color="primary"
                            sx={{ padding: "4px" }} // Reduced padding for action buttons
                          >
                            <Edit />
                          </IconButton>
                        </Link>

                        <IconButton
                          onClick={() => deleteBlog(item.id)}
                          sx={{ color: "red", padding: "4px" }} // Reduced padding for action buttons
                        >
                          <Delete />
                        </IconButton>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                      <option value="25">25</option>
                    </select>
                    <span>{`${indexOfFirstCustomer + 1}-${Math.min(indexOfLastCustomer, data.length)}`} trong {data.length}</span>
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
        </Col>
      </Row>
    </>
  );
}
