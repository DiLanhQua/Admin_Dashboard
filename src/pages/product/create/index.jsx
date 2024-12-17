import React, { useState, useEffect } from "react";
import { handleToast } from "../../../utils/toast";
import { Editor } from '@tinymce/tinymce-react';

import { useNavigate } from "react-router-dom";
import {
  getAllBrandAPI, getMediaAPI, getImageAPI, getBrandAPI, getAllCategoryAPI,
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
  // const [expandDescription, setExpandDescription] = useState(false);
  // const [productImage, setProductImage] = useState(null);
  // const [isChecking, setIsChecking] = useState(false);
  // const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [productName, setProductName] = useState("");
  // const [description, setdescription] = useState("");
  // const [price, setPrice] = useState("");
  // const [quantity, setQuantity] = useState("");
  // const [color, setColor] = useState("");
  // const [size, setSize] = useState("");
  // const [gender, setGender] = useState("");
  // const [category, setCategory] = useState("");
  const [brand, setBrand] = useState([]);
  const [productImages, setProductImages] = useState([]);
  // const [selectedBrand, setSelectedBrand] = useState('');
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
  //     
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
    setProductInfo((prev) => ({ ...prev, productDetais: [...newDetails] }));
  };

  // const handleSave = () => {
  //   
  // };


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


  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Xử lý khi thêm hình ảnh
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map((file) => ({
      file,
      url: URL.createObjectURL(file), // Tạo URL preview
      name: file.name,
    }));
    const uniqueFiles = newFiles.filter(
      (file) => !productInfo.medias.some((media) => media.name === file.name)
    );

    if (uniqueFiles.length > 0) {
      setProductImages((prev) => [...prev, ...uniqueFiles.map((file) => file.url)]);
      const newMedia = uniqueFiles.map((file, index) => ({
        file: file.file,
        url: file.url, // Lưu URL vào `medias` để tiện sử dụng
        isPrimary: productInfo.medias.length === 0 && index === 0, // Ảnh đầu tiên là ảnh chính
      }));

      setProductInfo((prev) => ({
        ...prev,
        medias: [...prev.medias, ...newMedia],
      }));
    }
  };

  // Xử lý khi xóa hình ảnh
  const handleDeleteImage = (index) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index));
    setProductInfo((prev) => ({
      ...prev,
      medias: prev.medias.filter((_, i) => i !== index),
    }));
  };

  // Xử lý khi đặt ảnh chính
  const handleSetPrimaryImage = (index) => {
    setProductInfo((prev) => ({
      ...prev,
      medias: prev.medias.map((media, i) => ({
        ...media,
        isPrimary: i === index,
      })),
    }));
  };
  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const brandPromises = await getAllBrandAPI(customersPerPage, currentPage);
        // 
        if (Array.isArray(brandPromises.data)) {
          setBrand(brandPromises.data);
        } else {
          setBrand([]);
        }
      } catch (error) {
        
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
      
    }
  };

  // Gọi API khi component được render
  useEffect(() => {
    fetchCategory();
  }, []);

  const handleEditorChange = (content) => {
    setProductInfo({ ...productInfo, description: content });
  }
  const handleAdd = async (e) => {
    e.preventDefault();
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

    const mediasWithBase64 = await Promise.all(
      productInfo.medias.map(async (media) => ({
        link: await fileToBase64(media.file),
        isPrimary: media.isPrimary,
      }))
    );
    const productData = {
      ...mainProduct.main,
      productDetais: [
        ...variants,
      ],
      medias: mediasWithBase64,
    };
    setIsLoading(true);
    try {
      const response = await postProductAPI(productData);
      handleToast("success", "Sản phẩm đã được lưu thành công!", "top-right");
      navigate("/dashboard/product");
    } catch (error) {
      
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
    <div className="col-md-12">
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
    <div className="card-form">
      <div className="dialog-tabs">
        <button
          className={`tab-btn active`}
        >
          THÔNG TIN SẢN PHẨM
        </button>
      </div>
      <form >
        <div>
          {/* ============== Thông tin sản phẩm ============== */}
          <div className="col-md-12" style={{ marginTop: "20px" }}>
            <div className="">
              <div className="row">
                {renderInput("Tên Sản Phẩm", productInfo.productName, "productName")}
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-floating custom-floating-label">
                    <select
                      className="form-select"
                      id="categoryId"
                      value={productInfo.categoryId}
                      onChange={(e) => handleInputChange("categoryId", e.target.value)}
                    >
                      <option value="" disabled hidden>Chọn loại sản phẩm.....</option>
                      {Categorys.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.categoryName}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="categoryId">Loại sản phẩm</label>
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
              <div className="row">
                <div className="form-floating">
                  <Editor
                    apiKey='7tl9v670y6tk99ky8gryopwvrpw9re1h6tsvs5wauxsr8gmn'
                    init={{
                      plugins: [
                        // Core editing features
                        'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                        // Your account includes a free trial of TinyMCE premium features
                        // Try the most popular premium features until Dec 22, 2024:
                        'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown',
                        // Early access to document converters
                        'importword', 'exportword', 'exportpdf'
                      ],
                      toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                      tinycomments_mode: 'embedded',
                      tinycomments_author: 'Author name',
                      mergetags_list: [
                        { value: 'First.Name', title: 'First Name' },
                        { value: 'Email', title: 'Email' },
                      ],
                      ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                    }}
                    initialValue="Welcome to TinyMCE!"
                    onEditorChange={handleEditorChange}
                  />
                  <label htmlFor="description">Mô tả</label>
                </div>
              </div>
            </div>
          </div>
          {/* ============== Thông tin sản phẩm ============== */}


          {/* =========== biển thể sản phẩm ============= */}
          <div className="">
            <div className="dialog-tabs mb-4">
              <button
                className={`tab-btn active`}
              >
                CHI TIẾT BIẾN THỂ
              </button>
            </div>
            <a className="addpro" onClick={handleAddVariant}>Thêm Biến thể</a>
            <div className="variant-list">
              {productInfo.productDetais.map((detail, index) => (
                <div key={index} className="variant-card">
                  <div className="variant-header">
                    <h4>Biến thể {index + 1}</h4>
                    <a className="delete-btn" onClick={() => handleDeleteProductDetail(index)}>Xóa</a>
                  </div>
                  <div className="variant-body">
                    <select
                      className="form-select"
                      id="size"
                      value={detail.size}
                      onChange={(e) => handleProductDetailChange(index, "size", e.target.value)}
                    >
                      <option value="" disabled hidden>Chọn kích thước</option>
                      <option value="36">36</option>
                      <option value="37">37</option>
                      <option value="38">38</option>
                      <option value="39">39</option>
                      <option value="40">40</option>
                      <option value="41">41</option>
                      <option value="42">42</option>
                      <option value="43">43</option>
                    </select>
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
                      className="form-select"
                      id="colorId"
                      value={detail.colorId}  // giá trị hiện tại của colorId
                      onChange={(e) => handleProductDetailChange(index, "colorId", e.target.value)}  // khi thay đổi colorId
                    >
                      <option value="" disabled hidden>Chọn màu sắc</option>
                      {colors.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.nameColor}  {/* Hiển thị tên màu */}
                        </option>
                      ))}
                    </select>
                    <select
                      value={detail.gender}
                      onChange={(e) =>
                        handleProductDetailChange(index, "gender", e.target.value)
                      }
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* =========== biển thể sản phẩm ============= */}

          {/* ============== Hình ảnh sản phẩm ============== */}
          <div className="mt-5">
            <div className="dialog-tabs mb-4">
              <button
                className={`tab-btn active`}
              >
                HÌNH ẢNH SẨN PHẨM
              </button>
            </div>
            {/* Các hình ảnh sẽ hiển thị trong dạng lưới 4 cột */}
            <div className="image-previews">
              <div className="image-preview">
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
              {productImages.map((image, index) => (
                <div key={index} className="image-preview">
                  <img
                    src={image} // URL của ảnh
                    alt={`Product Image ${index}`}
                    className="img-fluid"
                  />
                  <div>
                    {!productInfo.medias[index]?.isPrimary && (
                      <div className="btn-set-primary" onClick={() => handleSetPrimaryImage(index)}>
                        Đặt làm chính
                      </div>
                    )}
                    {!productInfo.medias[index]?.isPrimary && (
                      <a className="ima" onClick={() => handleDeleteImage(index)}>
                        X
                      </a>
                    )}
                    {productInfo.medias[index]?.isPrimary && (
                      <div className="primary-image">
                        Hình chính
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* ============== Hình ảnh sản phẩm ============== */}


        </div>

        <div className="border-t pt-4 mt-5 d-flex justify-content-end">
          <button className="create-luu"
            onClick={handleAdd}
            disabled={isLoading || productInfo.productDetais.length === 0 || productInfo.medias.length === 0}
          >
            {isLoading ? "Đang thêm sản phẩm mới..." : "Thêm sản phẩm mới"}

          </button>
        </div>
      </form>
    </div >
  );
}

export default ProductPage;
