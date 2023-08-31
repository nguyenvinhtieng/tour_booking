import "./tour.css";
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
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

const Tour = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(`/tours/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { dates, options } = useContext(SearchContext);
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    if(!date1 || !date2) return 0;
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="tourContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="tourWrapper">
            <button className="bookNow" onClick={handleClick}>Đi tới đặt chỗ</button>
            <h1 className="tourTitle">{data.name}</h1>
            <div className="tourAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="tourDistance">
              Hành trình tuyệt vời – {data.distance}km từ vị trí hiện tại
            </span>
            <span className="tourPriceHighlight">
              Đặt với giá chỉ từ {data.cheapestPrice} VNĐ ngay thời điểm này để được miễn phí trung chuyển!
            </span>
            <div className="tourImages">
              {data.photos?.map((photo, i) => (
                <div className="" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="tourImg"
                  />
                </div>
              ))}
            </div>
            <div className="tourDetails">
              <div className="tourDetailsTexts">
                <h1 className="tourTitle">{data.title}</h1>
                <p className="tourDesc">{data.desc}</p>
              </div>
              <div className="tourDetailsPrice">
                <h1>Lựa chọn tuyệt vời cho hành trình {days+1} ngày {days} đêm</h1>
                <span>
                  Địa điểm này nằm trong danh sách những Tour đáng trải nghiệm nhất mùa hè năm 2023!
                </span>
                <h2>
                  <b>{data.cheapestPrice} VNĐ</b> ({days+1}N{days}Đ)
                </h2>
                <button onClick={handleClick}>Giữ chỗ và Đặt ngay!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && data && <Reserve setOpen={setOpenModal} tourId={id} tour={data} startDate={dates[0]?.startDate} endDate={dates[0]?.endDate}/>}
    </div>
  );
};

export default Tour;