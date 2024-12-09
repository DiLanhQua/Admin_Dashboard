import { useCallback, useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { getBlog, deleteBlogApi } from "./post-api/post-api";

export default function PostList() {
  const [data, setData] = useState([]);
  const getAllBlog = async () => {
    try {
      const response = await getBlog();
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlog();
  }, []);

  const deleteBlog = async (id) => {
    try {
      const response = await deleteBlogApi(id);
      if (response) {
        alert("Xóa bài viết thành công");
        getAllBlog();
      }
    }
    catch (error) {
      console.log(error);
    }
  }

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
                  {data.map((item, index) => (
                    <tr>
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
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
