import React, { useState } from "react";
import Profile from "../assets/profile.png";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="bg-gradient-to-b from-gray-100 via-blue-50 to-purple-50  sticky top-0 z-50">
      <div className="container flex justify-between items-center py-4 px-6">
        {/* Logo Section */}
        <div>
          <p className="text-3xl font-semibold">
            FOODIE<span className="text-primary">HUB</span>
          </p>
        </div>

        {/* Menu Section */}
        <div className="flex items-center gap-10">
          <ul className="hidden sm:flex gap-8 text-gray-700">
            <li className="hover:text-primary hover:border-b-2 border-primary uppercase cursor-pointer">
              Home
            </li>
            <li className="hover:text-primary hover:border-b-2 border-primary uppercase cursor-pointer">
              Menu
            </li>
            <li className="hover:text-primary hover:border-b-2 border-primary uppercase cursor-pointer">
              About
            </li>
          </ul>

          {/* Profile and Dropdown Section */}
          <div className="relative">
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
                    My Orders
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Favourites
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
