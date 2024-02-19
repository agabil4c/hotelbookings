import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import Select from 'react-select'
import { roleInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";


const NewRole = () => {
    const [selected, setSelected] = useState([]);
    const [name, setName] = useState("");

    const permissions = [
        {
            "name": "Hotels",
            "rules": {
                "modify": false,
                "view": true
            }
        },
        {
            "name": "Packages",
            "rules": {
                "modify": false,
                "view": true
            }
        },
        {
            "name": "Users",
            "rules": {
                "modify": false,
                "view": true
            }
        },
        {
            "name": "Roles",
            "rules": {
                "modify": false,
                "view": true
            }
        },
        {
            "name": "Bookings",
            "rules": {
                "modify": false,
                "view": true
            }
        }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("The name is "+ name);
        console.log("The permissions "+ JSON.stringify(selected));
    };

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
            <Navbar />
            <div className="top">
                <h1>Create Role</h1>
            </div>
            <div className="bottom">
                <div className="left"></div>
                <div className="right">
                    <form>
                        <div className="formInput">
                            <label>Role Name</label>
                            <input 
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <table
                            className="table table-striped"
                        >
                            <thead>
                            <tr>
                                <td>Module</td>
                                <td>Action</td>
                            </tr>
                            </thead>
                            <tbody>
                                {permissions.map((val,key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{val.name}</td>
                                            <Select 
                                                options={permissions}
                                                name= {val.name}
                                                onChange={setSelected}
                                            />
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <button onClick={handleSubmit}>Send</button>
                    </form>
                </div>
            </div>
            </div>
        </div>
    );
};

export default NewRole;