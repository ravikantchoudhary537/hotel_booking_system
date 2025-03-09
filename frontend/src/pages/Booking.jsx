import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getHotels, bookHotel } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Booking() {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getHotels().then((res) => setHotels(res.data));
  }, []);

  const handleBooking = async () => {
    if (!selectedHotel) {
      alert("Please select a hotel.");
      return;
    }

    try {
      await bookHotel({ hotelId: selectedHotel.id });
      alert(`Hotel "${selectedHotel.name}" booked successfully!`);
      navigate("/checkin");
    } catch (error) {
      console.error("Booking failed", error);
    }
  };

  return (
    <div className="p-5 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Book a Hotel</h2>
      <select
        className="border p-2 w-full"
        onChange={(e) => {
          const hotel = hotels.find((h) => h.id === parseInt(e.target.value));
          setSelectedHotel(hotel);
        }}
      >
        <option value="">Select a hotel</option>
        {hotels.map((hotel) => (
          <option key={hotel.id} value={hotel.id}>
            {hotel.name} - ₹{hotel.price_per_night} per night
          </option>
        ))}
      </select>

      <button
        onClick={handleBooking}
        className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full"
      >
        Confirm Booking
      </button>
    </div>
  );
}
