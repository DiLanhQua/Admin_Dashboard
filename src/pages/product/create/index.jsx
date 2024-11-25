import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Textarea from "../../../components/textarea";
import { handleToast } from "../../../utils/toast";

import { useNavigate } from "react-router-dom";
import {
  getAllBrandAPI, getMediaAPI, getImageAPI, getBrandAPI,
  getDetailproductAPI, postProductAPI, postDEProductAPI, postImageAPI
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
    medias: [{
      isPrimary: "",
      link: "",
    }]
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
  const [customersPerPage, setCustomersPerPage] = useState(5);
  const [productDetais, setproductDetais] = useState([]);
  const [medias, setMedias] = useState([]);


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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const fileArray = files.map((file) => URL.createObjectURL(file));
  
    const uniqueFiles = fileArray.filter((file) => 
      !productImages.includes(file) 
    );
  
    if (uniqueFiles.length > 0) {
      setProductImages((prev) => [...prev, ...uniqueFiles]);
  
      const newMedia = files.map((file, index) => ({
        link: file.name,
        isPrimary: index === 0,
      }));
  
      setProductInfo((prev) => ({
        ...prev,
        medias: [
          ...prev.medias,
          ...newMedia,
        ],
      }));
    }
  };
  


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


  const handleDeleteImage = (index) => {
    const updatedImages = productImages.filter((_, imageIndex) => imageIndex !== index);
    setProductImages(updatedImages);
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
    const mediaMain = productInfo.medias.filter(media => media.isPrimary);
    const mediaSub = productInfo.medias.filter(media => !media.isPrimary);
    const productData = {
      ...mainProduct.main,
      productDetais: [
        ...mainProduct.productDetails,
        ...variants,
      ],
      medias: [
        {
          ...mediaMain,
          ...mediaSub,
        }
      ]
    };

    console.log("productData ", productData);
    setIsLoading(true);
    try {
      const response = await postProductAPI(productData);
      handleToast("success", "Sản phẩm đã được lưu thành công!", "top-right");
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
          <img
            src={productImages[0]}  
            alt="Product Main"
            className="img-fluid robot-image"style={{ width: "100%", height: "100%", objectFit: "cover" }}

          />
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
      // multiple
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
                            // value={color}
                            // onChange={(e) => setColor(e.target.value)}

                            value={productInfo.colorId}
                            onChange={(e) => handleInputChange("colorId", e.target.value)}
                          >
                            <option value="" disabled hidden>Chọn màu sắc</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
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
                      <div className="col-md-6">
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
          <img src={image} alt={`Product Image ${index}`} className="img-fluid" />
          <a className="ima" onClick={() => handleDeleteImage(index)}>Xóa</a>
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
              <option value="red">Đỏ</option>
              <option value="blue">Xanh dương</option>
              <option value="green">Xanh lá</option>
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
