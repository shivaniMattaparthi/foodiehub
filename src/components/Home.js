import React from "react";
import { useNavigate } from "react-router-dom";
import HeroImg from "../assets/hero.png";
import TimeZoneGreeting from "./Timezonegreeting";

const Home = () => {
  const navigate = useNavigate();

  const handleFoodMenuClick = () => {
    navigate("/category");
  };
  return (
    <div className="h-100 flex flex-col justify-center bg-gradient-to-b from-gray-100 via-blue-100 to-purple-100">
      <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Text Section */}
        <div className="flex flex-col justify-center gap-8 text-center md:text-left pt-24">
          <TimeZoneGreeting />
          <h1 className="text-4xl lg:text-6xl font-semibold">
            Delicious Food Is Waiting For You
          </h1>
          <p>
            At FOODIEHUB, we believe that great food starts with fresh
            ingredients and a passion for taste. Explore a wide variety of
            mouthwatering recipes and delicious meals crafted to delight your
            taste buds. Treat yourself to a feast of flavors, and let every meal
            be a moment to cherish!
          </p>
          <div className="flex gap-4 items-center md:justify-start justify-center pb-6">
            {/* Food Menu Button */}
            <button
              onClick={handleFoodMenuClick}
              className="primary-btn hover:scale-105 duration-200"
            >
              Food Menu
            </button>
            <button className="secondary-btn text-black hover:scale-105 duration-200">
              Book Table
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex flex-col justify-center  items-center h-full relative sm:pb-8">
          <img
            src={HeroImg}
            alt="Hero"
            className="animate-spin-slow img-shadow  mx-auto  lg:h-80 lg:w-80 "
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
