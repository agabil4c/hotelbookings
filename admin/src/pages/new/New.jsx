import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect } from "react";
import axios from "axios";

const New = ({ title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [selectedRole, setSelectedRole] = useState("");
  const [roleData,setRoleData] = useState([])
  const [countryData, setCountryData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [citySelected, setCitySelected] = useState(true);
  const [gender, setGender] = useState("");
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    axios.get("/roles").then(res => {
      setRoleData(res.data);
    })
    .catch(error => {
      console.log("The error is "+ error);
    })

    //countries API
    axios.get("https://countriesnow.space/api/v0.1/countries") .then((res) => {
        setCountryData(res.data.data);
    })
    .catch((error) => {
        console.log("The error "+ error);
    })
  });
  
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const getCities = async (selectedCountry) => {
      // setLoading(true);
      // await axios.post("https://countriesnow.space/api/v0.1/countries/cities",{
      //     "country": selectedCountry
      // })
      // .then((res) => {
      //     setCityData(res.data.data);
      //     setCitySelected(false);
      //     setLoading(false);
      // })
      // .catch((error) => {
      //     console.log(error);
      //     setCitySelected(true);
      //     setLoading(false);
      // })
      countryData.map((item) => {
        if (item.country === selectedCountry){
          setCityData(item.cities);
          setCitySelected(false);
        }
      });
  };

const handleCountrySelect = (e) => {
    setCountry(e.target.value);
    getCities(e.target.value);
};

  const handleSelection = (e) => {
    setSelectedRole(e.target.value);
  };


  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dozi5ka8z/image/upload",
        data
      );

      const { url } = uploadRes.data;

      const newUser = {
        img: url,
        role_id: selectedRole,
        gender: gender,
        idType:idType,
        idNumber:idNumber,
        isAdmin:true,
      };
      console.log("The users body "+ newUser);
      // await axios.post("/auth/register", newUser);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(info);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
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
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                <label>Role</label>
                <select name="selectedRole" onChange={handleSelection}>
                  {roleData.map((role) => (
                    <option value={role._id}>{role.name}</option>
                  ))}
                </select>
              </div>

              {/* {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))} */}
              <div className="formInput" key="gender">
                  <label>Gender</label>
                  <select name="gender" onChange={(e) => setGender(e.target.value)}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Others</option>
                  </select>
              </div>
              <div className="formInput" key="idType">
                  <label>ID Type</label>
                  <select name="idType" onChange={(e) => setIdType(e.target.value)}>
                    <option value="nin">National ID</option>
                    <option value="passport">Passport</option>
                    <option value="refugee">Refugee Card</option>
                  </select>
              </div>
              <div className="formInput">
                <label>ID number</label>
                <input 
                  placeholder="ID Number"
                  type={idType === "passport" ? "tel" : "text"}
                  id="idNumber"
                  onChange={(e) => setIdNumber(e.target.value)}
                />
              </div>
              <div className="formInput" key="country">
                  <label>Country</label>
                  <select name="country" onChange={handleCountrySelect}>
                      {countryData.map((item) => (
                          <option value={item.country}>{item.country}</option>
                      ))}
                  </select>
              </div>
              <div className="formInput" key="city">
                  <label>City</label>
                  <select name="city" onChange={(e) => setCity(e.target.value)} disabled={citySelected}>
                      {cityData.map((item) => (
                          <option value={item}>{item}</option>
                      ))}
                  </select>
              </div>
              
              {loading ? (
                 <CircularProgress />
              ) : (
                <button onClick={handleClick}>Send</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
