import { useState } from "react";
import { checkIn } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { FiUserCheck } from "react-icons/fi"; // React icon for Check-in

export default function CheckIn() {
  const [aadhaar, setAadhaar] = useState("");
  const { user } = useAuth();

  const handleCheckIn = async () => {
    if (!user) return alert("Please log in to check-in.");

    if (!/^\d{12}$/.test(aadhaar)) {
      return alert("Please enter a valid 12-digit Aadhaar number.");
    }

    try {
      await checkIn({ userId: user.id, aadhaar });
      alert("Check-in successful!");
      setAadhaar("");
    } catch (error) {
      console.error("Check-in failed:", error);
      alert("Check-in failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 bg-gray-100 p-6 rounded-lg shadow-md w-[350px] mx-auto">
      <h2 className="text-2xl font-semibold flex items-center gap-2">
        <FiUserCheck className="text-blue-500" /> Web Check-In
      </h2>
      <input
        type="text"
        placeholder="Enter Aadhaar Number"
        value={aadhaar}
        maxLength={12}
        className="border p-3 w-full mt-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setAadhaar(e.target.value)}
      />
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded mt-4 cursor-pointer transition duration-300 w-full"
        onClick={handleCheckIn}
      >
        Check-In
      </button>
    </div>
  );
}
