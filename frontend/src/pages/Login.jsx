import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(loginData);
      // console.log("Login API Response:", response);
      login(response.user, response.token);
      navigate("/hotels");
    } catch (error) {
      console.error("Login failed", error);
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <form onSubmit={handleLogin} className="flex flex-col gap-4 w-92 p-8 shadow-lg rouded-lg bg-white">
          <h1 className="text-2xl text-center font-bold text-gray-600 mb-4">
            Login
          </h1>
          <div className="flex justify-center items-center gap-4">
            <label className="text-gray-500 w-40 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={handleChange}
              className="p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex justify-center items-center gap-4">
            <label className="text-gray-500 w-40 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              autoComplete="off"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={handleChange}
              className="p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 p-2 text-white cursor-pointer rounded"
          >
            Login
          </button>
          <div className="mt-6 text-center">
          
        </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
