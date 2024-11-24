import React, { useState } from "react";
import "./Userinfo.css";

const UserProfileForm = () => {
  const [user, setUser] = useState({
    userName: "nguyenvana",
    email: "nguyenvana@example.com",
    phone: "0123456789",
    fullName: "Nguyễn Văn A",
    address: "Số 12, Đường ABC, Quận 1, TP.HCM",
    image: "https://via.placeholder.com/150", // Đường dẫn ảnh đại diện mặc định
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, image: reader.result });
      };
      reader.readAsDataURL(file); // Đọc file ảnh và chuyển đổi sang base64
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Thông tin đã được cập nhật:", user);
  };

  return (
    <div className="user-profile-form">
      <form onSubmit={handleSubmit}>
        {/* Ảnh đại diện */}
        <div className="avatar-upload">
          <label htmlFor="image">
            <img
              src={user.image}
              alt="Avatar"
              className="avatar-img"
            />
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }} // Ẩn input file, chỉ hiển thị ảnh
          />
        </div>

        {/* Tên người dùng không thể sửa */}
        <div className="form-group">
          <label htmlFor="userName">Tên đăng nhập:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={user.userName}
            readOnly
          />
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
          ></textarea>
        </div>

        <button type="submit">Cập nhật thông tin</button>
      </form>
    </div>
  );
};

export default UserProfileForm;
