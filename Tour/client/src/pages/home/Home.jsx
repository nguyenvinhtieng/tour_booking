import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import SlideShow from "../../components/slider/SlideShow";
import "./home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header/>
      <div className="homeContainer">
        <h1 className="homeTitle">Các thành phố được yêu thích</h1>
        <Featured/>
        <SlideShow/>
        <h1 className="homeTitle">Tìm kiểu hành trình phù hợp với bạn</h1>
        <PropertyList/>
        <h1 className="homeTitle">Top những Tour được yêu thích nhất</h1>
        <FeaturedProperties/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;