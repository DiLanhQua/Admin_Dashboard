import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Textarea from "../../../components/textarea";
import { handleToast } from "../../../utils/toast";

import { useNavigate } from "react-router-dom";
import {
  getAllBrandAPI, getMediaAPI, getImageAPI, getBrandAPI,getAllCategoryAPI,
  getDetailproductAPI, postProductAPI, postDEProductAPI, postImageAPI, getAllColorAPI
} from "../js/product";
function ProductPage() {
  const [productInfo, setProductInfo] = useState({
    productName: "",
    description: "",
    categoryId: "",
    brandId: "",
    productDetais: [{
      price: "",
      quantity: "",
      colorId: "",
      size: "",
      gender: "",
      status: ""
    }],
    medias: []
  });
  const [expandDescription, setExpandDescription] = useState(false);
  const [productImage, setProductImage] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [productName, setProductName] = useState("");
  const [description, setdescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage, setCustomersPerPage] = useState(8);
  const [productDetais, setproductDetais] = useState([]);
  const [medias, setMedias] = useState([]);
  const [colors, setColors] = useState([]); 
  const [Categorys, setCategorys] = useState([]); 

  const handleAddVariant = () => {
    setProductInfo((prev) => ({
      ...prev,
      productDetais: [
        ...prev.productDetais,
        { size: "", price: 0, quantity: 0, color: "", gender: "" },
      ],
    }));
  };

  // Xóa biến thể
  const handleDeleteVariant = (index) => {
    setProductInfo((prev) => ({
      ...prev,
      productDetais: prev.productDetais.filter((_, i) => i !== index),
    }));
  };

  // Xử lý thay đổi trong biến thể
  const handleVariantChange = (index, key, value) => {
    const updatedVariants = [...productInfo.productDetais];
    updatedVariants[index][key] = value;
    setProductInfo((prev) => ({ ...prev, productDetais: updatedVariants }));
  };

  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files);
  
  //   const newFiles = files.map((file) => ({
  //     url: URL.createObjectURL(file),
  //     name: file.name,
  //   }));
  
  //   const uniqueFiles = newFiles.filter(
  //     (file) => !productInfo.medias.some((media) => media.link === file.name)
  //   );
  
  //   if (uniqueFiles.length > 0) {
  //     // Cập nhật mảng hình ảnh
  //     setProductImages((prev) => [...prev, ...uniqueFiles.map(file => file.url)]);
  
  //     // Tạo các phần tử mới trong medias
  //     const newMedia = uniqueFiles.map((file, index) => ({
  //       link: file.name,
  //       isPrimary: productInfo.medias.length === 0 && index === 0, // Đặt isPrimary nếu chưa có
  //     }));
  
  //     setProductInfo((prev) => ({
  //       ...prev,
  //       medias: [...prev.medias, ...newMedia], // Thêm vào mảng medias
  //     }));
  //   }
  // };
  


  // const handleCheckGrammar = async () => {
  //   setIsChecking(true);
  //   try {
  //     const response = await fetch("https://api.openai.com/v1/completions", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer YOUR_API_KEY`,
  //       },
  //       body: JSON.stringify({
  //         model: "text-davinci-003",
  //         prompt: `Hãy kiểm tra lỗi chính tả và ngữ pháp trong đoạn văn sau:\n\n${productInfo.description}`,
  //         max_tokens: 500,
  //       }),
  //     });
  //     const data = await response.json();
  //     const correctedText = data.choices[0].text.trim();
  //     setProductInfo({ ...productInfo, description: correctedText });
  //   } catch (error) {
  //     console.error("Lỗi khi kiểm tra ngữ pháp:", error);
  //   } finally {
  //     setIsChecking(false);
  //   }
  // };

  const handleDeleteProductDetail = (index) => {
    const updatedDetails = productInfo.productDetais.filter(
      (_, detailIndex) => detailIndex !== index
    );
    setProductInfo({ ...productInfo, productDetais: updatedDetails });
  };

  const handleProductDetailChange = (index, key, value) => {
    const newDetails = [...productInfo.productDetais];
    newDetails[index][key] = value;
    setProductInfo((prev) => ({ ...prev, productDetais: newDetails }));
  };

  const handleSave = () => {
    console.log("Saved Data:", productInfo);
  };


  // const handleDeleteImage = (index) => {
  //   const updatedImages = productImages.filter((_, imageIndex) => imageIndex !== index);
  //   setProductImages(updatedImages);
  // };

  // const handleDeleteImage = (index) => {
  //   const updatedImages = productImages.filter((_, i) => i !== index);

  //   setProductImages(updatedImages);

  //   setProductInfo((prev) => ({
  //     ...prev,
  //     medias: prev.medias.filter((_, i) => i !== index),
  //   }));
  // };

  // // Đặt hình ảnh làm hình chính
  // const handleSetPrimaryImage = (index) => {
  //   setProductInfo((prev) => ({
  //     ...prev,
  //     medias: prev.medias.map((media, i) => ({
  //       ...media,
  //       isPrimary: i === index,
  //     })),
  //   }));
  // };


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
  
    const newFiles = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));
  
    const uniqueFiles = newFiles.filter(
      (file) => !productInfo.medias.some((media) => media.link === file.name)
    );
  
    if (uniqueFiles.length > 0) {
      setProductImages((prev) => [
        ...prev,
        ...uniqueFiles.map((file) => file.url),
      ]);
  
      const newMedia = uniqueFiles.map((file, index) => ({
        link: file.name,
        isPrimary: productInfo.medias.length === 0 && index === 0,
      }));
  
      setProductInfo((prev) => ({
        ...prev,
        medias: [...prev.medias, ...newMedia],
      }));
    }
  };
  
  const handleDeleteImage = (index) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index));
    setProductInfo((prev) => ({
      ...prev,
      medias: prev.medias.filter((_, i) => i !== index),
    }));
  };
  
  const handleSetPrimaryImage = (index) => {
    if (index >= 0 && index < productInfo.medias.length) {
      setProductInfo((prev) => ({
        ...prev,
        medias: prev.medias.map((media, i) => ({
          ...media,
          isPrimary: i === index,
        })),
      }));
    }
  };
  
  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const brandPromises = await getAllBrandAPI(customersPerPage, currentPage);
        console.log("brandPromises ", brandPromises);
        if (Array.isArray(brandPromises.data)) {
          setBrand(brandPromises.data);
        } else {
          setBrand([]);
        }
      } catch (error) {
        console.error("Lỗi khi lấy media cho sản phẩm:", error);
      }
    };

    fetchBrand();
  }, [customersPerPage, currentPage]);

  const fetchColors = async () => {
    try {
      const response = await getAllColorAPI(customersPerPage, currentPage);
      if (Array.isArray(response.data)) {
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

  const fetchCategory = async () => {
    try {
      const response = await getAllCategoryAPI(customersPerPage, currentPage);
      if (Array.isArray(response.data)) {
        setCategorys(response.data); 
      } else {
        setCategorys([]);
      } // Cập nhật state colors với dữ liệu màu sắc
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu màu:", error);
    }
  };

  // Gọi API khi component được render
  useEffect(() => {
    fetchCategory();
  }, []);
  const handleAdd = async (e) => {
    e.preventDefault();
    console.log("productInfo ", productInfo);
    console.log("productInfo.productDetais ",);

    const mainProduct = {
      main: {
        productName: productInfo.productName,
        description: productInfo.description,
        categoryId: productInfo.categoryId,
        brandId: productInfo.brandId,
      },
      productDetails: [
        {
          price: productInfo.price,
          quantity: productInfo.quantity,
          colorId: productInfo.colorId,
          size: productInfo.size,
          gender: productInfo.gender,
          status: "1",
        }
      ]
    };

    const variants = productInfo.productDetais.map((variant) => ({
      colorId: variant.colorId,
      size: variant.size,
      gender: variant.gender,
      quantity: variant.quantity,
      price: variant.price,
      status: "0",
    }));
    let mediaMain = productInfo.medias.find((media) => media.isPrimary);
  const mediaSub = productInfo.medias.filter((media) => !media.isPrimary);

  // Nếu không có ảnh chính, đặt ảnh đầu tiên làm ảnh chính
  if (!mediaMain && productInfo.medias.length > 0) {
    mediaMain = { ...productInfo.medias[0], isPrimary: true };
  }
    const productData = {
      ...mainProduct.main,
      productDetais: [
        ...mainProduct.productDetails,
        ...variants,
      ],
      medias: [mediaMain, ...mediaSub].filter(Boolean),
    };

    console.log("productData ", productData);
    setIsLoading(true);
    try {
      const response = await postProductAPI(productData);
      handleToast("success", "Sản phẩm đã được lưu thành công!", "top-right");
      // navigate("/dashboard/product")
      navigate("/dashboard/product");
    } catch (error) {
      console.error("Error saving product:", error);
      handleToast("error", "Có lỗi khi lưu sản phẩm.", "top-right");
    } finally {
      setIsLoading(false);
    }
  };


  const handleInputChange = (field, value) => {
    setProductInfo(prevState => ({
      ...prevState,
      [field]: value
    }));
  };
  const renderInput = (label, value, field) => (
    <div className="col-md-6">
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id={field}
          placeholder={label}
          value={value}
          onChange={(e) => handleInputChange(field, e.target.value)}
        />
        <label htmlFor={field}>{label}</label>
      </div>
    </div>
  );
  return (
    <Card>


      <div className="dialog-tabs">
        <button
          className={`tab-btn ${activeTab === "info" ? "active" : ""}`}
          onClick={() => setActiveTab("info")}
        >
          Thông Tin Sản Phẩm
        </button>
        <button
          className={`tab-btn ${activeTab === "description" ? "active" : ""}`}
          onClick={() => setActiveTab("description")}
        >
          Mô Tả Sản Phẩm
        </button>
        <button
          className={`tab-btn ${activeTab === "deimgae" ? "active" : ""}`}
          onClick={() => setActiveTab("deimgae")}
        >
          Hình ảnh chi tiết
        </button>
        <button
          className={`tab-btn ${activeTab === "debienthe" ? "active" : ""}`}
          onClick={() => setActiveTab("debienthe")}
        >
          Chi tiết biến thể
        </button>
      </div>
      <form onSubmit={handleAdd}>
        {activeTab === "info" && (
          <div className="container">
            {/* <h1>Thông tin sản phẩm</h1> */}
            <div className="row">
            <div className="col-md-4">
  <div className="from-img image-up">
    <label htmlFor="image" className="image-label">
      {productImages.length > 0 ? (
        <div className="image-previews">
          {productImages.map((image, index) => (
            <div
              key={index}
              className={`image-item ${
                productInfo.medias[index]?.isPrimary ? "primary" : ""
              }`}
              style={{ position: "relative", margin: "5px" }}
            >
              <img
                src={image}
                alt={`Product ${index}`}
                className="img-fluid"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <button
                className="btn btn-sm btn-primary"
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  zIndex: 10,
                }}
                onClick={() => handleSetPrimaryImage(index)}
              >
                {productInfo.medias[index]?.isPrimary
                  ? "Hình chính"
                  : "Đặt làm chính"}
              </button>
              <button
                className="btn btn-sm btn-danger"
                style={{
                  position: "absolute",
                  bottom: "5px",
                  right: "5px",
                  zIndex: 10,
                }}
                onClick={() => handleDeleteImage(index)}
              >
                Xóa
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="image-placeholder">
          <i className="fas fa-camera"></i>
          <span className="image-tx">Chọn hình ảnh chính</span>
        </div>
      )}
    </label>
    <input
      type="file"
      id="image"
      onChange={handleImageChange}
      accept="image/*"
      multiple
      style={{ display: "none" }}
    />
  </div>
</div>


              <div className="col-md-8">
                <Card>
                  <div className="bor_create">
                    <div className="row">
                      {renderInput("Tên Sản Phẩm", productInfo.productName, "productName")}
                      {/* <div className="col-md-6">
                        <div className="form-floating">
                          
                          <input
                            type="text"
                            className="form-control"
                            id="productName"
                            name="productName"
                            placeholder="Tên Sản Phẩm"
                            value={productInfo.productName}
                onChange={(e) => handleInputChange("productName", e.target.value)}
                            // onChange={(e) => setProductName(e.target.value)}
                          />
                          <label htmlFor="productName">Tên Sản Phẩm</label>
                        </div>
                      </div> */}
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="quantity"
                            placeholder="Số Lượng"
                            // value={quantity}
                            value={productInfo.quantity}
                            onChange={(e) => handleInputChange("quantity", e.target.value)}
                          // onChange={(e) => setQuantity(e.target.value)}

                          />
                          <label htmlFor="quantity">Số lượng</label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="price"
                            placeholder="Giá"
                            // value={price}
                            // onChange={(e) => setPrice(e.target.value)}
                            value={productInfo.price}
                            onChange={(e) => handleInputChange("price", e.target.value)}
                          />
                          <label htmlFor="price">Giá</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating custom-floating-label">
                          <select
                            className="form-select"
                            id="size"
                            // value={size}
                            // onChange={(e) => setSize(e.target.value)}

                            value={productInfo.size}
                            onChange={(e) => handleInputChange("size", e.target.value)}
                          >
                            <option value="" disabled hidden></option>
                            <option value="M">M</option>
                            <option value="X">X</option>
                            <option value="XL">XL</option>
                          </select>
                          <label htmlFor="size">Kích Thước</label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                      <div className="form-floating custom-floating-label">
  <select
    className="form-select"
    id="colorId"
    value={productInfo.colorId}  // giá trị hiện tại của colorId
    onChange={(e) => handleInputChange("colorId", e.target.value)}  // khi thay đổi colorId
  >
    <option value="" disabled hidden>Chọn màu sắc</option>
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

                            value={productInfo.gender}
                            onChange={(e) => handleInputChange("gender", e.target.value)}
                          >
                            <option value="" disabled hidden>Chọn giới tính</option>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                            <option value="other">Khác</option>
                          </select>
                          <label htmlFor="gender">Giới tính</label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {/* <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="categoryId"
                            placeholder="Loại sản phẩm"
                            // value={category}
                            // onChange={(e) => setCategory(e.target.value)}

                            value={productInfo.categoryId}
                            onChange={(e) => handleInputChange("categoryId", e.target.value)}
                          />
                          <label htmlFor="category">Loại sản phẩm</label>
                        </div>
                      </div> */}
                      <div className="col-md-6">
                        <div className="form-floating custom-floating-label">
                          <select
                            className="form-select"
                            id="categoryId"
                            // value={selectedBrand}
                            // onChange={(e) => setSelectedBrand(e.target.value)} // Cập nhật thương hiệu được chọn

                            value={productInfo.categoryId}
                            onChange={(e) => handleInputChange("categoryId", e.target.value)}
                          >
                            <option value="" disabled hidden>Loại sản phẩm</option>
                            {Categorys.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.categoryName}
                              </option>
                            ))}
                          </select>
                          <label htmlFor="categoryId">Thương hiệu</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating custom-floating-label">
                          <select
                            className="form-select"
                            id="brandId"
                            // value={selectedBrand}
                            // onChange={(e) => setSelectedBrand(e.target.value)} // Cập nhật thương hiệu được chọn

                            value={productInfo.brandId}
                            onChange={(e) => handleInputChange("brandId", e.target.value)}
                          >
                            <option value="" disabled hidden>Chọn thương hiệu</option>
                            {brand.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.brandName}
                              </option>
                            ))}
                          </select>
                          <label htmlFor="brand">Thương hiệu</label>
                        </div>
                      </div>

                    </div>
                  </div>
                </Card>
              </div>
            </div>

          </div>
        )}

        {activeTab === "description" && (
          <div className="container">
            <h3>Thông tin mô tả</h3>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="description"
                placeholder="Loại sản phẩm"
                // value={description}
                // onChange={(e) => setdescription(e.target.value)}

                value={productInfo.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
              <label htmlFor="description">Mô tả</label>
            </div>
            {/* <button onClick={handleCheckGrammar} disabled={isChecking}>
              {isChecking ? "Đang kiểm tra..." : "Kiểm tra ngữ pháp"}
            </button>
            <div
              className={`product-description-preview ${expandDescription ? "expanded" : ""}`}
            >
              {productInfo.description}
            </div>
            <button onClick={() => setExpandDescription(!expandDescription)}>
              {expandDescription ? "Thu gọn" : "Xem thêm"}
            </button> */}
          </div>
        )}

{activeTab === "deimgae" && (
  <div className="container">
    {/* <h3>Hình ảnh sản phẩm</h3> */}
    <div className="from-img image-up">
      <label htmlFor="image" className="image-label">
        
          <div className="image-placeholder">
            <i className="fas fa-camera"></i>
            <span className="image-tx">Chọn hình ảnh bìa</span>
          </div>
      </label>
      <input
        type="file"
        id="image"
        onChange={handleImageChange}
        accept="image/*"
        multiple
        style={{ display: "none" }}
      />
    </div>
    
    {/* Các hình ảnh sẽ hiển thị trong dạng lưới 4 cột */}
    <div className="image-previews">
        {productImages.map((image, index) => (
          <div key={index} className="image-preview">
            <img
              src={image.url}
              alt={`Product Image ${index}`}
              className="img-fluid"
              style={{ objectFit: "cover", width: "100px", height: "100px" }}
            />
            <div>
              <button onClick={() => handleSetPrimaryImage(index)}>
                {productInfo.medias[index]?.isPrimary ? "Hình chính" : "Đặt làm chính"}
              </button>
              <a className="ima" onClick={() => handleDeleteImage(index)}>
                Xóa
              </a>
            </div>
          </div>
        ))}
      </div>
  </div>
)}



{activeTab === "debienthe" && (
  <div className="container">
    <a className="addpro" onClick={handleAddVariant}>Thêm Biến thể</a>
    <div className="variant-list">
      {productInfo.productDetais.map((detail, index) => (
        <div key={index} className="variant-card">
          <div className="variant-header">
            <h4>Biến thể {index + 1}</h4>
            <a className="delete-btn" onClick={() => handleDeleteProductDetail(index)}>Xóa</a>
          </div>
          <div className="variant-body">
            <input
              type="text"
              placeholder="Size"
              value={detail.size}
              onChange={(e) =>
                handleProductDetailChange(index, "size", e.target.value)
              }
            />
            <input
              type="number"
              placeholder="Số lượng"
              value={detail.quantity}
              onChange={(e) =>
                handleProductDetailChange(index, "quantity", e.target.value)
              }
            />
            <input
              type="number"
              placeholder="Giá"
              value={detail.price}
              onChange={(e) =>
                handleProductDetailChange(index, "price", e.target.value)
              }
            />
            <select
              value={detail.colorId}
              onChange={(e) =>
                handleProductDetailChange(index, "colorId", e.target.value)
              }
            >
              <option value="">Chọn màu</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              {/* Các màu sắc khác nếu cần */}
            </select>
            <select
              value={detail.gender}
              onChange={(e) =>
                handleProductDetailChange(index, "gender", e.target.value)
              }
            >
              <option value="">Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  </div>
)}


        <div className="text-center">
          <button type="submit" className="create-luu"
          // onClick={handleSave}
          // disabled={isLoading || !productName}
          >
            Lưu sản phẩm
          </button>
        </div>
      </form>
    </Card>
  );
}

export default ProductPage;
