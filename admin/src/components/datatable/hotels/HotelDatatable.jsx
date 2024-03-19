import "./hotelDatatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchHotels }  from "../../../hooks/hotelApiServices"
import Swal from "sweetalert2";
import axios from "axios";
import { Modal } from "@mui/base";
import { Box } from "@mui/material";

const HotelDatatable = ({columns}) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState();
  
  const [open, setOpen] = useState(false);
  const [userObj, setUserObj] = useState({});

  const getHotels = async () =>{
    try{
      const result = await fetchHotels(`/${path}`);
      if (result) {
        const { data } = result;
        setList(data);
      }
    } catch(error){
      Swal.fire({
        icon: "error",
        title: error.message,
        timer: 2000,
      });
    }
  }

  useEffect(() => {
    getHotels()
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  const handleOpen = (row) => {
    console.log("Opened modal "+ JSON.stringify(row));
    setUserObj(row);
    setOpen(true);
  };


  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/hotels/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list ?? []}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={(row) => row._id}
      />
      
    </div>
  );
};

export default HotelDatatable;
