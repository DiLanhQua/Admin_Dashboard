import React, { useState, useEffect } from "react";
import { Modal, Button, Tab, Tabs, Form } from "react-bootstrap";

const EditProductModal = ({
  show,
  handleClose,
  selectedProduct,
  brands,
  categories,
  images,
  handleSave,
}) => {
  const [activeTab, setActiveTab] = useState("info");
  const [productInfo, setProductInfo] = useState({
    productName: "",
    categoryId: "",
    brandId: "",
    description: "",
  });
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    if (selectedProduct) {
      setProductInfo({
        productName: selectedProduct.productName || "",
        categoryId: selectedProduct.categoryId || "",
        brandId: selectedProduct.brandId || "",
        description: selectedProduct.description || "",
      });
      setProductImages(images || []);
    }
  }, [selectedProduct, images]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
  };

  const handleAddImage = (newImageUrl) => {
    setProductImages([...productImages, { imageUrl: newImageUrl }]);
  };

  const handleDeleteImage = (index) => {
    setProductImages(productImages.filter((_, i) => i !== index));
  };

  const handleSaveChanges = () => {
    handleSave({ ...productInfo, images: productImages });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Sửa Thông Tin Sản Phẩm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
          {/* Tab Thông Tin */}
          <Tab eventKey="info" title="Thông Tin Sản Phẩm">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Tên Sản Phẩm</Form.Label>
                <Form.Control
                  type="text"
                  name="productName"
                  value={productInfo.productName}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Thương Hiệu</Form.Label>
                <Form.Select
                  name="brandId"
                  value={productInfo.brandId}
                  onChange={handleInputChange}
                >
                  <option value="">Chọn thương hiệu</option>
                  {brands.map((brand, key) => (
                    <option key={key} value={brand.id}>
                      {brand.brandName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Danh Mục</Form.Label>
                <Form.Select
                  name="categoryId"
                  value={productInfo.categoryId}
                  onChange={handleInputChange}
                >
                  <option value="">Chọn danh mục</option>
                  {categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.categoryName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          </Tab>

          {/* Tab Mô Tả */}
          <Tab eventKey="description" title="Mô Tả">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Mô Tả</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="description"
                  value={productInfo.description}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Tab>

          {/* Tab Hình Ảnh */}
          <Tab eventKey="images" title="Hình Ảnh">
            <div>
              {productImages.map((image, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <img
                    src={image.imageUrl}
                    alt="Hình ảnh sản phẩm"
                    style={{ width: "100px", height: "100px", marginRight: "10px" }}
                  />
                  <Button variant="danger" onClick={() => handleDeleteImage(index)}>
                    Xóa
                  </Button>
                </div>
              ))}
              <Button
                variant="primary"
                onClick={() =>
                  handleAddImage(prompt("Nhập URL hình ảnh mới"))
                }
              >
                Thêm Hình Ảnh
              </Button>
            </div>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Lưu Thay Đổi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProductModal;
