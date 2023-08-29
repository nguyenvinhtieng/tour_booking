import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/tours?featured=true&min=100");
  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            <Link to={`/tours/${item._id}`} className="fpItem" key={item._id}>
              <img
                src={item.photos[0]}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Giá chỉ từ {item.cheapestPrice} VNĐ</span>
              {item.rating && <div className="fpRating">
                <button>{item.rating}</button>
                <span>Đánh giá </span>
              </div>}
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
