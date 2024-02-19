import "./UserTable.scss";
import axios from "axios";
import { useEffect, useState } from "react"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
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

function UsersTable() {
    const [users,setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [userObj, setUserObj] = useState({});

    const handleOpen = (row) => {
        setOpen(true);
        setUserObj(row);
    };

    const handleClose = () => {
        setOpen(false);
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

    const actionColumn = [
        {
          field: "action",
          headerName: "Action",
          width: 200,
          renderCell: (params) => {
            return (
                <Stack direction="row" spacing={2}>
                    <Button onClick={() => handleOpen(params.row)} variant="contained">View</Button>
                    <Button variant="contained">DELETE</Button>
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
                        <div className="new">
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
                        </div>
                    </Box>
                    
                </Modal>
                {/* <div className="table table-dark">
                    {loading ? (
                        <div>Loading ...</div>
                    ):(
                        <>
                            <h1>Users</h1>
                            <table border={1}>
                                <tr>
                                    <th scope="col">User</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Country</th>
                                    <th scope="col">City</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Action</th>
                                </tr>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.country}</td>
                                        <td>{user.city}</td>
                                        <td>{user.phone}</td>
                                        <td><Button onClick={() => handleOpen(user)}>View</Button> <button>delete</button></td>
                                    </tr>
                                ))}
                            </table>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="child-modal-title"
                                aria-describedby="child-modal-description"
                            >
                                <Box sx={style}>
                                    <div className="new">
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
                                        </div>
                                    </div>
                                </Box>
                                
                            </Modal>
                        </>
                    )}
                </div> */}
            </div>
        </div>
    );
};

export default UsersTable;