// import PhotosUploader from "./PhotosUploader.jsx";
import Perks from "./Perks.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import AccountNav from "./AccountNav";
import {Link, Navigate, useParams} from "react-router-dom";
import Navbar from "../../components/navbar/Navbar.jsx";
import Header from "../../components/header/Header.jsx";
import PhotosUploader from "./PhotosUploader.jsx";
import {
  GetCountries,
  GetState,
  GetCity,
} from "react-country-state-city";


export default function PlacesFormPage() {
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [name,setName] = useState('');
  const [type,setType] = useState('');
  const [city,setCity] = useState('');
  const [address,setAddress] = useState('');
  const [addedPhotos,setAddedPhotos] = useState([]);
  const [desc,setDescription] = useState('');
  const [distance,setDistance] = useState('');
  const [perks,setPerks] = useState([]);
  const [extraInfo,setExtraInfo] = useState('');
  const [checkIn,setCheckIn] = useState('');
  const [checkOut,setCheckOut] = useState('');
  const [maxGuests,setMaxGuests] = useState(1);
  const [cheapestPrice,setPrice] = useState(100);
  const [redirect,setRedirect] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  //const [cityid, setCityid] = useState(0);

  const [countryList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/hotels/'+id).then(response => {
       const {data} = response;
       setTitle(data.title);
       setName(data.name);
       setAddress(data.address);
       setAddedPhotos(data.photos);
       setDescription(data.description);
       setDistance(data.distance);
       setPerks(data.perks);
       setExtraInfo(data.extraInfo);
       setCheckIn(data.checkIn);
       setCheckOut(data.checkOut);
       setMaxGuests(data.maxGuests);
       setPrice(data.price);
    });
  }, [id]);
  
  useEffect(() => {
    GetCountries().then((result) => {
      setCountriesList(result);
    });
  }, []);

  function inputHeader(text) {
    return (
      <h2 className="text-2xl mt-4">{text}</h2>
    );
  }
  function inputDescription(text) {
    return (
      <p className="text-gray-500 text-sm">{text}</p>
    );
  }
  function preInput(header,description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }
  const handleClick = event => {
    // 👇️ toggle shown state
    setIsShown(current => !current);
    setType("Hotel");
    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  async function savePlace(ev) {
    ev.preventDefault();
    const photos = addedPhotos;
    const placeData = {
      name, title, address, photos,
      desc, perks, extraInfo, distance, city, type,
      checkIn, checkOut, maxGuests, cheapestPrice,
    };
    if (id) {
      // update
      await axios.put('/hotels', {
        id, ...placeData
      });
      setRedirect(true);
    } else {
      // new place
      await axios.post('/hotels', placeData);
      setRedirect(true);
    }

  }

  if (redirect) {
    return <Navigate to={'/account/places'} />
  }

  return (
      <div>
        <Navbar />
        <Header type="list" />
        <AccountNav />
        {!isShown && (
        <div className="homeContainer">
          <h1 className="homeTitle">Select the type of property you want to list</h1>
          <div className="featured">
            <Link  onClick={handleClick}>
              <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">            
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
              </svg>
                <span><h1>Hotel</h1></span>              
              </label>
            </Link>
            <Link  to={'/account/places/new'}>
              <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                </svg>
                <span><h1>Apartments</h1></span>
                
              </label>
            </Link>
            <Link  to={'/account/places/new'}>
              <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                </svg>
                <span><h1>Resorts</h1></span>
                
              </label>
            </Link>
            
            <Link  to={'/account/places/new'}>
              <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                </svg>
                <span><h1>Villas</h1></span>
                
              </label>
            </Link>
            
            <Link  to={'/account/places/new'}>
              <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                </svg>
                <span><h1>Cabins</h1></span>
                
              </label>
            </Link>
            
            <Link  to={'/account/places/new'}>
              <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                </svg>
                <span><h1>Guest House</h1></span>
                
              </label>
            </Link>
            
          </div>
        </div>
        )}
        {isShown && (
          <div className="container m-auto border p-4 mt-4 rounded-2xl">
            <h1 className="homeTitle">Your Property Details</h1>
            <hr/>
            <div>
              <form  onSubmit={savePlace}>
                <div className="grid grid-flow-col gap-4">
                  <div>
                    {preInput('Name', 'Name of the property.')}
                    <input type="text" value={name} onChange={ev => setName(ev.target.value)} placeholder="name, for example: Bil Hotel"/>
                  </div>
                  <div>
                    {preInput('Title', 'Some niece title of your place.')}
                    <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My lovely apt"/>
                  </div>
                  <div>
                    {preInput('Address', 'Detailed address to guide the guests')}
                    <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address, for example: Kimathi Avenue Plot 8"/>
                  </div>                
                </div>
                <div className="grid grid-flow-col gap-4">
                  <div>
                    {preInput('Country')}
                    <select
                        onChange={(e) => {
                          const country = countryList[e.target.value]; //here you will get full country object.
                          setCountryid(country.id);
                          GetState(country.id).then((result) => {
                            setStateList(result);
                          });
                        }}
                        value={countryid}
                        // style={{ width: "100%", boxSizing: "border-box", padding: "5px", borderRadius: "5px", border: "1px solid #ccc", display: "flex", alignItems: "center", userSelect: "none",  justifyContent: "space-between"}}
                      >
                        {countryList.map((item, index) => (
                          <option key={index} value={index}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    {preInput('State')}
                    <select
                        onChange={(e) => {
                          const state = stateList[e.target.value]; //here you will get full country object.
                          setStateid(state.id);
                          setCity(e.target.value);
                          GetCity(countryid, state.id).then((result) => {
                            setCityList(result);
                          });
                        }}
                        value={stateid}
                        // style={{ width: "100%", boxSizing: "border-box", padding: "5px", borderRadius: "5px", border: "1px solid #ccc", display: "flex", alignItems: "center", userSelect: "none",  justifyContent: "space-between"}}
                      >
                        {stateList.map((item, index) => (
                          <option key={index} value={index}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                  </div>                  
                  <div>
                    {preInput('Distance from city')}
                    <input type="text" value={distance} onChange={ev => setDistance(ev.target.value)} placeholder="distance, for example: 8km"/>
                  </div>
                </div>
                <div className="grid grid-flow-col gap-4">
                  <div>
                    {preInput('Description','information about your property, not more than 100words')}
                    <textarea value={desc} onChange={ev => setDescription(ev.target.value)} />
                  </div>
                  <div>
                  {preInput('Extra info','house rules, etc')}
                  <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
                  </div>
                </div>
                <div className="grid grid-flow-col gap-4">
                  <div>
                    {preInput('Photos')}
                    <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                  </div>
                  <div>
                    {preInput('Check in&out times','add check in and out times, remember to have some time window for cleaning the room between guests')}
                    <div className="grid gap-2 grid-cols-2 md:grid-cols-2">
                    <div>
                        <h3 className="mt-2 -mb-1">Check in time</h3>
                        <input type="text"
                            value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)}
                            placeholder="14"/>
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check out time</h3>
                        <input type="text"
                            value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)}
                            placeholder="11" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max number of guests</h3>
                        <input type="number" value={maxGuests}
                            onChange={ev => setMaxGuests(ev.target.value)}/>
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Price per night</h3>
                        <input type="number" value={cheapestPrice}
                            onChange={ev => setPrice(ev.target.value)}/>
                    </div>
                    </div>
                  </div>
                </div>              
                <div className="grid grid-flow-col gap-4">
                  <div>
                    {preInput('Amenities','Select all the general amenities of your place')}
                    <div className="grid gap-3 grid-cols-4">
                    <Perks selected={perks} onChange={setPerks} />
                    </div>
                  </div>
                  
                </div>
                <hr className="mt-4"/>
                <div className="grid grid-flow-col gap-4">                  
                  <button className="row-start-1 row-end-4 primary my-4">Next</button>
                </div> 
                  
              </form>

            </div>
          </div>
        )}
      </div>
  );
}