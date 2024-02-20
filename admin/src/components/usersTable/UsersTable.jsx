import "./UserTable.scss";
import axios from "axios";
import { useEffect, useState } from "react"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Swal from "sweetalert2";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";

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

function UsersTable() {
    const [users,setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [userObj, setUserObj] = useState({});

    const handleOpen = (row) => {
        setOpen(true);
        setUserObj(row);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteModalOpen = (row) => {
        setDeleteModal(true);
        setUserObj(row);
    };

    const handleDeleteModalClose = () => {
        setDeleteModal(false);
    };

    const handleUserStatus = async (status,rowId) => {
        try {
            await axios.post(`/users/status/${rowId}`, {"status":status});
            Swal.fire({
                icon: "success",
                title: `You have successfully ${status}ed`,
                timer:2000
            });
            handleClose();
            reloadTable();
            
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "An error occured please try again!!!",
                timer:2000
              });
        }
    };

    useEffect(() => {
        setLoading(true);
        axios.get("users").then((res) => {
            setUsers(res.data);
            setLoading(false)
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        })
    },[]);

    const reloadTable = async() => {
        setLoading(true);
        await axios.get("users").then((res) => {
            setUsers(res.data);
            setLoading(false);
        })
        .catch((error) => {
            setLoading(false);
        })
    };

    const userDelete = async(data) => {
        try {
            await axios.delete(`/users/${data._id}`);
            Swal.fire({
                icon: "success",
                title: `You have successfully deleted ${data.username}`,
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
          width: 200,
          renderCell: (params) => {
            return (
                <Stack direction="row" spacing={2}>
                    <Button onClick={() => handleOpen(params.row)} variant="contained">View</Button>
                    <Button onClick={() => handleDeleteModalOpen(params.row)} variant="contained">DELETE</Button>
                </Stack>
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
                    <>
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid 
                                rows={users}
                                columns={userColumns.concat(actionColumn)}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 }
                                    }
                                }}
                                pageSizeOptions={[5, 10]}
                                getRowId={(row) => row._id}
                            />
                        </div>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description"
                        >
                            <Box sx={style}>
                                {/* <div className="new">
                                    <div className="newContainer">
                                        <div className="top">{userObj.username}</div>
                                        <div className="bottom">
                                            <div className="left">
                                                <div>
                                                    Email: {userObj.email}
                                                </div>
                                                <div>
                                                    phone: {userObj.phone}
                                                </div>
                                            </div>
                                            <div className="right">
                                                <div>
                                                    Country: {userObj.country}
                                                </div>
                                                <div>
                                                    City: {userObj.city}
                                                </div>
                                            </div>
                                        </div>
                                        {userObj.status === "active" ? (
                                            <div><Button variant="outlined">Deactivate</Button></div>
                                        ): (
                                            <div><Button variant="outlined">Activate</Button></div>
                                        )}
                                    </div>
                                </div> */}
                                <Grid container spacing={2}>
                                <Grid item xs={6}>username:</Grid>
                                <Grid item xs={6}>{userObj.username}</Grid>
                                <Grid item xs={6}>Email:</Grid>
                                <Grid item xs={6}>{userObj.email}</Grid>
                                <Grid item xs={6}>Phone:</Grid>
                                <Grid item xs={6}>{userObj.phone}</Grid>
                                <Grid item xs={6}>Country:</Grid>
                                <Grid item xs={6}>{userObj.country}</Grid>
                                <Grid item xs={6}>City:</Grid>
                                <Grid item xs={6}>{userObj.city}</Grid>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={4}>
                                        {userObj.status === "active" ? (
                                                    <div><Button onClick={() => handleUserStatus("suspend",userObj._id)} variant="outlined">Deactivate</Button></div>
                                                ): (
                                                    <div><Button onClick={() => handleUserStatus("active",userObj._id)} variant="outlined">Activate</Button></div>
                                        )}
                                </Grid>
                                <Grid item xs={4}></Grid>
                            </Grid>
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
                                    <CardContent>
                                        <div><h2>Delete {userObj.username}</h2></div>
                                        <div><p>Are you sure you want to delete {userObj.username} account</p></div>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => userDelete(userObj)}>Yes</Button>
                                        <Button size="small" onClick={() => handleDeleteModalClose()}>Cancel</Button>
                                    </CardActions>
                                </Card>
                            </Box>
                        </Modal>
                    </>
                )}
                
            </div>
        </div>
    );
};

export default UsersTable;