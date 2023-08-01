import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, tourId }) => {
  const [selectedTrips, setSelectedTrips] = useState([]);
  const { data, loading, error } = useFetch(`/tours/trip/${tourId}`);
  const { dates } = useContext(SearchContext);

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

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

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
    try {
      await Promise.all(
        selectedTrips.map((tripId) => {
          const res = axios.put(`/trips/availability/${tripId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };
  return (
    <div className="reserve reserve-main">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span className="title">Select your trips:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Số khách tối đa: <b>{item.maxPeople}</b>  / <b>{item.tripNumbers.length}</b> options
              </div>
              <div className="rPrice">Giá: {item.price}</div>
            </div>
            <div className="rSelectTrips">
              {item.tripNumbers.map((tripNumber) => (
                <div className="trip checkbox-wrapper-37">
                  <label>{tripNumber.number}</label>
                  <input
                    type="checkbox"
                    value={tripNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(tripNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Đặt ngay!
        </button>
      </div>
    </div>
  );
};

export default Reserve;