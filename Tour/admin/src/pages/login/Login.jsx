import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
// import { AuthContext } from "../../context/AuthContext";
import "./login.scss";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      if (res?.data?.role == 'admin' || res?.data?.role == "staff") {
        let token = res?.data?.token
        if(!token) {
          dispatch({ type: "LOGIN_FAILURE", payload: { message: "Sai thông tin đăng nhập hoặc tài khoản của bạn không được cấp quyền!" } });
          return;
        }
        localStorage.setItem("token", token);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        if(res?.data?.role == "staff") {
          navigate("/tourguide");
        } else {
          navigate("/");
        }
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "Sai thông tin đăng nhập hoặc tài khoản của bạn không được cấp quyền!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
      <span className="tLogin">
          Đăng nhập Trang Admin
        </span>
        <input
          type="text"
          placeholder="Tài khoản"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Đăng nhập
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;