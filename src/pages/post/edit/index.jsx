import { useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { createBlog, imageBlogByIdBlog, blogById, deleteImageById, updateBlog, isPrimaryBlogImage } from '../post-api/post-api';
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const { id } = useParams();
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const [images, setImages] = useState([]); // Danh sách ảnh với thuộc tính isPrimary
  const MAX_IMAGES = 2; // Giới hạn số lượng ảnh
  const [title, setTitle] = useState(""); // State cho ô input
  const [editorContent, setEditorContent] = useState(""); // State cho nội dung TinyMCE
  const [imageRes, setImageRes] = useState([]);

  const fetchData = async (id) => {
    try {
      // Chạy cả hai hàm đồng thời
      const [blogResponse, imageResponse] = await Promise.all([
        blogById(id),
        imageBlogByIdBlog(id)
      ]);
      setTitle(blogResponse.headLine)
      setEditorContent(blogResponse.content)
      setImageRes(imageResponse)
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchData(id); // Gọi hàm lấy dữ liệu với `id`
  }, []);

  const handleInputChange = (event) => {
    setTitle(event.target.value); // Cập nhật giá trị input
  };

  const handleEditorChange = (content) => {
    setEditorContent(content); // Cập nhật nội dung editor
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = [];

    if (images.length + files.length + imageRes.length > MAX_IMAGES) {
      alert(`Chỉ được thêm tối đa ${MAX_IMAGES} hình ảnh.`);
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        newImages.push({ url: reader.result, isPrimary: false, });
        if (newImages.length === files.length) {
          setImages((prevImages) => [...prevImages, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const deleteImageInData = async (idImage) => {
    try {
      const response = await deleteImageById(idImage);
      if (response) {
        alert("Xóa ảnh thành công");
        fetchData(id);
      }
    } catch (error) {
    }
  }

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    // Nếu ảnh bị xóa là ảnh chính, đặt ảnh chính mới nếu có
    if (images[index]?.isPrimary && updatedImages.length > 0) {
      updatedImages[0].isPrimary = true;
    }
  };

  const handleSetMainImage = async (idImage) => {
    try {
      const response = await isPrimaryBlogImage(idImage);
      if (response) {
        alert("Đặt ảnh chính thành công");
        fetchData(id);
      }
    }
    catch (error) {
    }
  };

  const validateForm = () => {
    if (!title || !editorContent) {
      alert("Vui lý nhập đầy đủ thống tin");
      return false;
    }
    return true;
  }
  const submitForm = async () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!validateForm()) {
      return;
    }
    const data = {
      headLine: title,
      content: editorContent,
      accountId: user.id,
      images: images
    }
    try {
      const response = await updateBlog(id, data);
      if (response) {
        alert("Cập nhật bài viet thanh cong");
        navigate("/dashboard/post");
      }
    }
    catch (err) {
      alert('Cập nhật bài viết thất bại')
    }
  }
  return (
    <div className="bg-light rounded h-100 p-4 page-header bg-white">
      <div className="">
        <div className="dialog-tabs">
          <button
            className={`tab-btn active`}
          >
            HÌNH ẢNH BÀI VIẾT
          </button>
        </div>

        <div className="image-previews mt-2">
          {/* Input để chọn hình ảnh */}
          {images.length + imageRes.length < MAX_IMAGES && (
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
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>
          )}

          {/* Hiển thị các ảnh preview */}
          {images.map((image, index) => (
            <div className="image-preview" key={index}>
              <img src={image.url} alt={`Preview ${index + 1}`} className="img-fluid" />
              <div>
                {image.isPrimary == false && (
                  <a className="ima" onClick={() => handleRemoveImage(index)}>
                    X
                  </a>
                )}
              </div>
            </div>
          ))}
          {imageRes.map((image, index) => (
            <div className="image-preview" key={index}>
              <img src={`https://localhost:7048/${image.link}`} alt={`Preview ${index + 1}`} className="img-fluid" />
              <div>
                {image.isPrimary == false && (
                  <div
                    className={`btn-set-primary`}
                    onClick={() => handleSetMainImage(image.id)}
                  >
                    {image.isPrimary ? "Ảnh bìa" : "Đặt làm ảnh bìa"}
                  </div>

                )}

                {image.isPrimary == false && (
                  <a className="ima" onClick={() => deleteImageInData(image.id)}>
                    X
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <div className="dialog-tabs">
          <button
            className={`tab-btn active`}
          >
            THÔNG TIN BÀI VIẾT
          </button>
        </div>

        <form >
          {/* ============== Thông tin sản phẩm ============== */}
          <div className="col-md-12" style={{ marginTop: "20px" }}>
            <div className="">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-floating custom-floating-label">
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      value={title} // Liên kết với state
                      onChange={handleInputChange} // Cập nhật state khi thay đổi
                    />
                    <label htmlFor="categoryId">Tiêu đề </label>
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
                    initialValue={editorContent}
                    onEditorChange={handleEditorChange}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* ============== Thông tin sản phẩm ============== */}
        </form>
      </div>

      <div className="border-t pt-4 mt-5 d-flex justify-content-end">
        <button className="create-luu" onClick={submitForm}>
          Lưu bài viết mới
        </button>
      </div>
    </div>
  );
}

export default EditPost;
