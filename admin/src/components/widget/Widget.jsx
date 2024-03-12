import "./widget.scss";
import { useEffect, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import axios from "axios";

const Widget = ({ type, startDate, endDate }) => {
  let data;
  const [userCount,setUserCount] = useState(0);
  const [hotelCount,setHotelCount] = useState(0);
  const [bookingCount,setBookingCount] = useState(0);

  useEffect(() => {
    axios.get(`/users/count/status?startDate=${startDate}&endDate=${endDate}`).then((res) => {
      if(res.data.length === 0){
        setUserCount(0);
      }
      else {
        setUserCount(res.data[0].users);
      }
      
    })
    axios.get(`/hotels/count/status?startDate=${startDate}&endDate=${endDate}`).then((res) => {
      
      if (res.data.length === 0) {
        setHotelCount(0);
      }
      else {
        setHotelCount(res.data[0].hotels);
      }
    })
  });

  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        value: userCount,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "hotel":
      data = {
        title: "HOTELS",
        isMoney: false,
        link: "View all hotels",
        value: hotelCount,
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "booking":
      data = {
        title: "BOOKINGS",
        isMoney: true,
        link: "View Bookings",
        value: bookingCount,
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        value: 100,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.value}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
