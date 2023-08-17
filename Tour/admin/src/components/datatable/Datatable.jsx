import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "../modal/Modal";
const Datatable = ({columns}) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState();
  const { data, loading, error } = useFetch(`/${path}`);
  // get my infor
  const [isShowModal, setIsShowModal] = useState(false);
  const [tourGuides, setTourGuides] = useState([]);

  const { data: user } = useFetch("/users/get-user-info");
  const { data: tourguidelist } = useFetch("/tourguide/get-all-tourguide");
  const [tourSelected, setTourSelected] = useState(null);
  let selectRef = useRef();
  useEffect(() => {
    setList(data);
    setTourGuides(tourguidelist);
  }, [data, tourguidelist]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };
  const handleAcceptTour = async (id) => {
    try {
      let res = await axios.post(`/booking/accept`, {id});
      let dataRes = res.data;
      if(dataRes.status) {
        let newList = [...list].map((item) => {
          if(item._id == id) {
            item.status = 'success';
          }
          return item;
        });
        setList(newList);
        toast.success(dataRes.message);
      }else {
        let newList = [...list].map((item) => {
          if(item._id == id) {
            item.status = 'canceled';
          }
          return item;
        });
        setList(newList);
        toast.error(dataRes.message);
      }
    } catch (err) {}
  }
  const handleCancelTour = async (id) => {
    try {
      let res = await axios.post(`/booking/cancel`, {id});
      let dataRes = res.data;
      if(dataRes.status) {
        let newList = [...list].map((item) => {
          if(item._id == id) {
            item.status = 'canceled';
          }
          return item;
        });
        setList(newList);
        toast.success(dataRes.message);
      }else {
        toast.error(dataRes.message);
      }
    } catch (err) {}
  }
  const handleBookingTour = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn đặt tour này!") == true) {
      try {
        let res = await axios.post(`/tourguide`, {id});
        let dataRes = res.data;
        if(dataRes.status) {
          let newList = [...list].map((item) => {
            if(item._id == id) {
              item.tour_guide = user._id;
            }
            return item;
          });
          setList(newList);
          toast.success(dataRes.message);
        }else {
          toast.error(dataRes.message);
        }
      } catch (err) {}
    } else {
      // text = "You canceled!";
    }
    
  }
  const handleShowTourGuide = async (id) => {
    setIsShowModal(true);
    setTourSelected(id);
  }
  const handleConfirmTourGuide = async () => {
    let userId = selectRef.current.value;
    if(!userId) {
      toast.error('Bạn chưa chọn tour guide');
      return;
    }
    try {
      let res = await axios.post(`/tourguide/booking`, {id:tourSelected, userId});
      let dataRes = res.data;
      if(dataRes.status) {
        let tourGuide = tourGuides.find((item) => item._id == userId);
        let newList = [...list].map((item) => {
          if(item._id == tourSelected) {
            item.tour_guide = tourGuide;
          }
          return item;
        });

        setList(newList);
        setIsShowModal(false);
        toast.success(dataRes.message);
      }else {
        toast.error(dataRes.message);
      }
    } catch (err) {}

  }
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        if(path == 'booking' && user.role == "admin") {
          let row = params.row;
          return (
            <div className="cellAction">
              {row.status == "confirming" &&  <div
                className="viewButton"
                onClick={() => handleAcceptTour(row._id)}
              >
                Chấp nhận
              </div>}
              {row.status == "confirming" &&  <div
                className="deleteButton"
                onClick={() => handleCancelTour(row._id)}
              >
                Hủy đặt
              </div>}
              {row.status == "success" && !row.tour_guide &&  <div
                className="viewButton"
                onClick={() => handleShowTourGuide(row._id)}
              >
                Chọn tourguide
              </div>}
              {row.status == "success" && row.tour_guide && <span>{row.tour_guide.fullname} - {row.tour_guide._id}</span>}
            </div>
          );
        }
        if(path == 'tourguide') {
          document.title = "Đăng ký tourguide cho tour";
          let row = params.row;
          return (
            <div className="cellAction">
              {user._id == row.tour_guide &&  <p>Bạn đã đăng ký tour này</p>}
              {row.tour_guide && user._id != row.tour_guide &&  <p>Tour này đã có người khác đăng ký</p>}
              {!row.tour_guide &&  <div
                className="viewButton"
                onClick={() => handleBookingTour(row._id)}
              >
                Đăng ký tour
              </div>}
            </div>
          );
        }
        if(user.role == "staff") {
          return <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">Xem</div>
            </Link>
          </div>
        }
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">Xem</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Xóa
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        {user.role == "admin" && !(path == 'booking' || path == 'tourguide') && <Link to={`/${path}/new`} className="link">
          Thêm mới
        </Link>}  
      </div>
      <DataGrid
        className="datagrid"
        rows={list || []}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
      <Modal
        isShow={isShowModal}
        handleClose={() => setIsShowModal(false)}
        title="Danh sách tourguide"
      >
        <p>Vui lòng chọn tourguide cho tour này</p>
        <select name="" id="" className="c-input-select" ref={selectRef}>
          <option value="">--Select--</option>
          {tourGuides.length > 0 && tourGuides.map((item) => {
            return <option value={item._id} key={item._id}>{item.fullname} - {item._id}</option>
          })}
        </select>
        <button className="c-btn-submit" onClick={handleConfirmTourGuide}>Confirm</button>
      </Modal>
    </div>
  );
};

export default Datatable;