import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";

const Single = () => {
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Chỉnh sửa</div>
            <h1 className="title">Thông tin</h1>
            <div className="item">
              <img
                src="https://res.cloudinary.com/de2tmby25/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1689733353/54bdf66422a6f8f8a1b7_yl1iiw.jpg?_s=public-apps"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">Minh Hoàng</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">hoangdtm01@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Điện thoại:</span>
                  <span className="itemValue">+84 941357075</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Địa chỉ:</span>
                  <span className="itemValue">
                    1123 Huỳnh Tấn Phát, Phường Phú Thuận, Quận 7
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Quốc gia:</span>
                  <span className="itemValue">Việt Nam</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="Tổng thu (6 tháng gần nhất)" />
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Giao dịch gần đây</h1>
          <List/>
        </div>
      </div>
    </div>
  );
};

export default Single;