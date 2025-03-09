import { useAuth } from "../context/AuthContext";
import { FiUser, FiMail, FiLogOut, FiUserCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
        <div className="w-24 h-24 mx-auto flex items-center justify-center bg-green-500 text-white text-3xl font-bold rounded-full">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <h2 className="text-2xl font-semibold mt-4 flex items-center justify-center gap-2">
          <FiUserCheck className="-ml-10" /> {user?.name}
        </h2>
        <p className="text-gray-500 flex items-center justify-center gap-2 mt-2">
          <FiMail className="text-lg" /> {user?.email}
        </p>
        <div className="flex gap-2">
        <button
          onClick={() => {
            navigate("/hotels");
          }}
          className="flex items-center justify-center gap-2 mt-6 bg-green-500 text-white px-4 py-2 rounded-lg w-full hover:bg-green-600 transition cursor-pointer"
        >
          <GoArrowLeft /> Back
        </button>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="flex items-center justify-center gap-2 mt-6 bg-red-500 text-white px-4 py-2 rounded-lg w-full hover:bg-red-600 transition cursor-pointer"
        >
          <FiLogOut /> Logout
        </button>
        </div>
      </div>
    </div>
  );
}
