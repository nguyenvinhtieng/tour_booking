import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useId, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Reserve = ({ setOpen, tourId, tour }) => {
  const [selectedTrips, setSelectedTrips] = useState([]);
  const { data, loading, error } = useFetch(`/trips/`);
  const {data: user} = useFetch("/users/get-user-info");
  const { dates } = useContext(SearchContext);
  // console.log("user", user)
  const [selectedTrip, setSelectedTrip] = useState(null);
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const date = new Date(start.getTime());
    
    const dates = [];
    
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    
    return dates;
  };

  const alldates = null;
  // const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  
  const isAvailable = (tripNumber) => {
    const isFound = tripNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
      );
      
      return !isFound;
  };

  
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedTrips(
      checked
        ? [...selectedTrips, value]
        : selectedTrips.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    let totalPrice = caculatePrice();
    let userBalance = user.balance;
    if(totalPrice > userBalance) {
      toast.error("Số dư không đủ để đặt tour này");
      return;
    }
    if(!selectedTrip) {
      toast.error("Vui lòng chọn loại chuyến đi");
      return;
    }
    try {
      const res = await axios.post("/booking/", {
        tour_id: tourId,
        trip_id: selectedTrip,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setOpen(false);
      toast.success("Đặt tour thành công, vui lòng chờ xác nhận từ admin");
    }
    // start dat phong

    // try {
    //   await Promise.all(
    //     selectedTrips.map((tripId) => {
    //       const res = axios.put(`/trips/availability/${tripId}`, {
    //         dates: alldates,
    //       });
    //       return res.data;
    //     })
    //   );
    //   setOpen(false);
    //   navigate("/");
    // } catch (err) {}
  };

  function caculatePrice() {
    if(!selectedTrip) return tour.cheapestPrice;
    const trip = data.find(item => item._id === selectedTrip);
    let price = trip.price;
    let total = tour.cheapestPrice + tour.cheapestPrice * price / 100;
    return total;
  }
  const handleChangeChecked = (e) => {
    const value = e.target.value;
    setSelectedTrip(value);
  }
  
  return (
    <div className="reserve reserve-main">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span className="title">Select your trips:</span>
        {data && data.length > 0 && data.map((item) => {
          let id = Math.random();
          return (
          <label htmlFor={id} className="rItem item-trip" key={item?._id}>
            <input type="radio" id={id} name="trip" onChange={handleChangeChecked} value={item._id}/>
            <div className="rItemInfo">
              <div className="rTitle">{item?.title}</div>
              <div className="rDesc">{item?.desc}</div>
              <div className="rMax">
                Số khách tối đa: <b>{item?.maxPeople}</b>  
                {/* / <b>{item?.tripNumbers.length}</b> options */}
              </div>
              <div className="rPrice">Giá: {item?.price} %</div>
            </div>
            {/* <div className="rSelectTrips">
              {item.tripNumbers && item.tripNumbers.map((tripNumber) => (
                <div className="trip checkbox-wrapper-37" key={tripNumber?._id}>
                  <label>{tripNumber.number}</label>
                  <input
                    type="checkbox"
                    value={tripNumber?._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(tripNumber)}
                  />
                </div>
              ))}
            </div> */}
          </label>
          )})}
        <button onClick={handleClick} className="rButton">
          Đặt ngay! 
        </button>
      </div>
    </div>
  );
};

export default Reserve;