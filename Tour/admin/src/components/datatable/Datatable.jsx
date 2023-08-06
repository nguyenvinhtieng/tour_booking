import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { toast } from "react-toastify";
const Datatable = ({columns}) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState();
  const { data, loading, error } = useFetch(`/${path}`);
  useEffect(() => {
    setList(data);
  }, [data]);

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
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        if(path == 'booking') {
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
              
            </div>
          );
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
        {path != 'booking' && <Link to={`/${path}/new`} className="link">
          Thêm mới
        </Link>}
        
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;