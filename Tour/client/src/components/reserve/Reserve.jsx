import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useId, useRef, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Reserve = ({ setOpen, tourId, tour }) => {
  const [selectedTrips, setSelectedTrips] = useState([]);
  const { data, loading, error } = useFetch(`/trips/`);
  const {data: user} = useFetch("/users/get-user-info");
  const { data: services } = useFetch(`/service`);
  const { dates } = useContext(SearchContext);
  const discountRef = useRef();
  // console.log("user", user)
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  // const [services, setServices] = useState([]);


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
    
    if(discountRef.current.value) {
      try {
        const res = await axios.get(`/discount/check-discount/${discountRef.current.value}`);
        if(!res.data.status) {
          toast.error(res.data.message);
          return;
        }
      } catch (err) {
        console.log("err: ", err);
      }
    }
    if(!selectedTrip) {
      toast.error("Vui lòng chọn loại chuyến đi");
      return;
    }
    let totalPrice = caculatePrice();
    let userBalance = user.balance;
    if(totalPrice > userBalance) {
      toast.error("Số dư không đủ để đặt tour này");
      return;
    }
    

    try {
      const res = await axios.post("/booking/", {
        tour_id: tourId,
        trip_id: selectedTrip,
        services: selectedServices,
        discount: discountRef.current.value,
      });
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

  const handleChangeService = (id) => {
    const index = selectedServices.findIndex(item => item === id);
    if(index === -1) {
      setSelectedServices([...selectedServices, id]);
    } else {
      setSelectedServices(selectedServices.filter(item => item !== id));
    }
  }
  function caculatePrice() {
    if(!selectedTrip) return tour.cheapestPrice;
    const trip = data.find(item => item._id === selectedTrip);
    let price = trip.price;
    let total = tour.cheapestPrice + tour.cheapestPrice * price / 100;

    selectedServices.forEach(item => {
      const service = services.find(service => service._id === item);
      total += Number(service.price);
    })

    let discount = 0;
    if(discountRef.current.value) {
      discount = Number(discountRef.current.value);
      total -= total * discount / 100;
    }

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
        <div className="wrap">
          <div className="col1">
            <span className="title">Lựa chọn trips: (bắt buộc)</span>
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
          </div>
          <div className="col1">
            <span className="title">Lựa chọn dịch vụ cho bạn</span>
            {services && services.length > 0 && services.map((item) => {
              let id = Math.random();
              return (
              <label htmlFor={id} className="rItem item-trip" key={item?._id}>
                <input type="checkbox" id={id} name="services" onChange={()=>handleChangeService(item._id)} value={item._id}/>
                <div className="rItemInfo">
                  <div className="rTitle">{item?.title}</div>
                  <div className="rDesc">{item?.description}</div>
                  <div className="rPrice">Giá: {item?.price}</div>
                </div>
              </label>
            )})}
          </div>
        </div>
        <span className="title">Mã giảm giá</span>
        <input ref={discountRef} type="text" className="input-01" placeholder="Nhập mã giảm giá nếu có"/>
        <button onClick={handleClick} className="rButton">
          Đặt ngay! 
        </button>
      </div>
    </div>
  );
};

export default Reserve;