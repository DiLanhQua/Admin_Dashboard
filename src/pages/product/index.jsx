import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Modal } from "react-bootstrap";
import {
  getProductAPI, getMediaAPI, getImageAPI, getBrandAPI, deleteMesiaAPI, updateProductAPI, postMesiaAPI,
  getDetailproductAPI, getAllMediaAPI, postIsMediaAPI, postMediaAPI, getdetailAPI, getAllColorAPI,
  getCategoryAPI, getProduct, UPDE
} from "./js/product";
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
  const [allimages, setallImages] = useState([]);
  const [allmedias, setallMedias] = useState([]);
  // const [newImage, setNewImage] = useState(null);
  // const [isPrimary, setIsPrimary] = useState(false);
  const [detailproducts, setDetailproduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage, setCustomersPerPage] = useState(5);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [categories, setCategorys] = useState([]);
  const [product, setProduct] = useState({
    productName: '',
    categoryId: '',
    brandId: '',
    description: ''
  });
  const [productInfo, setProductInfo] = useState({
    medias: []
  });

  const [selectedDeProduct, setSelectedDeProduct] = useState({
    id: '',
    size: '',
    price: '',
    quantity: '',
    colorId: '',
    gender: '',
    status: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [showDEModal, setDEShowModal] = useState(false);
  const [colors, setColors] = useState([]);


  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShow = () => setShowDetailModal(true);
  const handleClose = () => setShowDetailModal(false);
  const handleDEShow = () => {
    setDEShowModal(true);  // This will open the modal
    handleClose();         // This should properly close the other modal (if needed)
  };

  const handleDEClose = () => {
    setDEShowModal(false); // This will close the modal
    handleShow();          // This will open the other modal (if needed)
  };

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
  const fetchColors = async () => {
    try {
      const response = await getAllColorAPI(customersPerPage, currentPage);
      if (Array.isArray(response.data)) {
        console.log("fetchColors ", response.data);
        setColors(response.data);
      } else {
        setColors([]);
      } // Cập nhật state colors với dữ liệu màu sắc
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu màu:", error);
    }
  };

  // Gọi API khi component được render
  useEffect(() => {
    fetchColors();
  }, []);
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
  const CTNV = async (item) => {
    try {
      const response = await getProduct(item.id); // Lấy thông tin sản phẩm
      const resolvedMedias = await getAllMediaAPI(item.id); // Lấy danh sách media
      console.log("Resolved medias:", resolvedMedias);

      setallMedias(resolvedMedias); // Cập nhật danh sách media vào state

      const imagePromises = resolvedMedias.map((media) =>
        getImageAPI(media.imagesId).then((image) => ({
          mediaIds: media.imagesId,
          imageUrl: image.link,
          isPrimary: media.isPrimary,
        }))
      );

      const resolvedImages = await Promise.all(imagePromises); // Đợi tất cả ảnh tải về
      console.log("resolvedImages:", resolvedImages);
      setallImages(resolvedImages); // Lưu các hình ảnh vào state


      setProduct(response); // Cập nhật thông tin sản phẩm
      setSelectedProduct(item); // Lưu sản phẩm đã chọn
      handleOpenModal(); // Mở modal
      return response.data;
    } catch (err) {
      console.error("Lỗi: " + err);
    }
  };

  const CTSP = async (detail, id) => {
    try {
      console.log("idsản phẩm: ", detail.id);
      console.log("id: ", id);
      // Gọi API để lấy thông tin sản phẩm chi tiết
      const response = await getdetailAPI(detail.id, id);

      console.log("thông tin chi tiết sản phẩm: ", response);
      // Cập nhật dữ liệu sản phẩm vào state
      setSelectedDeProduct(response);

      console.log("thông tin chi tiết: ", selectedDeProduct);
      // Mở modal để hiển thị thông tin sản phẩm
      handleDEShow();
      handleCloseModal();
      return response.data;
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu sản phẩm: " + err);
    }
  };
  const handleVariantChange = (index, field, value) => {
    setSelectedDeProduct((prev) =>
      prev.map((variant, i) => (i === index ? { ...variant, [field]: value } : variant))
    );
  };
  const handleDEInputChange = (field, value) => {
    setSelectedDeProduct(prevState => ({
      ...prevState,  // Giữ lại các thuộc tính khác
      [field]: value // Cập nhật giá trị của trường được chọn
    }));
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleChangeImage = async (imageId, file) => {
    if (!file) return;

    try {
      // Chuyển đổi file gốc sang Base64
      const base64Link = await fileToBase64(file);

      // Tạo đối tượng dữ liệu cần gửi lên backend
      const newImageLink = {
        isPrimary: false,
        link: base64Link,
      };

      // Gửi yêu cầu API để thay đổi ảnh
      const response = await postMediaAPI(imageId, selectedProduct.id, newImageLink);
      const updatedImages = allimages.map((img) => {
        if (img.mediaIds === imageId) {
          console.log("Đang thay đổi ảnh:", imageId);
          return { ...img, imageUrl: base64Link };
        }
        return img;
      });
      setallImages(updatedImages);
      console.log("response ", response);
    } catch (error) {
      console.error("Error when changing image:", error);
    }
  };
  // Hàm xử lý chọn ảnh chính
  const handleSetPrimaryImage = async (imageId) => {
    try {
      const response = await postIsMediaAPI(selectedProduct.id, imageId);
      // Cập nhật giao diện người dùng với ảnh chính mới
      console.log(response);
      const updatedImages = allimages.map((img) => {
        if (img.mediaIds === imageId) {
          return { ...img, isPrimary: true }; // Chọn ảnh làm chính
        }
        return { ...img, isPrimary: false }; // Các ảnh còn lại sẽ là phụ
      });

      setallImages(updatedImages);
    } catch (error) {
      console.error('Error when setting primary image:', error);
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      console.log("Xóa media ID:", imageId);

      // Gửi yêu cầu xóa ảnh đến API
      const response = await deleteMesiaAPI(imageId);
      console.log("Response từ API:", response);

      const updatedImages = allimages.filter((img) => img.mediaIds !== imageId);
      setallImages(updatedImages); // Cập nhật state
      console.log("Đã xóa thành công ảnh:", imageId);

    } catch (error) {
      console.error("Lỗi khi gọi API xóa ảnh:", error);
      alert("Đã xảy ra lỗi khi xóa ảnh! Vui lòng kiểm tra kết nối.");
    }
  };


  // Thêm ảnh mới
  const handleAddImage = async (newImageFile) => {
    if (!newImageFile) {
      alert("Không có file nào được chọn!");
      return;
    }
    const base64Link = await fileToBase64(newImageFile);

    // Tạo đối tượng dữ liệu cần gửi lên backend
    const newImageLink = {
      isPrimary: false,
      link: base64Link,
    };
    // Gửi tệp ảnh tới API
    const response = await postMesiaAPI(selectedProduct.id, newImageLink);
    console.log("Response từ API:", response);
    const newImage = {
      mediaIds: `new-${Date.now()}`,
      imageUrl: URL.createObjectURL(newImageFile),
      isPrimary: false,
    };
    setallImages((prevImages) => [...prevImages, newImage]);
    alert("Ảnh mới đã được thêm thành công!");
  };
  const handleSave = async (e) => {
    e.preventDefault();

    if (!product) {
      alert("Dữ liệu sản phẩm không hợp lệ!");
      return;
    }

    const formData = new FormData();
    formData.append("productName", product.productName);
    formData.append("description", product.description);
    formData.append("categoryId", product.categoryId);
    formData.append("brandId", product.brandId);
    try {
      const response = await updateProductAPI(product.id, formData);
      // console.log("Response:", response);
      if (response) {
        alert("Cập nhật sản phẩm thành công!");
        window.location.reload();
      } else {
        alert("Cập nhật sản phẩm thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi lưu:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };
  const handleupde = async (e) => {
    e.preventDefault();

    if (!product) {
      alert("Dữ liệu sản phẩm không hợp lệ!");
      return;
    }
    const formData = new FormData();
    formData.append("size", selectedDeProduct.size);
    formData.append("price", selectedDeProduct.price);
    formData.append("quantity", selectedDeProduct.quantity);
    formData.append("colorId", selectedDeProduct.colorId);
    formData.append("gender", selectedDeProduct.gender);
    formData.append("status", selectedDeProduct.status);

    try {
      console.log("Response data:", formData);
      const response = await UPDE(selectedDeProduct.id, selectedProduct.id, formData);
      console.log("Response:", response.data);

      if (response.ok) {
        alert("Cập nhật thành công!");
      } else {
        alert("Cập nhật thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi lưu:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     handleAddImage(file);
  //   }
  // };
  const handleInputChange = (field, value) => {
    setProduct(prevProduct => ({
      ...prevProduct,
      [field]: value,
    }));
  };

  // Hàm render input sản phẩm
  const renderInput = (label, value, key) => (
    <div className="col-md-4">
      <div className="form-floating custom-floating-label">
        <input
          type="text"
          className="form-control"
          value={value || ""}
          onChange={(e) => setProduct({ ...product, [key]: e.target.value })}
        />
        <label>{label}</label>
      </div>
    </div>
  );
  const rendInput = (label, value, key) => (
    <div className="col-md-6">
      <div className="form-floating custom-floating-label">
        <input
          type="number"
          className="form-control"
          value={value || ""}
          onChange={(e) => setSelectedDeProduct({ ...selectedDeProduct, [key]: e.target.value })}
        />
        <label>{label}</label>
      </div>
    </div>
  );
  const rInput = (label, value, key) => (
    <div className="form-floating custom-floating-label">
      <input
        type="text"
        className="form-control"
        value={value || ""}
        onChange={(e) => setProductInfo({ ...productInfo, [key]: e.target.value })}
      />
      <label>{label}</label>
    </div>
  );
  const handleAddVariant = () => {
    setProductInfo((prev) => ({
      ...prev,
      productDetais: [
        ...prev.productDetais,
        { size: "", price: 0, quantity: 0, color: "", gender: "" },
      ],
    }));
  };
  // const fileToBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });
  // };

  // const handleImageChange = (e) => {
  //   const file = e.target.files?.[0] || null; 
  //   if (file) {
  //     setallImages(file);
  //     setmagePreview(URL.createObjectURL(file));

  //     // Cập nhật danh sách ảnh với ảnh mới
  //     setallImages((prevImages) => [
  //       ...prevImages,
  //       { imageUrl: URL.createObjectURL(file), isPrimary: false }, // Tùy chỉnh `isPrimary`
  //     ]);
  //   } else {
  //     setallImages(null);
  //     setImagePreview(null);
  //   }
  // };

  // // Xử lý khi xóa hình ảnh
  // const handleDeleteImage = (index) => {
  //   setProductImages((prev) => prev.filter((_, i) => i !== index));
  //   setProductInfo((prev) => ({
  //     ...prev,
  //     medias: prev.medias.filter((_, i) => i !== index),
  //   }));
  // };
  return (
    <React.Fragment>
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
                    const productMedia = medias.filter((media) => media.productId === item.id);
                    const productBrans = brands.filter((bran) => bran.id === item.brandId);
                    const productCategorys = categories.filter((catego) => catego.id === item.categoryId);
                    return (
                      <tr key={item.id}>
                        <th scope="row">{indexOfFirstCustomer + stt + 1}</th>
                        <td>
                          {productMedia.map((media, index) => {

                            const productImage = images.find((image) => image.mediaId === media.imagesId);

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
                            onClick={() => CTNV(item)}
                            sx={{ padding: "4px" }} // Reduced padding for action buttons
                          >
                            <Edit />
                          </IconButton>
                          {/* <EditProductModal
                            show={showModal}
                            handleClose={handleCloseModal}
                            selectedProduct={selectedProduct}
                            brands={brands}
                            categories={categories}
                            images={images}
                            handleSave={handleSaveChanges}
                          /> */}
                        </td>
                      </tr>
                    );
                  })}
                  <Modal show={showDetailModal}
                    onHide={handleClose} size="xl">
                    <Modal.Header closeButton>
                      <Modal.Title>
                        Thông Tin Chi Tiết Sản Phẩm: {selectedProduct?.productName || "N/A"}
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {detailproducts ? (
                        <div className="">
                          <div className="dialog-tabs">
                            <button
                              className={`tab-btn ${activeTab === "info" ? "active" : ""}`}
                              onClick={() => setActiveTab("info")}
                            >
                              THÔNG TIN CHI TIẾT SẢN PHẨM
                            </button>
                          </div>

                          <div className="">
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
                                  <th scope="col">
                                    <Button variant="primary" type="submit">
                                      Thêm
                                    </Button>
                                  </th>
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
                                          // console.log("productImage: ", productImage);
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
                                      <td>
                                        <Button variant="primary" type="submit" onClick={() => CTSP(detail, selectedProduct.id)}>
                                          Sửa
                                        </Button>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ) : (
                        <p>Đang tải thông tin...</p>
                      )}
                    </Modal.Body>
                    <Modal.Footer>
                      <button className="close-btn" onClick={handleClose}>
                        Đóng
                      </button>
                    </Modal.Footer>
                  </Modal>
                  <Modal show={showDEModal} onHide={handleDEClose} size="xl">
                    <Modal.Header closeButton>
                      <Modal.Title>Sửa Thông Tin Chi Tiết Sản Phẩm : {selectedProduct?.productName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="container">
                        {selectedDeProduct ? (
                          <form onSubmit={handleupde}>
                            <div key={selectedDeProduct.id}>
                              <div className="variant-header">
                                {/* Nút trạng thái */}
                                <button
                                  style={{
                                    backgroundColor:
                                      selectedDeProduct.status === "còn hàng"
                                        ? "green"
                                        : selectedDeProduct.status === "hết hàng"
                                          ? "red"
                                          : "yellow",
                                    color: "white",
                                    border: "none",
                                    padding: "5px 10px",
                                    borderRadius: "5px",
                                    fontSize: "12px",
                                    cursor: "default",
                                    position: "absolute",
                                    top: "10px",
                                    left: "10px",
                                  }}
                                  disabled
                                >
                                  {selectedDeProduct.status}
                                </button>

                                {/* Tiêu đề biến thể */}
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-floating custom-floating-label">
                                    <select
                                      className="form-select"
                                      id="colorId"
                                      value={selectedDeProduct.colorId || ""}
                                      onChange={(e) => handleDEInputChange("colorId", e.target.value)}
                                    >
                                      <option value="">Chọn màu sắc</option>
                                      {colors.map((item) => (
                                        <option key={item.id} value={item.id}>
                                          {item.nameColor}  {/* Hiển thị tên màu */}
                                        </option>
                                      ))}
                                    </select>
                                    <label htmlFor="colorId">Màu sắc</label>
                                  </div>

                                </div>
                                <div className="col-md-6">
                                  <div className="form-floating custom-floating-label">
                                    <select
                                      className="form-select"
                                      id="gender"
                                      // value={gender}
                                      // onChange={(e) => setGender(e.target.value)}

                                      value={selectedDeProduct.gender || ""}
                                      onChange={(e) => handleDEInputChange("gender", e.target.value)}

                                    >
                                      <option value="" >Chọn giới tính</option>
                                      <option value="male">Nam</option>
                                      <option value="female">Nữ</option>
                                      <option value="other">Khác</option>
                                    </select>
                                    <label htmlFor="gender">Giới tính</label>
                                  </div>
                                </div>
                              </div>
                              {/* Size - select */}


                              <div className="row">

                                {rendInput("Số lượng", selectedDeProduct.quantity, "quantity")}

                                {/* Giá bán - input */}
                                {rendInput("Giá bán", selectedDeProduct.price, "price")}

                              </div>
                              <div className="col-md-12">
                                <div className="form-floating custom-floating-label">
                                  <select
                                    className="form-select"
                                    id="size"
                                    value={selectedDeProduct.size || ""}
                                    onChange={(e) => handleDEInputChange("size", e.target.value)}
                                  >
                                    <option value="" >
                                      Chọn kích thước
                                    </option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                  </select>
                                  <label htmlFor="size">Kích thước</label>
                                </div>

                              </div>
                            </div>

                            <Button variant="primary" type="submit">
                              Lưu Thay Đổi
                            </Button>
                          </form>
                        ) : (
                          <p>Không có thông tin biến thể.</p>
                        )}
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleDEClose}>
                        Đóng
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  <Modal show={showModal} onHide={handleCloseModal} size="xl">
                    <Modal.Header closeButton>
                      <Modal.Title>Sửa Thông Tin Sản Phẩm : {selectedProduct?.productName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {product ? (
                        <div className="overflow-y-auto">
                          <div className="dialog-tabs">
                            <button className={`tab-btn active`} >
                              THÔNG TIN SẢN PHẨM
                            </button>
                          </div>
                          <form>
                            {activeTab === "info" && (
                              <>
                                <div className="mt-4">
                                  <div className="row">
                                    {renderInput("Tên Sản Phẩm", product.productName, "productName")}
                                    <div className="col-md-4">
                                      <div className="form-floating custom-floating-label">
                                        <select
                                          className="form-select"
                                          id="categoryId"
                                          value={product.categoryId}
                                          onChange={(e) => handleInputChange("categoryId", e.target.value)}
                                        >
                                          <option value="" disabled hidden>Loại sản phẩm</option>
                                          {categories.map((item) => (
                                            <option key={item.id} value={item.id}>
                                              {item.categoryName}
                                            </option>
                                          ))}
                                        </select>
                                        <label htmlFor="categoryId">Danh mục</label>
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="form-floating custom-floating-label">
                                        <select
                                          className="form-select"
                                          id="brandId"
                                          value={product.brandId}
                                          onChange={(e) => handleInputChange("brandId", e.target.value)}
                                        >
                                          <option value="" disabled hidden>Chọn thương hiệu</option>
                                          {brands.map((item) => (
                                            <option key={item.id} value={item.id}>
                                              {item.brandName}
                                            </option>
                                          ))}
                                        </select>
                                        <label htmlFor="brand">Thương hiệu</label>
                                      </div>
                                    </div>

                                  </div>
                                  <div className="row">
                                    <div className="col-md-12">
                                      <div className="form-floating custom-floating-label">
                                        <input
                                          type="text"
                                          className="form-control"
                                          value={product.description || ""}
                                          onChange={(e) => setProduct({ ...product, ["description"]: e.target.value })}
                                        />
                                        <label>Mô tả sản phẩm</label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <div className="dialog-tabs">
                                    <button
                                      className={`tab-btn active`}
                                    >
                                      HÌNH ẢNH SẢN PHẨM
                                    </button>
                                  </div>
                                  <div className="mt-4">
                                    {/* Khu vực hiển thị danh sách ảnh */}
                                    <div className="list-images">
                                      <div className="image-preview" style={{ height: '16rem' }}>
                                        <label htmlFor="image" className="image-label">
                                          <div className="image-placeholder">
                                            <i className="fas fa-camera"></i>
                                            <span className="image-tx">Chọn hình ảnh bìa</span>
                                          </div>
                                        </label>
                                        <input
                                          type="file"
                                          id="image"
                                          onChange={(e) => handleAddImage(e.target.files[0])} // Thêm ảnh mới
                                          accept="image/*"
                                          style={{ display: 'none' }}
                                        />
                                      </div>
                                      {allimages.map((img) => (
                                        <div key={img.mediaIds} className="image-item">
                                          <img
                                            src={img.imageUrl}
                                            alt="Product"
                                          />
                                          {/* Nút xóa */}
                                          {!img.isPrimary && (
                                            <button onClick={() => handleDeleteImage(img.mediaIds)} >
                                              X
                                            </button>
                                          )}
                                          {/* Nút đánh dấu là ảnh chính */}
                                          {!img.isPrimary && (
                                            <div onClick={() => handleSetPrimaryImage(img.mediaIds)} >
                                              Chọn làm ảnh chính
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </form>
                        </div>
                      ) : (
                        <p>Đang tải thông tin...</p>
                      )}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseModal}>
                        Đóng
                      </Button>
                      <Button variant="primary" onClick={handleSave}>
                        Lưu Thay Đổi
                      </Button>
                    </Modal.Footer>
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
                      style={{ padding: "5px", border: "none" }}
                      value={customersPerPage}
                      onChange={(e) => setCustomersPerPage(Number(e.target.value))}
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="25">25</option>
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
        </Col>
      </Row>
    </React.Fragment >
  );
}
