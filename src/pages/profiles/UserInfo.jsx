import React, { useState, useEffect } from "react";
import "./Userinfo.css";

const UserProfileForm = () => {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    phone: "",
    fullName: "",
    address: "",
    image: "https://via.placeholder.com/150", // Đường dẫn ảnh mặc định
  });

  useEffect(() => {
    // Lấy thông tin người dùng từ localStorage
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      try {
        const userInfo = JSON.parse(storedUserInfo); // Chỉ parse khi dữ liệu không rỗng
        setUser({
          userName: userInfo.userName || "",
          email: userInfo.email || "",
          phone: userInfo.phone || "",
          fullName: userInfo.fullName || "",
          address: userInfo.address || "",
          image: userInfo.image || "",
        });
      } catch (error) {
        
      }
    }
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div className="user-profile-form">
      <form onSubmit={handleSubmit}>
        {/* Ảnh đại diện */}
        <div className="avatar-upload">
          <label htmlFor="image">
            <img src={`https://localhost:7048/${user.image}`} alt="Avatar" className="avatar-img" />
          </label>
          <input
            id="image"
            name="image"
            accept="image/*"
            style={{ display: "none" }}
            readOnly
          />
        </div>

        {/* Tên đăng nhập */}
        <div className="form-group">
          <label htmlFor="userName">Tên đăng nhập:</label>
          <input type="text" id="userName" name="userName" value={user.userName} readOnly />
          
        </div>

        {/* Họ tên */}
        <div className="form-group">
          <label htmlFor="fullName">Họ và tên:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={user.fullName}
            onChange={handleInputChange}
            readOnly
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            readOnly
          />
        </div>

        {/* Số điện thoại */}
        <div className="form-group">
          <label htmlFor="phone">Số điện thoại:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={user.phone}
            onChange={handleInputChange}
            readOnly
          />
        </div>

        {/* Địa chỉ */}
        <div className="form-group">
          <label htmlFor="address">Địa chỉ:</label>
          <textarea
            id="address"
            name="address"
            value={user.address}
            onChange={handleInputChange}
            readOnly
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default UserProfileForm;
