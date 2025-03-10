import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRegisterData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(registerData);
      toast.success("Registration successful. Please log in.");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div>
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleRegister}
        autoComplete="off"
        className="flex bg-white flex-col w-92 p-8  shadow-lg rounded-lg gap-4"
      >
        <h1 className="text-gray-600 text-2xl text-center font-bold mb-4">Register</h1>
        <div className="flex justify-between items-center gap-2 ">
          <label className="text-gray-500 w-40 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={registerData.name}
            onChange={handleChange}
            className="border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex justify-between items-center gap-2 ">
          <label className="text-gray-500 w-40 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            autoComplete="off"
            placeholder="Enter your email"
            value={registerData.email}
            onChange={handleChange}
            className="border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex justify-between items-center gap-2 ">
          <label className="text-gray-500 w-40 font-semibold">Password</label>
          <input
            type="password"
            name="password"
            autoComplete="off"
            placeholder="Enter your password"
            value={registerData.password}
            onChange={handleChange}
            className="border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex justify-between items-center gap-2 ">
          <label className="text-gray-500 w-40 font-semibold">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm your password"
            value={registerData.confirm_password}
            onChange={handleChange}
            className="border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 hove:bg-green-600 p-2 cursor-pointer rounded text-white"
        >
          Register
        </button>
        <div className="mt-6 text-center">
      </div>
      </form>
    </div>
  </div>
  );
}
