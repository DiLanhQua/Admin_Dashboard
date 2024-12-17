import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { handleToast } from "../../../utils/toast";
// import { createStaff, resetState } from "../../../redux/slices/staff";
import React, { useState, useEffect } from "react";
import axios from 'axios';
// import "../staff/css/staff.css";
import { Card } from 'react-bootstrap';
import MapPicker from '../Map/MapPicker';

import { upStaffAPI, getDeStaffAPI } from "../js/AxiosStaff";


const EditStaff = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState(1);
  const [password, setPassword] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const error = useSelector((state) => state.staff.error); // Lấy lỗi từ redux
  const status = useSelector((state) => state.staff.statusCreate); // Trạng thái tạo nhân viên

  useEffect(() => {
    if (!id) {
      
      return;
    }

    const fetchData = async () => {
      try {
        const res = await getDeStaffAPI(id);
        const nhanV = res;
        // Kiểm tra dữ liệu trả về từ API
        // Cập nhật các state tương ứng khi dữ liệu nhân viên được lấy về
        setFullName(nhanV.fullName);
        setUserName(nhanV.userName);
        setEmail(nhanV.email);
        setPassword(nhanV.password);
        setPhone(nhanV.phone);
        setAddress(nhanV.address);
        setRole(nhanV.role);
        // Nếu có hình ảnh, hiển thị preview URL
        if (nhanV.image) {
          setImagePreview(nhanV.image);
        }
      } catch (err) {
        
      }
    };

    fetchData();
  }, [id]);

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
    formData.append('accountId', id);
    formData.append('fullName', fullName);
    formData.append('userName', userName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('role', role);
    if (image) {
      formData.append('picture', image); // Gửi hình ảnh kèm theo
    }

    try {
      const response = await upStaffAPI(id, formData);
      handleToast("success", "Nhân viên đã được sửa thành công!", "top-right");
      navigate("/dashboard/staff");
    } catch (error) {
      handleToast("error", "Sửa nhân viên thất bại.", "top-right");
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setImagePreview(null);
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
        const fullAddress = `${data.address.road || ''},  ${data.address.city || ''}, ${data.address.country || ''}`;
        
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
      setSelectedLocation(null);
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
                        required
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
                    required
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


                {showMap && (
                  <div className="map-container" style={{ height: '300px' }}>
                    <MapPicker onLocationSelect={handleLocationSelect} selectedLocation={selectedLocation} />
                  </div>
                )}
              </div>
              <div className="text-center">
                {/* <button type="submit" className="create-luu">
                  Sửa nhân viên
                </button> */}
                <button type="submit" className="create-luu"
                  disabled={isLoading || !fullName || !email || !phone || !address || !role || !password}
                >
                  {isLoading ? <span ><i className="loading-icon ">⏳</i>Đang tải</span> : "Sửa nhân viên"}
                </button>
              </div>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};
export default EditStaff;
