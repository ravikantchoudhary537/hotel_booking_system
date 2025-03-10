import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://localhost:5000/api";


const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  // console.log("Token mil gya ya mhi ",token)
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const registerUser = async (userData) => axios.post(`${API_URL}/auth/register`, userData);

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  return response.data; 
};

export const getHotels = async () => axios.get(`${API_URL}/hotels`,{ headers: getAuthHeader() });

export const bookHotel = async (bookingData) => 
  axios.post(`${API_URL}/bookings`, bookingData, { headers: getAuthHeader() });

export const checkIn = async (checkInData) => 
  axios.post(`${API_URL}/checkin`, checkInData, { headers: getAuthHeader() });
