import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUserDetails } from "../utils/detailsSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access user details and login status from Redux store
  const { userDetails, islogin } = useSelector((state) => state.details);

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const urls = [
        "https://charityloop.up.railway.app/donor",
        "https://charityloop.up.railway.app/logisticsController",
        "https://charityloop.up.railway.app/recipient",
        "https://charityloop.up.railway.app/admin",
      ];

      const responses = await Promise.all(urls.map((url) => axios.get(url)));
      const allUsers = responses.flatMap((response) => response.data);

      const matchedUser = allUsers.find(
        (user) =>
          user.email === formData.email && user.password === formData.password
      );

      if (matchedUser) {
        setMessage("");
        dispatch(addUserDetails(matchedUser)); // Save user details and login status in Redux store
        navigate("/home");
        switch (matchedUser.role) {
            case "donor":
              navigate("/donor")
              break;
            case "logisticsController":
              navigate("/logisticController")
              break;
            case "recipient":
              navigate("/recipient")
              break;
            case "admin":
              navigate("/admin")
              break;
            default:
              setMessage("Invalid role selected. Please try again.");
              return;
          } // Redirect to home page
      } else {
        setMessage("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while logging in. Please try again later.");
    }
  };

  const handleLogout = () => {
    dispatch(addUserDetails(null)); // Clear user details and login status from Redux store
    setFormData({ email: "", password: "" }); // Reset the login form
    setMessage(""); // Clear any messages
  };

  

  return islogin && userDetails !== null ?(
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        Welcome, {userDetails.name}!
      </h2>
      <div className="mb-4">
        <p className="text-gray-700">Email: {userDetails.email}</p>
        <p className="text-gray-700">Phone: {userDetails.phone}</p>
        <p className="text-gray-700">Role: {userDetails.role}</p>
      </div>
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
      >
        Logout
      </button>
    </div>
  </div>
  ):(
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {message && <p className="text-center text-red-500 mb-4">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-gray-700 text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
