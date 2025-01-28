import React from "react";
import { useNavigate } from "react-router-dom";
import HeroImg from "../assets/hero.png";

const Home = () => {
  const navigate = useNavigate();

  const handleFoodMenuClick = () => {
    navigate("/category");
  };
  return (
    <div className="bg-gradient-to-b from-gray-100 via-blue-100 to-purple-100 min-h-screen">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[600px]">
        {/* Text Section */}
        <div className="flex flex-col justify-center gap-8 text-center md:text-left pt-24 md:p-0 pb-10">
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
          <div className="flex gap-4 items-center md:justify-start justify-center">
            {/* Food Menu Button */}
            <button
              onClick={handleFoodMenuClick}
              className="primary-btn hover:scale-105 duration-200"
            >
              Food Menu
            </button>
            <button
             className="secondary-btn text-black hover:scale-105 duration-200">
              Book Table 
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex flex-col justify-center">
          <img
            src={HeroImg}
            alt="Hero"
            className="animate-spin-slow img-shadow w-[400px] mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
