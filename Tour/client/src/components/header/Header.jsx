import {
  faRoute,
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
  faUser,
  faBellConcierge,
  faBuilding,
  faCreditCard,
  faGifts,
  faDiamond,
  faBinoculars,
  faLifeRing,
  faMailBulk,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    trip: 1,
  });

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  // get current path ex: /wallet
  const currentPath = window.location.pathname.split("/")[1];

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options,  type: "" } });
    navigate("/tours", { state: { destination, dates, options,  type: "" } });
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <Link to="/" className={`headerListItem ${currentPath === "" ? "active" : ""}`}>
            <FontAwesomeIcon icon={faRoute} />
            <span>Xem Tour</span>
          </Link>
          <Link to="/services" className={`headerListItem ${currentPath === "services" ? "active" : ""}`}>
          <FontAwesomeIcon icon={faBinoculars} />
            <span>Dịch vụ</span>
          </Link>
          <Link to="/discount" className={`headerListItem ${currentPath === "discount" ? "active" : ""}`}>
          <FontAwesomeIcon icon={faGifts} />
            <span>Khuyến mãi</span>
          </Link>
          {user && (
          <Link to='/wallet' className={`headerListItem ${currentPath === "wallet" ? "active" : ""}`}>
            <FontAwesomeIcon icon={faCreditCard} />
            <span>Ví của tôi</span>
          </Link>
          )}
          <Link to='/' className="headerListItem">
            <FontAwesomeIcon icon={faBuilding} />
            <span>Về chúng tôi</span>
          </Link>
          <Link to='/' className="headerListItem">
            <FontAwesomeIcon icon={faLifeRing} />
            <span>Hỗ trợ</span>
          </Link>
          <Link to='/' className="headerListItem">
            <FontAwesomeIcon icon={faEnvelope} />
            <span>Liên hệ</span>
          </Link>
        </div>
        
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              Vì cuộc đời là những chuyến đi
            </h1>
            <p className="headerDesc">
              Hãy để HomaTour nâng cấp cuộc hành trình của bạn.
            </p>
            <p className="headerTitle">
              Đăng ký ngay để không bỏ lỡ mùa hè năng động ngập tràn khuyến mãi!
            </p>
            {!user && <button className="headerBtn">Sign in / Register</button>}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faRoute} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Bạn muốn đi đâu?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} người lớn · ${options.children} trẻ em`}</span>
                 {/* · ${options.trip} chuyến đi */}
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Người lớn</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Trẻ em</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {/* <div className="optionItem">
                      <span className="optionText">Trip</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.trip <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("trip", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.trip}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("trip", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div> */}
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Tìm kiếm
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
