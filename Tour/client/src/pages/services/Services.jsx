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
const Services = () => {
  const { data: user, loading, error } = useFetch("/users/get-user-info");
  const [data, setData] = useState([]);
  const fetchDataWalletPage = async () => {
    try {
      const res = await axios.get("/service");
      setData(res.data);
      // const {dataWallet, bookings} = res.data;
      // let mergeData = [...dataWallet, ...bookings];
      // mergeData.sort((a, b) => {
      //   return new Date(b.createdAt) - new Date(a.createdAt);
      // })
      // setData(mergeData);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchDataWalletPage();
  }, []);

  // const columns = useMemo(
  //   () => [
  //     {
  //       accessorKey: 'title',
  //       header: 'Tên',
  //       size: 200,
  //     },
  //     {
  //       accessorKey: 'description',
  //       header: 'Chi tiết',
  //       size: 150,
  //     },
  //     {
  //       accessorKey: 'price',
  //       header: 'Giá tiền',
  //       size: 150,
  //     },
  //   ],
  //   [],
  // );

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="tourContainer">
        <div className="wallet__container mt-30">
          <h1 className="center"><b>Các dịch vụ đang được ưu đãi</b></h1>
          <div class="table">
            <div class="row header">
              <div class="cell">No.</div>
              <div class="cell">Tên</div>
              <div class="cell">Chi tiết</div>
              <div class="cell">Giá tiền</div>
            </div>
            {data && data.length > 0 && data.map((item, index) => {
                return (
                  <div class="row" key={item._id}>
                    <div class="cell" data-title="No.">
                    {index + 1}
                    </div>
                    <div class="cell" data-title="Tên">
                    {item.title}
                    </div>
                    <div class="cell" data-title="Chi tiết">
                    {item.description}
                    </div>
                    <div class="cell" data-title="Giá tiền">
                    {item.price} NVĐ
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

export default Services;