import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const { dispatch: dispatchAuth } = useContext(AuthContext)
  const { data: user } = useFetch("/users/get-user-info");
  const logout = () => {
    localStorage.removeItem("user")
    dispatchAuth({type: "LOGOUT"})
  }
  return (
    <div className="sidebar">
      <div className="top">
        <Link to={user.isAdmin ? "/" : "/tourguide"} style={{ textDecoration: "none" }}>
          <span className="logo">HomaTour</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Chính</p>
          <Link to={user.isAdmin ? "/" : "/tourguide"} style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">Danh sách</p>
          {user.isAdmin && 
            <>
              <Link to="/users" style={{ textDecoration: "none" }}>
                <li>
                  <PersonOutlineIcon className="icon" />
                  <span>Danh sách người dùng</span>
                </li>
              </Link>
              <Link to="/tours" style={{ textDecoration: "none" }}>
                <li>
                  <StoreIcon className="icon" />
                  <span>Tour du lịch</span>
                </li>
              </Link>
              <Link to="/booking" style={{ textDecoration: "none" }}>
                <li>
                  <NotificationsNoneIcon className="icon" />
                  <span>Đặt tour</span>
                </li>
              </Link>
              <Link to="/trips" style={{ textDecoration: "none" }}>
                <li>
                  <CreditCardIcon className="icon" />
                  <span>Loại hình chuyến đi</span>
                </li>
              </Link>
            </>
          }
          {user.isStaff && 
            <Link to="/tourguide" style={{ textDecoration: "none" }}>
              <li>
                <StoreIcon className="icon" />
                <span>Đăng ký tour</span>
              </li>
            </Link>
          }
            
          <li>
            <LocalShippingIcon className="icon" />
            <span>Khác</span>
          </li>
          <p className="title">Tiện ích</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Thông số</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Thông báo</span>
          </li>
          <p className="title">Dịch vụ</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>Chăm sóc khách hàng</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Test</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Thiết lập</span>
          </li>
          <p className="title">Tài khoản</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Thông tin</span>
          </li>
          <li onClick={logout}>
            <ExitToAppIcon className="icon" />
            <span>Đăng xuất</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;