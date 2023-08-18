import "./newTrip.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { serviceInputs } from "../../formSource";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const NewService = () => {
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/service`, { ...info });
      toast.success("Thêm dịch vụ thành công");
      navigate("/service");
    } catch (err) {
      toast.error("Thêm dịch vụ thất bại");
    }

  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Thêm dịch vụ mới</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {serviceInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <button onClick={handleClick}>Lưu</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewService;