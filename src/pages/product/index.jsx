import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Modal } from "react-bootstrap";
import { getProductAPI, getMediaAPI, getImageAPI, getBrandAPI, getDetailproductAPI,getAllCategoryAPI,getCategoryAPI, getProduct } from "./js/product";
import { useNavigate, Link } from "react-router-dom";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { IconButton } from "@mui/material";
import "./css/product.css";
import { Edit } from "@mui/icons-material";
export default function StaffPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [brands, setBrands] = useState([]);
  const [medias, setMedias] = useState([]);
  const [images, setImages] = useState([]);
  const [detailproducts, setDetailproduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage, setCustomersPerPage] = useState(5);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [Categorys, setCategorys] = useState([]); 




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
    const fetchCategory = async () => {
      try {
        const CategoryPromises = items.map((item) => getCategoryAPI(item.categoryId));
        const resolvedBrands = await Promise.all(CategoryPromises);
        setCategorys(resolvedBrands);
      } catch (error) {
        console.error("Lỗi khi lấy media cho sản phẩm:", error);
      }
    };

    if (items.length > 0) {
      fetchCategory();
    }
  }, [items]);
  useEffect(() => {
    const fetchMediaForProducts = async () => {
      try {
        const mediaPromises = items.map((item) => getMediaAPI(item.id));
        const resolvedMedias = await Promise.all(mediaPromises);

        // console.log("imagePromises: ", resolvedMedias);

        console.log("resolvedImages: ", JSON.stringify(resolvedMedias, null, 2));
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
          return getImageAPI(media.imagesId).then((image) => ({
            mediaId: media.imagesId,
            imageUrl: image.link,
          }));
        });

        // console.log("imagePromises: ", imagePromises);

        const resolvedImages = await Promise.all(imagePromises);

        // console.log("resolvedImages: ", JSON.stringify(resolvedImages, null, 2));

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
  const detaile = async (item) => {
    try {
      console.log("id ", item.productName)
      const response = await getDetailproductAPI(item.id);
      // const responsee = await getDeLoginAPI(id);
      setDetailproduct(response);
      setSelectedProduct(item);
      //  setLogin(responsee);
      console.log("de: " + response);
      handleShow();
    } catch (error) {
      console.error("Lỗi khi tải thông tin chi tiết sản phẩm: ", error);
    }
  };
  const CTNV = async (id) => {
    try {
      const response = await getProduct(id);
      navigate(`/dashboard/product/update/${id}`);
      return response.data;
    } catch (err) {
      console.error("Lỗi: " + err);
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
                {/* <a href="/dashboard/staff/create" className="create-stall">
                  Thêm mới
                </a> */}
                <Link to={"/dashboard/product/create"}>
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
                      <th scope="col">Tên sản phẩm</th>
                      <th scope="col">Thương hiệu</th>
                      <th scope="col">Loại</th>
                      <th scope="col">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCustomers.map((item, stt) => {
                      
                      console.log("medias ", medias);
                      const productMedia = medias.filter((media) => media.productId === item.id);
                      console.log("productMedia ", productMedia);
                      const productBrans = brands.filter((bran) => bran.id === item.brandId);
                      const productCategorys = Categorys.filter((catego) => catego.id === item.categoryId);
                      return (
                        <tr key={item.id}>
                          <th scope="row">{indexOfFirstCustomer + stt + 1}</th>
                          <td>
                            {productMedia.map((media, index) => {

                              const productImage = images.find((image) => image.mediaId === media.imagesId);
                               console.log("productImage1 : ",productImage);
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
                          <td>
                          {productCategorys.length > 0 && (
                              <p>{productCategorys[0].categoryName}</p>
                            )}
                            {/* {Categorys.categoryName} */}
                            </td>
                          <td>
                            {productBrans.length > 0 && (
                              <p>{productBrans[0].brandName}</p>
                            )}
                          </td>
                          <td>
                            <IconButton
                              color="primary"
                              onClick={() => detaile(item)}
                              sx={{ padding: "4px" }}
                            >
                              <RemoveRedEyeIcon />
                            </IconButton>
                            <IconButton
                              color="primary"
                              onClick={() => CTNV(item.id)}
                              sx={{ padding: "4px" }} // Reduced padding for action buttons
                            >
                              <Edit />
                            </IconButton>

                          </td>
                        </tr>
                      );
                    })}
                    <Modal show={showDetailModal}
                      onHide={handleClose} size="lg">
                      <Modal.Header closeButton>
                        <Modal.Title>
                          Thông Tin Chi Tiết Sản Phẩm: {selectedProduct?.productName || "N/A"}
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {detailproducts ? (
                          <div className="dialog">
                            <div className="dialog-tabs">
                              <button
                                className={`tab-btn ${activeTab === "info" ? "active" : ""}`}
                                onClick={() => setActiveTab("info")}
                              >
                                Xem Thông Tin
                              </button>
                              <button
                                className={`tab-btn ${activeTab === "description" ? "active" : ""}`}
                                onClick={() => setActiveTab("description")}
                              >
                                Xem Mô Tả Sản Phẩm
                              </button>
                            </div>
                            <div className="dialog-content">
                              {activeTab === "info" && (
                                <div className="table-responsive">
                                  <table className="table">
                                    <thead>
                                      <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Hình ảnh</th>
                                        <th scope="col">Tên sản phẩm</th>
                                        <th scope="col">Kích thước</th>
                                        <th scope="col">Màu sắc</th>
                                        <th scope="col">Số lượng</th>
                                        <th scope="col">Giá</th>
                                        <th scope="col">Giới tính</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {detailproducts.map((detail, index) => {
                                        const productMedia = medias.filter((media) => media.productId === selectedProduct?.id);
                                        const mediaForProduct = productMedia.filter(
                                          (media) => media.productId === selectedProduct?.id
                                        );

                                        return (
                                          <tr key={detail.id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>
                                              {mediaForProduct.map((media, mediaIndex) => {
                                                const productImage = images.find(
                                                  (image) => image.mediaId === media.imagesId
                                                );
                                                console.log("productImage: ", productImage);
                                                return (
                                                  productImage && (
                                                    // <img
                                                    //   key={mediaIndex}
                                                    //   src={productImage.imageUrl}
                                                    //   alt={`media-${detail.id}`}
                                                    //   style={{
                                                    //     width: "50px",
                                                    //     height: "50px",
                                                    //     objectFit: "cover",
                                                    //   }}
                                                    // />
                                                    <img
                                                      key={mediaIndex
                                                      }
                                                      src={productImage.imageUrl}
                                                      alt={`media-${selectedProduct.id}`}
                                                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                                    />
                                                  )
                                                );
                                              })}
                                            </td>
                                            <td>{selectedProduct.productName}</td>
                                            <td>{detail.size}</td>
                                            <td>{detail.colorId}</td>
                                            <td>{detail.quantity}</td>
                                            <td>{detail.price}</td>
                                            <td>{detail.gender}</td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </div>)}
                              {activeTab === "description" && (
                                <div className="description-container">
                                  <h5>Mô Tả Sản Phẩm</h5>
                                  <p>{selectedProduct?.description || "Không có mô tả."}</p>
                                </div>
                              )}
                              <div className="dialog-actions">
                                <button className="close-btn" onClick={handleClose}>
                                  Đóng
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <p>Đang tải thông tin...</p>
                        )}
                      </Modal.Body>
                    </Modal>




                    
                  </tbody>

                </table>
<div className="row">
  <div className="col-lg-8">

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
                    style={{ padding: "5px",  border: "none"}}
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
                      style={{ padding: "5px", marginRight: "5px" , border: "none"}}
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      &lt;
                    </button>
                    <button
                      style={{ padding: "5px", border: "none"}}
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
  );
}
