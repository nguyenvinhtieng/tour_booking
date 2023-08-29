import { useContext } from "react";
import useFetch from "../../hooks/useFetch";
import "./propertyList.css";
import { SearchContext } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";

const PropertyList = () => {
  const { data, loading, error } = useFetch("/tours/countByType/count");
  console.log(data);
  const { dispatch } = useContext(SearchContext);
  const navigate = useNavigate();
  const defaultDates = [{
    "startDate": new Date(),
    "endDate": new Date(),
    "key": "selection"
  }]
  const defaultOptions = {
    "adult": 1,
    "children": 0,
    "trip": 1
  }
  const handleSearchType = (type) => {
    dispatch({ type: "NEW_SEARCH", payload: { destination: "", dates: defaultDates, options: defaultOptions, type: type }});
    navigate("/tours", { state: { destination: "", dates: defaultDates, options: defaultOptions, type: type } });
  };


  const images = [
    "https://espc.com.vn/mediacenter/media/images/1595/news/ava/s1000_1000/mu-cang-chai-1512708804.png",
    "https://dulichviet.com.vn/images/bandidau/top-4-bai-bien-dep-duoc-du-khach-danh-gia-cao-nhat-tai-viet-nam.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOv2PbAMu4tKYFEw9BUulhQ3T-xy3TUoOyLg&usqp=CAU",
    "https://huongvietmart.vn/wp-content/uploads/2022/09/san-pham-dac-trung-cua-mien-bac-va-mien-nam-1.jpg",
    "https://bcp.cdnchinhphu.vn/334894974524682240/2022/12/23/dien-tich-cac-quan-tai-ho-chi-minh-1-16717832922811126226268.jpg",
  ];
  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          {data &&
            images.map((img,i) => (
              <div className="pListItem" key={i} onClick={()=>handleSearchType(data[i]?.type)}>
                <img
                  src={img}
                  alt=""
                  className="pListImg"
                />
                <div className="pListTitles">
                  <h1>{data[i]?.type}</h1>
                  <h2>{data[i]?.count} Tours</h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;