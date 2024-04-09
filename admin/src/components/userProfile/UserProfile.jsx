import "./UserProfile.scss";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import { useEffect, useState } from "react";
import { userEditInputs } from "../../formSource";
import Swal from "sweetalert2";
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import axios from "axios";

const UserProfile = () => {
    const [info, setInfo] = useState({});
    const [file, setFile] = useState("");
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [userData, setUserData] = useState({});
    const [countryData, setCountryData] = useState([]);
    const [cityData, setCityData] = useState([]);
    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("user"));
        setPageLoading(true)
        // setUserData(savedData);
        // setCity(savedData.city);
        // setPhone(savedData.phone);
        // setCountry(savedData.country);
        // setEmail(savedData.email);
        // setUserName(savedData.username);
        axios.get(`/users/${savedData._id}`).then((res) => {
            var receivedData = res.data;
            console.log("Received data ", res.data);
            setUserData(receivedData);
            setCity(receivedData.city);
            setPhone(receivedData.phone);
            setCountry(receivedData.country);
            setEmail(receivedData.email);
            setUserName(receivedData.username);
        })
        .catch((error) => {
            console.log(error);
            setPageLoading(false);
            Swal.fire({
                icon: "error",
                title: "There was an error getting your profile",
                timer:2000
              });
        })
        axios.get("https://countriesnow.space/api/v0.1/countries") .then((res) => {
            setCountryData(res.data.data);
        })
        .catch((error) => {
            console.log("The error "+ error);
        })
        setPageLoading(false)
    }, []);

    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [phone, setPhone] = useState("");

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        console.log("The info ",info);
      };

    const loadUserProfile = async () => {
        try {
            await axios.get(`/users/${userData._id}`).then((res) => {
                var receivedData = res.data;
                setUserData(receivedData);
                setCity(receivedData.city);
                setPhone(receivedData.phone);
                setCountry(receivedData.country);
                setEmail(receivedData.email);
                setUserName(receivedData.username);
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "There was an error getting your profile",
                    timer:2000
                  });
            })
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "There was an error getting your profile",
                timer:2000
              });
        }
    };

    const getCities = async (selectedCountry) => {
        setLoading(true);
        await axios.post("https://countriesnow.space/api/v0.1/countries/cities",{
            "country": selectedCountry
        })
        .then((res) => {
            setCityData(res.data.data);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        })
    };

    const handleCountrySelect = (e) => {
        setCountry(e.target.value);
        getCities(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            var data = {
                username:username,
                email:email,
                city:city,
                country:country,
                phone:phone
            }
            await axios.put(`/users/${userData._id}`, data);
            loadUserProfile();
            setLoading(false);
            Swal.fire({
                icon: "success",
                title: `You have successfully edited your profile`,
                timer:2000
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "There was an error updating your profile",
                timer:2000
              });
        }
    };

    return (
        <div className="new">
            <Sidebar/>
            <div className="newContainer">
                <Navbar/>
                {pageLoading ? (
                    <LinearProgress color="secondary"/>
                ): (
                    <>
                        <div className="top">
                            <h1>Edit User {username}</h1>
                        </div>
                        <div className="bottom">
                            <div className="left">
                                <img
                                    src={
                                        file
                                        ? URL.createObjectURL(file)
                                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                    }
                                    alt=""
                                />
                            </div>
                            <div className="right">
                                <form>
                                    <div className="formInput">
                                        <label htmlFor="file">
                                            Add Image
                                        </label>
                                        <input
                                            type="file"
                                            id="file"
                                        />
                                        { file === "" ? (
                                            <div></div>
                                        ): (
                                            <img src={file} width="200" height={150}/>
                                        )}
                                        
                                    </div>
                                    {/* {userEditInputs.map((user) => (
                                        <div className="formInput" key={user.id}>
                                            <label>{user.label}</label>
                                            <input
                                                id={user.id}
                                                type={user.type}
                                                disabled={user.disabled}
                                                value={userData[user.id]}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    ))} */}
                                    <div className="formInput" key="username">
                                        <label>username</label>
                                        <input
                                            id="username"
                                            type="text"
                                            disabled={true}
                                            value={username}
                                        />
                                    </div>
                                    <div className="formInput" key="email">
                                        <label>email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            disabled={true}
                                            value={email}
                                        />
                                    </div>
                                    <div className="formInput" key="phone">
                                        <label>phone</label>
                                        <input
                                            id="phone"
                                            type="text"
                                            disabled={false}
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                    <div className="formInput" key="country">
                                        <label>Country</label>
                                        <select name="country" onChange={handleCountrySelect}>
                                            {countryData.map((item) => (
                                                <option value={item.country} selected={item.country.toLowerCase() === country.toLowerCase()}>{item.country}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="formInput">
                                        <label>City</label>
                                        <select name="city" onChange={(e) => setCity(e.target.value)} disabled={country === ""}>
                                            {cityData.map((item) => (
                                                <option value={item} selected={item.toLowerCase() === city.toLowerCase()}>{item}</option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                    {loading ? (
                                        <CircularProgress />
                                    ) :
                                        <button onClick={handleSubmit}>Update</button>
                                    }
                                    
                                </form>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default UserProfile;