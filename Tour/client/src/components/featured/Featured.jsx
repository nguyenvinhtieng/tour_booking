import { useContext, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import "./featured.css";
import axios from "axios";
import { SearchContext } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/tours/countByCity/count?cities=Sài Gòn,Đà Lạt,Vũng Tàu"
  );

  const { dispatch } = useContext(SearchContext);
  const navigate = useNavigate();
  const defaultDates = [{
    "startDate": new Date(),
    "endDate": new Date(),
    "key": "selection"
  }]
  const defaultOptions = {
    "adult": 1,
    "children": 0,
    "trip": 1
  }
  const handleSearchDestination = (des) => {
    dispatch({ type: "NEW_SEARCH", payload: { destination: des, dates: defaultDates, options: defaultOptions, type: "" }});
    navigate("/tours", { state: { destination: des, dates: defaultDates, options: defaultOptions, type: "" } });
  };

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div onClick={()=>handleSearchDestination("Sài Gòn")} className="featuredItem">
            <img
              src="https://statics.vinpearl.com/dac-san-sai-gon-lam-qua-0_1624720587.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Sài Gòn</h1>
              <h2>{data[0]} Tours</h2>
            </div>
          </div>

          <div onClick={()=>handleSearchDestination("Đà Lạt")} className="featuredItem">
            <img
              src="https://vcdn1-dulich.vnecdn.net/2022/09/11/2-1662873807.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=2vpxy7rKgBQpLhVKY39L7w"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Đà Lạt </h1>
              <h2>{data[1]} Tours</h2>
            </div>
          </div>
          <div onClick={()=>handleSearchDestination("Vũng Tàu")} className="featuredItem">
            <img
              src="https://storage.googleapis.com/public-tripi/tripi-feed/img/467050NGS/ba-ria-vung-tau.jpeg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Vũng Tàu</h1>
              <h2>{data[2]} Tours</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;