import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import ProfilePage from "./pages/account/Account";
import PlacesPage from "./pages/account/PlacesPage";
import PlacesFormPage from "./pages/account/PlacesFormPage";
import BookingsPage from "./pages/bookings/bookingsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<ProfilePage />} />
        <Route path="/account/bookings" element={<BookingsPage />} />
        <Route path="/account/places" element={<PlacesPage />} />
        <Route path="/account/places/new" element={<PlacesFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
