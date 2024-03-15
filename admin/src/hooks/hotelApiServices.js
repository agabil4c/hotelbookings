import axios from "axios";

const fetchHotels = async (url) => {
  const res = await axios.get(url);
  return res
};

export default fetchHotels;