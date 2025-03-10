import { useState } from "react";
import { checkIn } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CheckIn() {
  const { user } = useAuth();
  const [aadhaarList, setAadhaarList] = useState([""]);
  const navigate = useNavigate();

  const handleAadhaarChange = (index, value) => {
    const newAadhaarList = [...aadhaarList];
    newAadhaarList[index] = value;
    setAadhaarList(newAadhaarList);
  };

  const addAadhaarField = () => {
    setAadhaarList([...aadhaarList, ""]);
  };

  const removeAadhaarField = (index) => {
    if (aadhaarList.length > 1) {
      setAadhaarList(aadhaarList.filter((_, i) => i !== index));
    }
  };

  const handleCheckIn = async () => {
    if (!user) {
      toast.warning("Please log in to check-in.");
      return;
    }

    if (aadhaarList.some((aadhaar) => !/^\d{12}$/.test(aadhaar))) {
      return "Each Aadhaar number must be a valid 12-digit number.";
    }

    try {
      // await checkIn({ userId: user.id, aadhaarNumbers: aadhaarList });
      toast.success("Check-in successful!");
      setAadhaarList([""]);
      navigate("/hotels");
    } catch (error) {
      console.error("Check-in failed:", error);
      toast.error("Check-in failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 bg-gray-100 p-6 rounded-lg shadow-md w-[350px] mx-auto">
      <h2 className="text-2xl font-semibold">Web Check-In</h2>
      {aadhaarList.map((aadhaar, index) => (
        <div key={index} className="w-full flex items-center gap-2 mt-4">
          <input
            type="text"
            placeholder={`Aadhaar Number ${index + 1}`}
            value={aadhaar}
            maxLength={12}
            className="border p-3 w-full rounded"
            onChange={(e) => handleAadhaarChange(index, e.target.value)}
          />
          {index > 0 && (
            <button
              className="text-red-500 cursor-pointer"
              onClick={() => removeAadhaarField(index)}
            >
              ✖
            </button>
          )}
        </div>
      ))}
      <button
        className="text-blue-500 mt-2 cursor-pointer"
        onClick={addAadhaarField}
      >
        + Add Another Aadhaar
      </button>
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded mt-4 w-full cursor-pointer"
        onClick={handleCheckIn}
      >
        Check-In
      </button>
    </div>
  );
}
