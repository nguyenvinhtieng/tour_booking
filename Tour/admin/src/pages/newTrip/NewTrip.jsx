import "./newTrip.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { tripInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewTrip = () => {
  const [info, setInfo] = useState({});
  const [tourId, setTourId] = useState(undefined);
  const [trips, setTrips] = useState([]);

  const { data, loading, error } = useFetch("/tours");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const tripNumbers = trips.split(",").map((trip) => ({ number: trip }));
    try {
      await axios.post(`/trips/${tourId}`, { ...info, tripNumbers });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(info)
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Thêm loại chuyến đi</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {tripInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Loại chuyến đi</label>
                <textarea
                  onChange={(e) => setTrips(e.target.value)}
                  placeholder="Loại chuyến đi."
                />
              </div>
              <div className="formInput">
                <label>Chọn một Tour</label>
                <select
                  id="tourId"
                  onChange={(e) => setTourId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data.map((tour) => (
                        <option key={tour._id} value={tour._id}>{tour.name}</option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Lưu</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTrip;