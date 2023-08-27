import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import useFetch from "../../hooks/useFetch";

const Navbar = () => {
  // const { user } = useContext(AuthContext);
  // console.log("user", user)
  const {data: user, loading, error } = useFetch("/users/get-user-info");
  const { user: userStore, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    let res = await axios.get("/auth/logout");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  }
  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const res = await axios.get("/auth");
  //       setUser(res.data);
  //     } catch (err) {
  //       setUser(null);
  //     }
  //   };
  //   getUser();
  // }, []);
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">HomaTour -  51900335</span>
        </Link>

        {((user && user.fullname) || (userStore && userStore.fullname)) ? (
          <div className="wrapper-header">
            <div > Xin chào {user.fullname || userStore.fullname} </div>
            <button className="navButton" onClick={logout}>Đăng xuất</button>
          </div>
        ) : (
          <div className="navItems">
              <Link to="/register" style={{ color: "inherit", textDecoration: "none" }}>
                <button className="navButton">Đăng ký</button>
              </Link>
              <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
                <button className="navButton">Đăng nhập</button>
              </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;