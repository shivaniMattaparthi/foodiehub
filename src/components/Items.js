import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Typewriter } from "react-simple-typewriter";

const Items = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${type}`
        );
        const data = await response.json();
        setItems(data.meals || []);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    })();
  }, [type]);

  const toggleWishlist = (item) => {
    const updatedWishlist = wishlist.some(
      ({ idMeal }) => idMeal === item.idMeal
    )
      ? wishlist.filter(({ idMeal }) => idMeal !== item.idMeal)
      : [...wishlist, item];

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  if (!items.length) return <div>Loading items...</div>;

  const topPicks = items.slice(0, 3); // First 3 items
  const remainingItems = items.slice(3); // Remaining items

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };

  return (
    <div className="p-6">
      {/* Top Picks Section */}
      <h2 className="text-2xl text-red-700 font-extrabold mb-4">
        <Typewriter words={["Top Picks"]} loop={1} typeSpeed={150} />
      </h2>
      <Slider {...settings} className="mb-8">
        {topPicks.map((item) => (
          <div key={item.idMeal} className="px-2">
            <div
              className="item-card border rounded-lg p-8 shadow-lg bg-white relative overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              onClick={() => navigate(`/details/${item.idMeal}`)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(item);
                }}
                className={`absolute bottom-4 right-4 text-3xl transition-colors duration-300 ${
                  wishlist.some(({ idMeal }) => idMeal === item.idMeal)
                    ? "text-red-500"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                ♥
              </button>
              <img
                src={item.strMealThumb}
                alt={item.strMeal}
                className="w-full h-60 object-cover rounded-md shadow-sm"
              />
              <div className="text-center mt-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {item.strMeal}
                </h3>
                <h4 className="text-vegetarianlg font-medium text-gray-600 mt-1">
                  Price: ${Math.floor(Math.random() * 20) + 5}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Continue Your Search Section */}
      <h2 className="text-2xl text-blue-800 font-bold mb-4">
        Continue Your Search
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {remainingItems.map((item) => (
          <div
            key={item.idMeal}
            className="item-card border rounded-lg p-4 shadow-lg bg-white relative overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onClick={() => navigate(`/details/${item.idMeal}`)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(item);
              }}
              className={`absolute bottom-4 right-4 text-3xl transition-colors duration-300 ${
                wishlist.some(({ idMeal }) => idMeal === item.idMeal)
                  ? "text-red-500"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              ♥
            </button>
            <img
              src={item.strMealThumb}
              alt={item.strMeal}
              className="w-full h-40 object-cover rounded-md shadow-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <div className="text-center mt-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {item.strMeal}
              </h3>
              <h4 className="text-lg font-medium text-gray-600 mt-1">
                Price: ${Math.floor(Math.random() * 20) + 5}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
