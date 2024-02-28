import "./rolesTable.scss";
import axios from "axios";
import { useEffect, useState } from "react"
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Swal from "sweetalert2";
import { Link, useLocation } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { roleColumns } from "../../datatablesource";
import { permissions } from "../../pageActions";
import { CardHeader, Checkbox, FormControlLabel } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "60%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 345,
    bgcolor: 'background.paper',
    border: '0px',
    boxShadow: 0,
    p: 4,
  };

function RolesTable() {
    const [roles,setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const path = location.pathname.split("/")[1];
    const [deleteModal, setDeleteModal] = useState(false);
    const [roleObj, setRoleObj] = useState({});
    var count = 0;

    const handleOpen = (row) => {
        setOpen(true);
        setRoleObj(row);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteModalOpen = (row) => {
        setDeleteModal(true);
        setRoleObj(row);
    };

    const handleDeleteModalClose = () => {
        setDeleteModal(false);
    };

    function createData(name, action) {
        return { name, action };
      }
      
    const rows = [
    createData('Hotels', {rules: {
        modify: false,
        view: true,
      }}),
    createData('Packages', {rules: {
        modify: false,
        view: true,
      }}),
    createData('Users', {rules: {
        modify: false,
        view: true,
      }}),
    createData('Roles', {rules: {
        modify: false,
        view: true,
      }}),
    createData('Bookings', {rules: {
        modify: false,
        view: true,
      }}),
    ];

    useEffect(() => {
        setLoading(true);
        axios.get("roles").then((res) => {
            setRoles(res.data);
            setLoading(false)
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        })
    },[]);

    const reloadTable = async() => {
        setLoading(true);
        await axios.get("roles").then((res) => {
            setRoles(res.data);
            setLoading(false);
        })
        .catch((error) => {
            setLoading(false);
        })
    };

    const roleDelete = async(data) => {
        try {
            await axios.delete(`/roles/${data._id}`);
            Swal.fire({
                icon: "success",
                title: `You have successfully deleted ${data.name}`,
                timer:2000
            });
            handleDeleteModalClose();
            reloadTable();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "An error occured please try again!!!",
                timer:2000
              });
        }
    };

    const actionColumn = [
        {
          field: "action",
          headerName: "Action",
          width: 150,
          renderCell: (params) => {
            return (
                
                <div className="cellAction">
                {/* <Link to="/users/test" style={{ textDecoration: "none" }}>
                  <div className="viewButton">View</div>
                </Link> */}
                <button onClick={() => handleOpen(params.row)} className="viewButton"><VisibilityIcon/></button>
                <div
                  className="deleteButton"
                  onClick={() => handleDeleteModalOpen(params.row)}
                >
                  <DeleteIcon/>
                </div>
              </div>
            );
          },
        },
      ];

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                {loading ? (
                    <LinearProgress color="secondary"/>
                ):(
                    <Box sx={{ width: '100%' }}>
                        <div className="datatable">
                            <div className="datatableTitle">
                                {path}
                                <Link to={`/${path}/new`} className="link">
                                Add New
                                </Link>
                            </div>
                            <DataGrid 
                                autoHeight
                                rows={roles}
                                columns={roleColumns.concat(actionColumn)}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 }
                                    }
                                }}
                                pageSizeOptions={[5, 10]}
                                getRowId={(row) => row._id}
                            />
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="child-modal-title"
                                aria-describedby="child-modal-description"
                            >
                                <Box sx={style}>
                                    <form>
                                        <input 
                                            type="hidden"
                                            name="roleId"
                                            value=""
                                        />
                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                                <TableHead>
                                                <TableRow>
                                                    <TableCell>Module</TableCell>
                                                    <TableCell>Actions</TableCell>
                                                </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                {rows.map((row) => (
                                                    <TableRow
                                                    key={row.name}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                    <TableCell component="th" scope="row">
                                                        <FormControlLabel control={<Checkbox size="small" />} label={row.name}/>
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">     
                                                        {Object.values(row.action).map((value, index) => {
                                                            return(
                                                                Object.keys(value).map((value, index) => {
                                                                    return (
                                                                        <FormControlLabel control={<Checkbox size="small" key={index} />} label={value}/>                                                                        
                                                                    );
                                                                })
                                                            );                                                                                                                        
                                                        })}                                                                                                            
                                                    </TableCell>                                                    
                                                    </TableRow>
                                                ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer> 
                                        <Button type="submit" size="small" variant="outlined" align="right"> Update</Button>
                                    </form>
                                </Box>
                                                                                    
                            </Modal>
                            <Modal
                                open={deleteModal}
                                onClose={handleDeleteModalClose}
                                aria-labelledby="delete-modal"
                                aria-describedby="delete-modal-description"
                            >
                                <Box sx={style2}>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardHeader
                                            title="Delete Role"
                                        />
                                        <CardContent>
                                            <div><p>Are you sure you want to delete {roleObj.name} </p></div>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" onClick={() => roleDelete(roleObj)}>Yes</Button>
                                            <Button size="small" onClick={() => handleDeleteModalClose()}>Cancel</Button>
                                        </CardActions>
                                    </Card>
                                </Box>
                            </Modal>
                        </div>
                    </Box>
                    
                )}
                
            </div>
        </div>
    );
};

export default RolesTable;