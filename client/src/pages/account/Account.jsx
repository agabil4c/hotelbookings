import {useContext, useState} from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, useParams} from "react-router-dom";
import axios from "axios";
import AccountNav from "./AccountNav.jsx";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import PlacesPage from "./PlacesPage";

export default function ProfilePage() {
  const [redirect,setRedirect] = useState(null);
  const {dispatch, loading , user, setUser} = useContext(AuthContext);
  let {subpage} = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  async function logout() {
    await axios.post('/auth/logout');
    dispatch({ type: "LOGOUT" });
    setRedirect('/');
    setUser(null);
  }

  if (loading && !user && !redirect) {
    return <Navigate to={'/login'} />
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <AccountNav />
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.username} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
        </div>
      )}
      {subpage === 'places' && (
        <PlacesPage />
      )}
    </div>
  );
}