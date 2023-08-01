import useFetch from "../../hooks/useFetch";
import "./propertyList.css";

const PropertyList = () => {
  const { data, loading, error } = useFetch("/tours/countByType");

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
              <div className="pListItem" key={i}>
                <img
                  src={img}
                  alt=""
                  className="pListImg"
                />
                <div className="pListTitles">
                  <h1>{data[i]?.type}</h1>
                  <h2>{data[i]?.count} {data[i]?.type}</h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;