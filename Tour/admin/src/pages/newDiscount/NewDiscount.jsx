import "./newTrip.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { discountInputs, serviceInputs } from "../../formSource";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/modal/Modal";
const NewDiscount = () => {
  const [info, setInfo] = useState({});
  const [isShowModal, setIsShowModal] = useState(false);
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const navigate = useNavigate();
  const toggleModal = () => {
    setIsShowModal(!isShowModal);
  }
  const handleConfirm = async () => {
    try {
      let res = await axios.post(`/discount`, { ...info, used: 0 });
      const d = res.data;
      navigate("/discount");
      toast.success("Thêm mã giảm giá thành công");
    } catch (err) {
      toast.error("Thêm mã giảm giá thất bại");
    } finally {
      toggleModal();
    }
  }
  const handleClick = async (e) => {
    e.preventDefault();
    console.log(info)
    toggleModal();
    
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Thêm mã giảm giá mới</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {discountInputs.map((input) => (
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

      <Modal isShow={isShowModal} handleClose={toggleModal} title="Xác nhận tạo mã giảm giá">
        <p>Bạn có xác nhận tạo mã giảm giá <b>{ info.code }</b> với các thông tin như đã điền</p>
        <button className="c-btn-submit" onClick={handleConfirm}>Xác nhận</button>
        <button className="c-btn-gray" onClick={toggleModal}>Cancel</button>
      </Modal>
    </div>
  );
};

export default NewDiscount;