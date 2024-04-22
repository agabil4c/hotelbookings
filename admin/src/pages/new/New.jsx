import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import CircularProgress from '@mui/material/CircularProgress';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { TextField, Button, Grid } from '@mui/material';
import { useState, useEffect } from "react";
import axios from "axios";

const New = () => {
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
      setLoading(true);
      await axios.post("https://countriesnow.space/api/v0.1/countries/cities",{
          "country": selectedCountry
      })
      .then((res) => {
          setCityData(res.data.data);
          setCitySelected(false);
          setLoading(false);
      })
      .catch((error) => {
          console.log(error);
          setCitySelected(true);
          setLoading(false);
      })
      // countryData.forEach((item) => {
      //   if (item.country === selectedCountry){
      //     setCityData(item.cities);
      //     // setCitySelected(false);
      //   }
      // });
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
    console.log("The data "+ data);
    try {
      // const uploadRes = await axios.post(
      //   "https://api.cloudinary.com/v1_1/dozi5ka8z/image/upload",
      //   data
      // );

      // const { url } = uploadRes.data;

      const newUser = {
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
          <h1>Create New User</h1>
        </div>
        <div className="bottom">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {/* <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              /> */}
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel id="role-label">Role</InputLabel>
                      <Select
                        labelId="role"
                        id="role"
                        value={selectedRole}
                        onChange={handleSelection}
                      >
                        <MenuItem value="none"> Non Selected</MenuItem>
                        {roleData.map((role) => (
                          <MenuItem value={role._id}>{role.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel id="gender-label">Gender</InputLabel>
                      <Select
                          labelId="gender"
                          id="gender"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <MenuItem value="none"> Non Selected</MenuItem>
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                          <MenuItem value="Other">Others</MenuItem>
                        </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel id="idType-label">ID Type</InputLabel>
                      <Select
                        labelId="idType"
                        id="idType"
                        value={idType}
                        onChange={(e) => setIdType(e.target.value)}
                      >
                        <MenuItem value="none"> Non Selected</MenuItem>
                        <MenuItem value="nin">National ID</MenuItem>
                        <MenuItem value="passport">Passport</MenuItem>
                        <MenuItem value="refugee">Refugee Card</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="ID Number"
                      type="text"
                      fullWidth
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel id="country-label">Country</InputLabel>
                      <Select
                        labelId="country"
                        id="country"
                        value={country}
                        onChange={handleCountrySelect}
                      >
                        <MenuItem value="none"> Non Selected</MenuItem>
                        {countryData.map((item) => (
                          <MenuItem value={item.country}>{item.country}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  {/* <Grid item xs={12}>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel id="city-label">City</InputLabel>
                      <Select
                        labelId="city"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      >
                        <MenuItem value="none"> Non Selected</MenuItem>
                        {cityData.map((item) => (
                          <MenuItem value={item}>{item}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid> */}
                  <Grid item xs={12}>
                      {loading ? (
                          <CircularProgress />
                      ) : (
                          <Button variant="contained" color="primary" onClick={handleClick}>
                              Create
                          </Button>
                      )}
                      
                  </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* <div className="left">
            
          </div>
          <div className="right">
            
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default New;
