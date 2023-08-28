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
          <div class="table">
            <div class="row header">
              <div class="cell">No.</div>
              <div class="cell">CODE</div>
              <div class="cell w-145">Chi tiết</div>
              <div class="cell">Ngày bắt đầu</div>
              <div class="cell">Ngày hết hạn</div>
              <div class="cell">Số lượng còn lại</div>
            </div>
            {data && data.length > 0 && data.map((item, index) => {
                return (
                  <div class="row" key={item._id}>
                    <div class="cell" data-title="No.">
                    {index + 1}
                    </div>
                    <div class="cell" data-title="CODE">
                    {item.code}
                    </div>
                    <div class="cell w-145" data-title="Chi tiết">
                    {item.description}
                    </div>
                    <div class="cell" data-title="Ngày bắt đầu">
                    {item.startDate}
                    </div>
                    <div class="cell" data-title="Ngày hết hạn">
                    {item.endDate}
                    </div>
                    <div class="cell" data-title="Số lượng còn lại">
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