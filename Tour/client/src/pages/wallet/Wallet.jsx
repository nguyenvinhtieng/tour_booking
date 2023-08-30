import "./wallet.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import React, { useMemo } from 'react';
import Modal from "../../components/modal/Modal";
import { toast } from "react-toastify";
import axios from "axios";
const Wallet = () => {
  const {data: user, loading, error } = useFetch("/users/get-user-info");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const inputRef = useRef(null);
  const [data, setData] = useState([]);
  const [tourSelected, setTourSelected] = useState(null);

  const navigate = useNavigate()

  const fetchDataWalletPage = async () => {
    try {
      const res = await axios.get("/users/get-data-wallet");
      const {dataWallet, bookings} = res.data;
      let mergeData = [...dataWallet, ...bookings];
      mergeData.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
      setData(mergeData);

    } catch (error) {
      console.log(error);
      navigate("/login")
    }
  }
  useEffect(() => {
    fetchDataWalletPage();
  }, []);

  const handleTriggerModal = () => {
    setShow(prev => !prev)
  }
  const handleTriggerModal1 = () => {
    setShow1(prev => !prev)
  }
  const handleTriggerModal2 = () => {
    setShow2(prev => !prev)
  }
  const handleNap = () => {
    setShow(false)
    setShow1(true)
  }

  const handleAddMoney = async () => {
    let money = inputRef.current.value;
    if(money < 0) {
      toast.error("Số tiền không hợp lệ");
      return;
    }
    try {
      let res = await axios.post("/users/add-money", {money});
      toast.success('Nạp tiền thành công');
      user.balance = res.data.balance;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      inputRef.current.value = "";
      setShow1(false);
      fetchDataWalletPage();
    }
      
  }

  const formatDate = (date) => {
    let d = new Date(date);
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const handleShowCanelTour = (id) => {
    setShow2(true);
    setTourSelected(id);
  }

  const handleCancelTour = async () => {
    try {
      await axios.post("/users/cancel-tour", {id: tourSelected});
      toast.success("Hủy tour thành công");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setShow2(false);
      fetchDataWalletPage();
    }
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="tourContainer">
        <div className="wallet__top">
          <div className="wallet__top-container">
            <p>Số dư khả dụng: <b>{user && user.balance} VNĐ</b></p>
            <button onClick={()=>handleTriggerModal()}>Nạp Tiền Vào Ví</button>
          </div>
        </div>
        <div className="wallet__container mt-30">
          <p className="center"><b>Lịch sử giao dịch</b></p>
          <div className="table">
            <div className="row header">
              <div className="cell">No.</div>
              <div className="cell">Ngày</div>
              <div className="cell">Loại giao dịch</div>
              <div className="cell">Số tiền</div>
              <div className="cell">Trạng thái</div>
              <div className="cell">Hành động</div>
            </div>
            {data && data.length > 0 && data.map((item, index) => {
                return (
                  <div className="row" key={item._id}>
                    <div className="cell" data-title="No.">{index + 1}</div>
                    <div className="cell" data-title="Ngày">{formatDate(item.createdAt)}</div>
                    <div className="cell" data-title="Loại giao dịch">{item.money ? "Nạp tiền" : "Đặt tour"}</div>
                    <div className="cell" data-title="Số tiền">
                      {item.money ? (<span className="green"> + {item.money } VNĐ</span>) :  (<span className="red"> - {item.price } VNĐ</span>)}
                    </div>
                    <div className="cell" data-title="Trạng thái">{item.money ? "Thành công" :  (<span>{item.status}</span>)}</div>
                    <div className="cell" data-title="Hành động">
                      {item.money && "" }
                      {!item.money && item.status === "confirming" && (<button className="c-btn-02" onClick={()=> handleShowCanelTour(item._id)}>Hủy tour</button>)}</div>
                  </div>
                )
              })}
          </div>
        </div>
        <Modal title="Nạp tiền vào ví" isShow={show} handleClose={handleTriggerModal}>
          <input type="number" className="c-input" placeholder="Nhập số tiền muốn nạp" ref={inputRef} min="0"/>
          <div className="flex-gap-10 mt-10">
            <button className="c-btn-01" onClick={handleNap}>Nạp tiền</button>
            <button className="c-btn-gray" onClick={handleTriggerModal}>Đóng</button>
          </div>
        </Modal>
        <Modal title="Xác nhận" isShow={show1} handleClose={handleTriggerModal1}>
          <p>Bạn có chắc muốn nạp só tiền <b>{inputRef?.current?.value || 0}</b> vào tài khoản của bạn?</p>
          <div className="flex-gap-10 mt-10">
            <button className="c-btn-01" onClick={handleAddMoney}>Nạp tiền vào tài khoản</button>
            <button className="c-btn-gray" onClick={handleTriggerModal1}>Đóng</button>
          </div>
        </Modal>
        <Modal title="Xác nhận" isShow={show2} handleClose={handleTriggerModal2}>
          <p>Bạn có chắc muốn hủy tour này?</p>
          <div className="flex-gap-10 mt-10">
            <button className="c-btn-02" onClick={handleCancelTour}>Xác nhận hủy tour</button>
            <button className="c-btn-gray" onClick={handleTriggerModal2}>Đóng</button>
          </div>
        </Modal>


        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Wallet;