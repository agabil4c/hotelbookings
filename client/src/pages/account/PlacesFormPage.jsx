// import PhotosUploader from "./PhotosUploader.jsx";
import Perks from "./Perks.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import AccountNav from "./AccountNav";
import {Navigate, useParams} from "react-router-dom";
import Navbar from "../../components/navbar/Navbar.jsx";
import Header from "../../components/header/Header.jsx";

export default function PlacesFormPage() {
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [address,setAddress] = useState('');
  const [addedPhotos,setAddedPhotos] = useState([]);
  const [description,setDescription] = useState('');
  const [perks,setPerks] = useState([]);
  const [extraInfo,setExtraInfo] = useState('');
  const [checkIn,setCheckIn] = useState('');
  const [checkOut,setCheckOut] = useState('');
  const [maxGuests,setMaxGuests] = useState(1);
  const [price,setPrice] = useState(100);
  const [redirect,setRedirect] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/hotels/'+id).then(response => {
       const {data} = response;
       setTitle(data.title);
       setAddress(data.address);
       setAddedPhotos(data.photos);
       setDescription(data.description);
       setPerks(data.perks);
       setExtraInfo(data.extraInfo);
       setCheckIn(data.checkIn);
       setCheckOut(data.checkOut);
       setMaxGuests(data.maxGuests);
       setPrice(data.price);
    });
  }, [id]);
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

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title, address, addedPhotos,
      description, perks, extraInfo,
      checkIn, checkOut, maxGuests, price,
    };
    if (id) {
      // update
      await axios.put('/places', {
        id, ...placeData
      });
      setRedirect(true);
    } else {
      // new place
      await axios.post('/places', placeData);
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
        <div className="container m-auto">
          <form  onSubmit={savePlace}>
            <div class="grid grid-flow-col gap-4">
              <div>
                {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My lovely apt"/>
              </div>
             
              <div>
                {preInput('Address', 'Address to your place')}
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)}placeholder="address"/>
              </div>
              
            </div>
            <div className="grid grid-flow-col gap-4">
              <div>
                {preInput('Description','description of the place')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
              </div>
              <div>
              {preInput('Extra info','house rules, etc')}
              <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
              </div>
            </div>
            {preInput('Photos','more = better')}
            {/* <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} /> */}
            <div className="grid grid-flow-col gap-4">
              <div>
                {preInput('Perks','select all the perks of your place')}
                <div className="grid gap-3 grid-cols-3">
                <Perks selected={perks} onChange={setPerks} />
                </div>
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
                    <input type="number" value={price}
                        onChange={ev => setPrice(ev.target.value)}/>
                </div>
                </div>
              </div>
            </div>
            <div className="grid grid-flow-col gap-4">
              <button className="row-start-1 row-end-4 info rounded-2xl my-4">Cancel</button>
              <button className="row-start-1 row-end-4 primary my-4">Save</button>
            </div> 
              
          </form>

        </div>
      </div>
  );
}