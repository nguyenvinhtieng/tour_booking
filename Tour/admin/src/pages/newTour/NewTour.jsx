import "./newTour.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { tourInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const NewTour = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [trips, setTrips] = useState([]);

  const { data, loading, error } = useFetch("/trips");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setTrips(value);
  };
  
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          
          // const uploadRes = await axios.post(
          //   "https://api.cloudinary.com/v1_1/de2tmby25/image/upload",
          //   data
          // );
          let resU = await fetch("https://api.cloudinary.com/v1_1/de2tmby25/image/upload", {
            method: "POST",
            body: data,
          })
    
          const uploadRes = await resU.json();
          const { url } = uploadRes;

          // const { url } = uploadRes.data;
          return url;
        })
      );

      const newtour = {
        ...info,
        trips,
        photos: list,
      };
      let res = await axios.post("/tours", newtour);
      toast.success("Thêm tour thành công");
      navigate("/tours");
    } catch (err) {console.log(err)}
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Thêm Tour mới</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Hình ảnh: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {tourInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              
              <div className="formInput">
                <label>Tour nổi bật?</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>Không</option>
                  <option value={true}>Có</option>
                </select>
              </div>
              <div className="selectTrips">
                <label>Loại chuyến đi   </label>
                <select id="trips" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((trip) => (
                        <option key={trip._id} value={trip._id}>
                          {trip.title}
                        </option>
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

export default NewTour;