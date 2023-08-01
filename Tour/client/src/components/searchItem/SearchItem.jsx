import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">Cách xa {item.distance}km</span>
        <span className="siTaxiOp">Miễn phí trung chuyển</span>
        <span className="siSubtitle">
          Tour này hiện đang trong mùa ưu đãi!
        </span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Miễn phí hủy </span>
        <span className="siCancelOpSubtitle">
          Đặt ngay để giữ nguyên giá tại thời điểm này!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
          <span>Đánh giá</span>
          <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">{item.cheapestPrice}.000 VNĐ</span>
          <span className="siTaxOp">Đã bao gồm thuế và phí</span>
          <Link to={`/tours/${item._id}`}>
          <button className="siCheckButton">Xem chi tiết</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;