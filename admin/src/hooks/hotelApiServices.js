import axios from "axios";

export const fetchHotels = async (url) => {
  const res = await axios.get(url);
  return res
};

export const fetchHotel = async (url) => {
  const res = await axios.get(url);
  return res
};