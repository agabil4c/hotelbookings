import "./hotels.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import HotelDatatable from "../../components/datatable/hotels/HotelDatatable";

const Hotels = ({columns}) => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <HotelDatatable columns={columns} />
      </div>
    </div>
  );
}

export default Hotels