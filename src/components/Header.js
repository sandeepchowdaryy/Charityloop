import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { BiDonateBlood } from "react-icons/bi";

const Header = () => {
  const navigate = useNavigate();

  // Get role from Redux store
  const role = useSelector((store) => store.details?.userDetails?.role || "");

  // Handle click for Home link
  const handleHomeClick = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    switch (role) {
      case "donor":
        navigate("/donor");
        break;
      case "logisticsController":
        navigate("/logisticController");
        break;
      case "recipient":
        navigate("/recipient");
        break;
      case "admin":
        navigate("/admin");
        break;
      default:
        navigate("/home");
        break;
    }
  };

  return (
    <div className="flex justify-between items-center pl-10 pr-5 py-5">
      {/* Logo Section */}
      <div className="flex justify-center items-center">
        <img
          src="https://cfstatic.give.do/logo.png"
          alt="Website Logo"
          className="w-20 h-22 bg-white"
        />
      </div>

      {/* Navigation Links */}
      <ul className="flex justify-center items-center gap-14 font-bold">
        <li>
          {/* Custom Home Link with click handler */}
          <button
            onClick={handleHomeClick}
            className="hover:text-blue-600 focus:outline-none"
          >
            Home
          </button>
        </li>
        <li>
          <Link to="/donationDrives" className="hover:text-blue-600">
            Donation Drives
          </Link>
        </li>
        <li>
          <Link to="/About" className="hover:text-blue-600">
            About Us
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-blue-600">
            Contact Us
          </Link>
        </li>
      </ul>
      <div className="flex gap-4">
      <Link to="/donate">
        <button className="bg-red-500 rounded-lg font-semibold shadow-2xl px-3 h-12 text-white text-sm flex justify-center items-center gap-2 hover:bg-red-600">
          <BiDonateBlood size={25} />
          Donate now
        </button>
      </Link>
      {/* Account Button */}
      <Link to="/login">
        <button className="bg-slate-200 rounded-lg font-semibold shadow-2xl px-3 h-12 text-black text-sm flex justify-center items-center gap-2 hover:bg-slate-300">
          <CgProfile size={25} />
          My account
        </button>
      </Link>
      </div>
    </div>
  );
};

export default Header;
