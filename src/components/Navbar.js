import React, { useRef, useState, useEffect } from "react";
import Profile from "../assets/profile.png";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const [userCurrentLocation, setuserCurrentLocation] = useState("FOODIEHUB");
  const [showLocation, setShowLocation] = useState(true);
  const popupRef = useRef();
  useEffect(() => {
    let handleClickOutside = (e) => {
      if (popupRef && !popupRef?.current?.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude:", latitude, "Longitude:", longitude);
          try {
            const response = await fetch(
              `  https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            if (data.address && data.address.city) {
              setuserCurrentLocation(data.address.city);
            }
          } catch (error) {
            console.error("Error fetching location:", error);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }

    // Toggle between FOODIEHUB and city name every 3 seconds
    const interval = setInterval(() => {
      setShowLocation((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="bg-gradient-to-b from-gray-100 via-blue-50 to-purple-50 sticky top-0 z-50">
      <div className="container flex justify-between items-center py-4 px-6">
        {/* Logo Section */}
        <div>
          <p className="text-3xl font-semibold text-primary">
            {showLocation ? userCurrentLocation : "FOODIEHUB"}
          </p>
        </div>

        {/* Menu Section */}
        <div className="flex items-center gap-10">
          <ul className="hidden sm:flex gap-8 text-gray-700">
            <li>
              <Link
                to="/"
                className={`${
                  location.pathname === "/"
                    ? "text-primary border-b-2 border-primary"
                    : "hover:text-primary hover:border-b-2 border-primary"
                } uppercase cursor-pointer`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/category"
                className={`${
                  location.pathname === "/category"
                    ? "text-primary border-b-2 border-primary"
                    : "hover:text-primary hover:border-b-2 border-primary"
                } uppercase cursor-pointer`}
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`${
                  location.pathname === "/about"
                    ? "text-primary border-b-2 border-primary"
                    : "hover:text-primary hover:border-b-2 border-primary"
                } uppercase cursor-pointer`}
              >
                About
              </Link>
            </li>
          </ul>

          {/* Profile and Dropdown Section */}
          <div className="relative " ref={popupRef}>
            <div
              className="flex gap-2 items-center cursor-pointer"
              onClick={toggleDropdown}
            >
              <img
                src={Profile}
                alt="Profile"
                className="w-10 h-10 rounded-full border border-gray-300"
              />
              <IoIosArrowDown className="text-xl text-gray-600" />
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-40">
                <ul className="text-left text-gray-700">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <Link to="/orders">My Orders</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <Link to="/wishlist">Favourites</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <Link to="/savedaddresses">My Addresses</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
