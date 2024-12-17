import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleToast } from "../../../utils/toast";
// import { createStaff, resetState } from "../../../redux/slices/staff";
import React, { useState } from "react";
import axios from 'axios';
// import "../staff/css/staff.css";
import { Card } from 'react-bootstrap';
import MapPicker from '../Map/MapPicker';

import { postStaffAPI } from "../js/AxiosStaff";

function AddStaff() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // Thêm state để lưu hình ảnh xem trước
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState(1);
  const [statu, setstatus] = useState(1)
  const [password, setPassword] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const error = useSelector((state) => state.staff.error); // Lấy lỗi từ redux
  const status = useSelector((state) => state.staff.statusCreate); // Trạng thái tạo nhân viên

  // Nếu bạn muốn sử dụng formik, có thể khởi tạo ở đây
  // const formik = useFormik({
  //   initialValues: {
  //     name: "",
  //     email: "",
  //     phone: "",
  //     address: "",
  //     role: "",
  //     department: "",
  //     base: "",
  //     fixedSalary: "",
  //     description: "",
  //     avatar: "",
  //     password: "",
  //     confirmPassword: "",
  //   },
  //   validationSchema: StaffSchema,
  //   onSubmit: async (values) => {
  //     await dispatch(createStaff(values)); // Gửi dữ liệu tạo nhân viên
  //   },
  // });

  // useEffect(() => {
  //   if (status === "success") {
  //     // Nếu trạng thái tạo nhân viên thành công
  //     // formik.resetForm(); // Nếu sử dụng formik, reset form ở đây
  //     // dispatch(resetState()); // Reset lại trạng thái
  //     handleToast("success", "Thêm nhân viên thành công", "top-right"); // Hiển thị thông báo thành công
  //   }
  //   if (error) {
  //     // Nếu có lỗi
  //     handleToast("error", error.mes, "top-right"); // Hiển thị thông báo lỗi
  //   }
  // }, [status, error, dispatch]);
  // const handleUploadComplete = (url) => {
  //   
  //   formik.setFieldValue("avatar", url);
  // };

  // const handleDelete = () => {
  //   formik.setFieldValue("avatar", "");
  //   setImagePreview(null); // Xóa hình ảnh xem trước khi xóa avatar
  // };

  // const getErrorProps = (name) => ({
  //   error: formik.touched[name] && Boolean(formik.errors[name]),
  //   helperText: formik.touched[name] && formik.errors[name],
  // });
  const validateForm = () => {
    if (!fullName || !userName || !email || !phone || !address || !password) {
      handleToast("error", "Vui lòng điền đầy đủ thông tin.", "top-right");
      return false;
    }

    if (fullName.length <= 5 || /\d/.test(fullName)) {
      handleToast("error", "Họ và tên phải dài hơn 5 ký tự và không chứa số.", "top-right");
      return false;
    }

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(userName)) {
      handleToast("error", "Tên người dùng không hợp lệ. Không được chứa dấu cách hoặc ký tự đặc biệt.", "top-right");
      return false;
    }

    // const phoneRegex = /^0389\d{6,8}$/; 
    // if (!phoneRegex.test(phone)) {
    //   handleToast("error", "Số điện thoại không hợp lệ. Phải bắt đầu bằng 0389 và dài từ 10 đến 12 chữ số.", "top-right");
    //   return false;
    // }
    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(phone)) {
        handleToast("error", "Số điện thoại không hợp lệ. Chỉ được chứa số và không có dấu cách.", "top-right");
        return false;
    }
    if (phone.length < 10 || phone.length > 12) {
        handleToast("error", "Số điện thoại không hợp lệ. Vui lòng điền đầy đủ số điện thoại.", "top-right");
        return false;
    }
    
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;
if (!passwordRegex.test(password)) {
    handleToast(
        "error",
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và chữ số.",
        "top-right"
    );
    return false;
}

    setIsLoading(true);
    return true;
  };

  const addnv = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('userName', userName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('role', role);
    formData.append('status', statu);
    if (image) {
      formData.append('picture', image); // Gửi hình ảnh kèm theo
    }

    try {
      const response = await postStaffAPI(formData);
      handleToast("success", "Nhân viên đã được thêm thành công!", "top-right");
      navigate("/dashboard/staff");
    } catch (error) {
      handleToast("error", "Thêm nhân viên thất bại.", "top-right");
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;  // Lấy file đầu tiên nếu có
    if (file) {
      setImage(file);  // Gán file vào state
      setImagePreview(URL.createObjectURL(file));  // Hiển thị ảnh xem trước
    } else {
      setImage(null);  // Đảm bảo null nếu không có file
      setImagePreview(null);  // Xóa ảnh xem trước nếu không có file
    }
  };


  const handleLocationSelect = async (location) => {
    setSelectedLocation(location);

    const address = await getAddressFromLatLng(location.lat, location.lng);

    if (address) {
      setAddress(address);
    } else {
      setAddress(`Vĩ độ: ${location.lat}, Kinh độ: ${location.lng}`);
    }

    setShowMap(false);
  };

  const getAddressFromLatLng = async (lat, lng) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.address) {
        const fullAddress = `${data.address.road || ''}, ${data.address.city || ''}, ${data.address.country || ''}`;
        
        return fullAddress;
      } else {
        
        return null;
      }
    } catch (error) {
      
      return null;
    }
  };

  const handleAddressChange = async (e) => {
    setAddress(e.target.value);
    const address = e.target.value;

    // Nếu người dùng nhập địa chỉ, tìm kiếm vĩ độ và kinh độ qua Geocoding (Nominatim API)
    if (address) {
      const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${address}&format=json&addressdetails=1`;
      try {
        const response = await axios.get(geocodeUrl);
        if (response.data && response.data[0]) {
          const { lat, lon } = response.data[0];
          setSelectedLocation({ lat, lng: lon });
        }
      } catch (error) {
        
      }
    } else {
      setSelectedLocation(null);  // Nếu không có địa chỉ, xóa tọa độ đã chọn
    }
  };
  return (
    <div className="container">
      <form onSubmit={addnv}>
        <div className="row">
          <div className="col-md-4">

            <div className="from-img image-up">
              <label htmlFor="image" className="image-label">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="img-fluid robot-image" />
                ) : (
                  <div className="image-placeholder">
                    <i className="fas fa-camera"></i> {/* Biểu tượng camera */}
                    <span className="image-tx">Chọn hình ảnh</span>
                  </div>
                )}
              </label>
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                accept="image/*"
                required
                style={{ display: 'none' }}
              />
            </div>


          </div>
          <div className="col-md-8">
            <Card>
              <div className="bor_create">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        placeholder="Họ và Tên"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                      <label htmlFor="fullName">Họ và Tên</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="userName"
                        placeholder="Tên Người Dùng"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                      />
                      <label htmlFor="userName">Tên Người Dùng</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Mật Khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <label htmlFor="password">Mật Khẩu</label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        placeholder="Số Điện Thoại"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                      <label htmlFor="phone">Số Điện Thoại</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                  <div className="form-floating d-flex ">
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Địa Chỉ"
                    value={address}
                    onChange={handleAddressChange}
                    required // Xử lý thay đổi địa chỉ từ người dùng
                  />
                  <label htmlFor="address">Địa Chỉ</label>
                  <button
                    type="button"
                    className="btn btn-outline-secondary ms-2"
                    onClick={() => setShowMap((prev) => !prev)}
                  >
                    <i className="fas fa-map-marker-alt"></i>
                  </button>
                </div>
                  </div>

                </div>

               

                {/* Hiển thị Bản Đồ khi click */}
                {showMap && (
                  <div className="map-container" style={{ height: '300px' }}>
                    <MapPicker onLocationSelect={handleLocationSelect} selectedLocation={selectedLocation} />
                  </div>
                )}
              </div>
              <div className="text-center">
                <button type="submit" className="create-luu"
                  disabled={isLoading || !fullName || !email || !phone || !address || !role || !password}
                >
                  {isLoading ? <span ><i className="loading-icon ">⏳</i>Đang tải</span> : "Thêm nhân viên"}
                </button>
              </div>
            </Card>
          </div>
        </div>
      </form>

    </div>
  );
}
export default AddStaff;
