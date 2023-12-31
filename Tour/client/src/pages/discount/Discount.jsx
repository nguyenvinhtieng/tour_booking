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

// import { MaterialReactTable } from 'material-react-table';


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
const Discount = () => {
  const [data, setData] = useState([]);
  const fetchDataWalletPage = async () => {
    try {
      const res = await axios.get("/discount");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  }
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  return `${formattedDay}/${formattedMonth}/${year}`;
}
  useEffect(() => {
    fetchDataWalletPage();
  }, []);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="tourContainer">
        <div className="wallet__container mt-30">
          <h1 className="center"><b>Các mã khuyến mãi đang có hiệu lực</b></h1>
          <div className="table">
            <div className="row header">
              <div className="cell">No.</div>
              <div className="cell">CODE</div>
              <div className="cell w-145">Chi tiết</div>
              <div className="cell">Ngày bắt đầu</div>
              <div className="cell">Ngày hết hạn</div>
              <div className="cell">Số lượng còn lại</div>
            </div>
            {data && data.length > 0 && data.map((item, index) => {
                return (
                  <div className="row" key={item._id}>
                    <div className="cell" data-title="No.">
                    {index + 1}
                    </div>
                    <div className="cell" data-title="CODE">
                    {item.code}
                    </div>
                    <div className="cell w-145" data-title="Chi tiết">
                    {item.description}
                    </div>
                    <div className="cell" data-title="Ngày bắt đầu">
                    {formatDate(item.startDate)}
                    </div>
                    <div className="cell" data-title="Ngày hết hạn">
                    {formatDate(item.endDate)}
                  </div>
                    <div className="cell" data-title="Số lượng còn lại">
                    {item.total - item.used}
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Discount;