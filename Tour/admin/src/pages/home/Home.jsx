import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/admin/data-dashboard");
      console.log(res.data.trips)
      setData(res.data);
    };
    getData();
  }, []);
  const getEarning = () => {
    let earning = 0;
    data?.bookings?.forEach((item) => {
      if(item.status == 'success')
        earning += item.price;
    });
    return earning;
  }
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" amount={data?.numberOfUsers || 0} />
          <Widget type="order" amount={data?.tours?.length || 0}/>
          <Widget type="earning" amount={getEarning()}/>
          <Widget type="balance" amount={data?.user?.balance || 0}/>
        </div>
        <div className="charts">
          <Featured bookings={data?.bookings || []}/>
          <Chart title="Doanh thu 6 tháng gần nhất" aspect={2 / 1} bookings={data?.bookings || []}/>
        </div>
        <div className="listContainer">
          <div className="listTitle">5 Latest Transactions</div>
          <Table bookings={data?.bookings || []}/>
        </div>
      </div>
    </div>
  );
};

export default Home;