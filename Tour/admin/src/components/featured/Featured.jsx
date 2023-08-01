import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useState } from "react";
import { useEffect } from "react";

const Featured = ({trips}) => {
  const [data, setData] = useState(0);
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  useEffect(() => {
    
    let totalMoney = 0;
    trips.forEach((trip) => {
      if (new Date(trip.createdAt).getMonth() === currentMonth && new Date(trip.createdAt).getFullYear() === currentYear) {
        totalMoney += trip.price;
      }
    });
    setData(totalMoney);
  }, [trips]);

  const formatMoney = (money) => {
    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Tổng thu nhập</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="title">Tổng thu nhập tháng này <br /> (Tháng {currentMonth + 1} Năm {currentYear})</p>
        <p className="amount">{formatMoney(data)} VNĐ</p>
        <p className="desc">
          Chưa bao gồm các khoản thu gần nhất.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Mục tiêu</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">560.000 VNĐ</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Tuần trước</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">620.000 VNĐ</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Tháng trước</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">560.000 VNĐ</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;