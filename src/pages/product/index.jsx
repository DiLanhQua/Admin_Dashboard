import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Modal } from "react-bootstrap";
import {
  getProductAPI, getMediaAPI, getImageAPI, getBrandAPI, deleteMesiaAPI, updateProductAPI, postMesiaAPI,
  getDetailproductAPI, postIsMediaAPI, postMediaAPI, getdetailAPI, getAllColorAPI, getProduct, UPDE,
  getAllCategoryAPI, getAllBrandAPI, isPrimaryImageProduct,
  createDetailProduct
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
        console.log(res);
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
        const brans = await getAllBrandAPI(1000, currentPage);
        setBrands(brans.data);
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
        const categorys = await getAllCategoryAPI(customersPerPage, currentPage);
        setCategorys(categorys.data);
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

  let [pro, setPro] = useState({});
  const detaile = async (item) => {
    try {
      const response = await getDetailproductAPI(item.id);
      setPro(item);
      setDetailproduct(response);
      setSelectedProduct(item);
      handleShow();
    } catch (error) {
      console.error("Lỗi khi tải thông tin chi tiết sản phẩm: ", error);
    }
  };
  const CTNV = async (item) => {
    try {
      const response = await getProduct(item.id); // Lấy thông tin sản phẩm

      const resolvedImages = await getImageAPI(item.id)
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
      // Gọi API để lấy thông tin sản phẩm chi tiết
      const response = await getdetailAPI(detail.id, id);

      console.log("thông tin chi tiết sản phẩm: ", response);
      // Cập nhật dữ liệu sản phẩm vào state
      setSelectedDeProduct(response);
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
      const response = await isPrimaryImageProduct(imageId);

      if (response) {
        alert("Cập nhật ảnh chính thành công")
        const resolvedImages = await getImageAPI(response.productId)
        setallImages(resolvedImages); // Lưu các hình ảnh vào state
      }
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
    const newImage = {
      id: response.data.id,
      link: response.data.link,
      isImage: false,
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
    try {
      const response = await UPDE(selectedDeProduct.id, selectedDeProduct);
      if (response) {
        alert("Cập nhật sản phẩm chi tiết thành công!");
        setDEShowModal(false); // This will close the modal
        handleShow();
        const productsDetail = await getDetailproductAPI(selectedDeProduct.productId);
        setDetailproduct(productsDetail);
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

  //#region Thêm chi tiết đơn hàng
  const [openCreate, setOpenCreate] = useState(false);
  const [detaiProducts, setDetailProduct] = useState({
    id: '',
    size: '',
    price: '',
    quantity: '',
    colorId: '',
    gender: '',
    status: '',
  });

  const closeCreate = () => {
    setOpenCreate(false); // This will close the modal
    handleShow();
  }
  const onChangeCreate = (field, value) => {
    setDetailProduct(prevState => ({
      ...prevState,  // Giữ lại các thuộc tính khác
      [field]: value // Cập nhật giá trị của trường được chọn
    }));
  };

  const handleCreateDetail = async () => {
    try {
      const reponse = await createDetailProduct(detailproducts[0].productId, detaiProducts);
      if (reponse) {
        alert("Thêm chi tiết đơn hàng thành công")
        const productsDetail = await getDetailproductAPI(detailproducts[0].productId);
        setDetailproduct(productsDetail);
        closeCreate();
        setDetailProduct({
          id: '',
          size: '',
          price: '',
          quantity: '',
          colorId: '',
          gender: '',
          status: '',
        });
      }
    }
    catch (err) {
      console.log(err);
      alert("Thêm chi tiết sản phẩm thất bại");
    }
  }

  //#endregion

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
                    const productBrans = brands.filter((bran) => bran.id === item.brandId);
                    const productCategorys = categories.filter((catego) => catego.id === item.categoryId);
                    return (
                      <tr key={item.id}>
                        <th scope="row">{indexOfFirstCustomer + stt + 1}</th>
                        <td>
                          <img
                            src={`https://localhost:7048/${item.imagePrimary}`}
                            alt={`media-${item.id}`}
                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                          />
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
                                  <th scope="col">Kích thước</th>
                                  <th scope="col">Màu sắc</th>
                                  <th scope="col">Số lượng</th>
                                  <th scope="col">Giá</th>
                                  <th scope="col">Giới tính</th>
                                  <th scope="col">
                                    <Button variant="primary" onClick={() => setOpenCreate(true)}>
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
                                      <td>Size {detail.size}</td>
                                      <td>{detail.color.nameColor}</td>
                                      <td>{detail.quantity}</td>
                                      <td>{detail.price.toLocaleString("vi-VN")}.000VND</td>
                                      <td style={{ textTransform: "uppercase" }}>{detail.gender}</td>
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

                  {/* Thêm chi tiết sản phẩm */}
                  <Modal show={openCreate} onHide={closeCreate} size="xl">
                    <Modal.Header closeButton>
                      <Modal.Title>Thêm Thông Tin Chi Tiết Sản Phẩm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="container">
                        <form>
                          <div>
                            <div className="variant-header">
                              {/* Tiêu đề biến thể */}
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-floating custom-floating-label">
                                  <select
                                    className="form-select"
                                    id="colorId"
                                    value={detaiProducts.colorId}
                                    onChange={(e) => onChangeCreate("colorId", e.target.value)}
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
                                    value={detaiProducts.gender}
                                    onChange={(e) => onChangeCreate("gender", e.target.value)}
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
                              <div className="col-md-6">
                                <div className="form-floating custom-floating-label">
                                  <input
                                    type="number"
                                    className="form-control"
                                    value={detaiProducts.quantity}
                                    onChange={(e) => onChangeCreate("quantity", e.target.value)}
                                  />
                                  <label>Số lượng</label>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-floating custom-floating-label">
                                  <input
                                    type="number"
                                    className="form-control"
                                    value={detaiProducts.price}
                                    onChange={(e) => onChangeCreate("price", e.target.value)}
                                  />
                                  <label>Giá bán</label>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-floating custom-floating-label">
                                <select
                                  className="form-select"
                                  id="size"
                                  value={detaiProducts.size || ""}
                                  onChange={(e) => onChangeCreate("size", e.target.value)}
                                >
                                  <option value="" >
                                    Chọn kích thước
                                  </option>
                                  <option value="S">S</option>
                                  <option value="X">X</option>
                                  <option value="M">M</option>
                                  <option value="L">L</option>
                                  <option value="XL">XL</option>
                                </select>
                                <label htmlFor="size">Kích thước</label>
                              </div>

                            </div>
                          </div>
                        </form>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={closeCreate}>
                        Đóng
                      </Button>
                      <Button variant="primary" onClick={handleCreateDetail}>
                        Thêm chi tiết sản phẩm
                      </Button>
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
                                    <option value="X">X</option>
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
                                        <div key={img.id} className="image-item">
                                          <img
                                            src={`https://localhost:7048/${img.link}`}
                                            alt="Product"
                                          />
                                          {/* Nút xóa */}
                                          {!img.isImage && (
                                            <button onClick={() => handleDeleteImage(img.id)} >
                                              X
                                            </button>
                                          )}
                                          {/* Nút đánh dấu là ảnh chính */}
                                          {!img.isImage && (
                                            <div onClick={() => handleSetPrimaryImage(img.id)} >
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
