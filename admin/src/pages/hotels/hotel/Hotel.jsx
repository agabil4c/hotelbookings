import "./hotel.scss";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import Chart from "../../../components/chart/Chart";
import List from "../../../components/table/Table";
import Sidebar from "../../../components/sidebar/Sidebar";
import { fetchHotel } from "../../../hooks/hotelApiServices";
import Swal from "sweetalert2";
import HotelTabs from "./HotelTabs";

const Hotel = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [hotel, setHotel] = useState();
  const [hotelID, setHotelID] = useState();
  const getHotel = async (id) => {
    try {
      const result = await fetchHotel(`/hotels/find/${id}`);
      if (result) {
        const { data } = result;
        setHotel(data);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.message,
        timer: 2000,
      });
    }
  };

  useEffect(() => {
    const pathname = location.pathname.split("/");
    const hotelId = pathname && pathname[2];
    getHotel(hotelId);
    setHotelID(hotelId);
  }, []);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle"></h1>
                <div className="detailItem">
                  <span className="itemKey">ID:</span>
                  <span className="itemValue">{hotelID}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Title:</span>
                  <span className="itemValue">{hotel && hotel.title}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Type:</span>
                  <span className="itemValue">{hotel && hotel.type}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description: </span>
                  <span className="itemValue">{hotel && hotel.desc}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    {hotel && hotel.address} in {hotel && hotel.city} City
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Distance:</span>
                  <span className="itemValue">{hotel && hotel.distance}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Status:</span>
                  <span className="itemValue">{hotel && hotel.status}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Cheapest Price:</span>
                  <span className="itemValue">
                    {hotel && hotel.cheapestPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Hotel Management</h1>
          <HotelTabs />
        </div>
      </div>
    </div>
  );
};

export default Hotel;
