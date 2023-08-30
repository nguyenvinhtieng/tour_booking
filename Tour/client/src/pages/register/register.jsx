// import các thư viện và modules cần thiết
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";
const Register = () => {
    const [formData, setFormData] = useState({
      username: "",
      fullname: "",
      gender: "Male",
      email: "",
      country: "",
      img: "",
      city: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      const { id, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
  
      if (formData.password !== formData.confirmPassword) {
        setError("Mật khẩu xác nhận không khớp.");
        return;
      }
  
      setLoading(true);
  
      try {
        // Gửi yêu cầu đăng ký với formData tới server
        const res = await axios.post("/auth/register", formData);
        setLoading(false);
        navigate("/login");
      } catch (err) {
        setError(err.response?.data?.message || "Đã có lỗi xảy ra.");
        setLoading(false);
      }
    };
  
    return (
        <div className="register">
          <div className="rContainer">
            <span className="tRegister">Đăng ký tài khoản mới</span>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Tên đăng nhập"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className="rInput"
                required
              />
              <input
                type="text"
                placeholder="Họ và tên"
                id="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="rInput"
                required
              />
              <input
                type="email"
                placeholder="Email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="rInput"
                required
              />
              <input
                type="text"
                placeholder="Quốc gia"
                id="country"
                value={formData.country}
                onChange={handleChange}
                className="rInput"
                required
              />
              <input
                type="text"
                placeholder="Thành phố"
                id="city"
                value={formData.city}
                onChange={handleChange}
                className="rInput"
                required
              />
              <input
                type="tel"
                placeholder="Số điện thoại"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="rInput"
                required
              />
              <input
                type="password"
                placeholder="Mật khẩu"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="rInput"
                required
              />
              <input
                type="password"
                placeholder="Xác nhận mật khẩu"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="rInput"
                required
              />
              <button type="submit" disabled={loading} className="rButton">
                Đăng ký
              </button>
              <Link to="/login" className="tForget">
                Đã có tài khoản? Đăng nhập ngay
              </Link>
              {error && <span>{error}</span>}
            </form>
          </div>
        </div>
      );    
  };
  
  export default Register;
  