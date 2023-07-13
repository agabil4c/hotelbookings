import {Link, useParams} from "react-router-dom";
import AccountNav from "./AccountNav.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import PlaceImg from "./PlaceImg";
import Navbar from "../../components/navbar/Navbar.jsx";
import Header from "../../components/header/Header.jsx";
import useFetch from "../../hooks/useFetch.js";
import { da } from "date-fns/locale";
import "./account.scss";
export default function PlacesPage() {
  const { data } = useFetch("/hotels");
  console.log(data);

  return (
    <div>
        <Navbar />
        <Header type="list" />
        <AccountNav />
        <div className="text-center">
          <Link className="inline-flex gap-1 bg-blue-800 text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
            </svg>
            Add new place
          </Link>
        </div>
        <div className="w-full flex justify-center mt-8 gap-2 mb-8" >
          {data.length > 0 && data.map(place => (
            <div className="single">
                <div className="singleContainer">
                    <div className="top">
                        <div className="left">
                        <Link to={'/account/places/'+place._id} className="flex-colyy gap-4 bg-gray-200 rounded-2xl overflow-hidden" ></Link>
                            <div className="editButton">Edit</div>
                            <h1 className="title">Information</h1>
                            <div className="item">
                                <img
                                    src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                                    alt=""
                                    className="itemImg"
                                />
                                <div className="details">
                                    <h2 className="text-xl">{place.title}</h2>
                                    <div className="detailItem">
                                    <p className="text-sm mt-2">{place.desc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                        </div>
                    </div>
                </div>
            </div>
          ))}
          
        </div>
    </div>
  );
}