import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Single = ({info}) => {
  const location = useLocation();
  const fullPath = location.pathname.split("/");
  const path = fullPath[fullPath.length - 2]
  const id = fullPath[fullPath.length - 1]
  const { data, loading, error } = useFetch(`/${path}/${id}`);
  console.log(data)
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            {/* <div className="editButton">Chỉnh sửa</div> */}
            <h1 className="title">Thông tin</h1>
            <div className="item">
              {info?.image && data[info.image.field] &&
                <img src={info?.image.index ? data[info.image.field][info?.image.index] : data[info.image.field]} className="itemImg" />
              }
              
              <div className="details">
                {info?.title && 
                <h1 className="itemTitle">{data[info.title.field]}</h1>}
                {info?.data?.length > 0 &&
                  info.data.map((item, idx) => (
                    <div className="detailItem" key={idx}>
                      <span className="itemKey">{item.label}:</span>
                      <span className="itemValue">{data[item.field]}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          {/* <div className="right"> */}
            {/* <Chart aspect={3 / 1} title="Tổng thu (6 tháng gần nhất)" /> */}
          {/* </div> */}
        </div>
        {/* <div className="bottom">
          <h1 className="title">Giao dịch gần đây</h1>
          <List/>
        </div> */}
      </div>
    </div>
  );
};

export default Single;