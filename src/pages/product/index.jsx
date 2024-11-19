import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { getProductAPI, getMediaAPI, getImageAPI, getBrandAPI } from "./js/product";
import { useNavigate } from "react-router-dom";

export default function StaffPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [brands, setBrands] = useState([]);
  const [medias, setMedias] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage, setCustomersPerPage] = useState(5);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const handleShow = () => setShowDetailModal(true);
  const handleClose = () => setShowDetailModal(false);

  useEffect(() => {
    const GetStall = async () => {
      try {
        const res = await getProductAPI(customersPerPage, currentPage);
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
  }, [customersPerPage, currentPage]);
  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const brandPromises = items.map((item) => getBrandAPI(item.brandId));
        const resolvedBrands = await Promise.all(brandPromises);
        console.log("resolvedBrands: ", JSON.stringify(resolvedBrands, null, 2));
        setBrands(resolvedBrands);
      } catch (error) {
        console.error("Lỗi khi lấy media cho sản phẩm:", error);
      }
    };

    if (items.length > 0) {
      fetchBrand();
    }
  }, [items]);
  useEffect(() => {
    const fetchMediaForProducts = async () => {
      try {
        const mediaPromises = items.map((item) => getMediaAPI(item.id));
        const resolvedMedias = await Promise.all(mediaPromises);
        setMedias(resolvedMedias);
      } catch (error) {
        console.error("Lỗi khi lấy media cho sản phẩm:", error);
      }
    };

    if (items.length > 0) {
      fetchMediaForProducts();
    }
  }, [items]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imagePromises = medias.flat().map((media) => {
          return getImageAPI(media.imageId).then((image) => ({
            mediaId: media.imageId,
            imageUrl: image.link,
          }));
        });

        // In ra console để kiểm tra các promises
        console.log("imagePromises: ", imagePromises);

        const resolvedImages = await Promise.all(imagePromises);

        // Sử dụng JSON.stringify để kiểm tra chi tiết đối tượng trong resolvedImages
        console.log("resolvedImages: ", JSON.stringify(resolvedImages, null, 2));

        setImages(resolvedImages);
      } catch (error) {
        console.error("Lỗi khi lấy media cho sản phẩm:", error);
      }
    };

    if (medias.length > 0) {
      fetchImage();
    }
  }, [medias]);


  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = items.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(items.length / customersPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
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
                  />
                  <label htmlFor="search">Tìm kiếm</label>
                </div>
                <a href="/dashboard/staff/create" className="create-stall">
                  Thêm mới
                </a>
              </div>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Hình ảnh</th>
                      <th scope="col">Tên sản phẩm</th>
                      <th scope="col">Thương hiệu</th>
                      <th scope="col">Loại</th>
                      <th scope="col">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCustomers.map((item, stt) => {
                      const productMedia = medias.filter((media) => media.productId === item.id);
                      const productBrans = brands.filter((bran) => bran.id === item.brandId);
                      return (
                        <tr key={item.id}>
                          <th scope="row">{indexOfFirstCustomer + stt + 1}</th>
                          <td>
                            {productMedia.map((media, index) => {
                              console.log("media: ", media);
                              console.log("images: ", images);

                              const productImage = images.find((image) => image.mediaId === media.imageId);
                              console.log("Found product image: ", productImage);
                              console.log("media.imageId " + media.imageId);
                              console.log("productMedia " + productMedia);
                              console.log("productImage " + productImage);
                              return (
                                productImage && (
                                  <img
                                    key={index}
                                    src={productImage.imageUrl}
                                    alt={`media-${item.id}`}
                                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                  />
                                )
                              );
                            })}
                          </td>
                          <td>{item.productName}</td>
                          <td>{item.categoryId || "Chưa có địa chỉ"}</td>
                          <td>
                          {productBrans.length > 0 && (
  <p>{productBrans[0].brandName}</p>
)}
                          </td>
                          <td>
                            <Button variant="primary" onClick={() => setSelectedEmployee(item)}>
                              Xem
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <span>Bản ghi trang:</span>
                  <select
                    style={{ padding: "5px" }}
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
                      style={{ padding: "5px", marginRight: "5px" }}
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      &lt;
                    </button>
                    <button
                      style={{ padding: "5px" }}
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      &gt;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}
