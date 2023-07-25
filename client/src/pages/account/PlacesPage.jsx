import {Link} from "react-router-dom";
import AccountNav from "./AccountNav.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import Header from "../../components/header/Header.jsx";
import useFetch from "../../hooks/useFetch.js";
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
        <div className="container m-auto mt-6">
          <div style={{
            width: "100%",
            maxWidth: "1024px",
            display: "flex",
            justifyContent: "space-between",
            gap: "20px"
          }}>
            <>
              {data.length > 0 && data.map(place => (
                <div className="pListItem" key={place._id}>
                  <img
                    src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                    alt=""
                    className="pListImg rounded-2xl object-cover aspect-square"
                  />
                  <div className="pListTitles">
                    <h1>{place.title}</h1>
                    <h2>{place.desc}</h2>
                  </div>
                </div>
              ))}
            </>
          </div>
      </div>  
    </div>
  );
}