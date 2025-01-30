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
  const [searchQuery, setSearchQuery] = useState(""); // Added search query state
  const [filteredItems, setFilteredItems] = useState([]); // Added state to store filtered items

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

  useEffect(() => {
    const filtered = items.filter((item) =>
      item.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log(filtered,"filtered")
    setFilteredItems(filtered);
  }, [items, searchQuery]);

  const toggleWishlist = (item) => {
    const updatedWishlist = wishlist.some(
      ({ idMeal }) => idMeal === item.idMeal
    )
      ? wishlist.filter(({ idMeal }) => idMeal !== item.idMeal)
      : [...wishlist, item];

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  if (!items.length)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
          <div className="absolute top-1 left-1 w-[90%] h-[90%] border-4 border-t-transparent border-gray-300 rounded-full"></div>
        </div>
      </div>
    );

  const topPicks = items.slice(0, 3); // First 3 items
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 200,
    arrows: true,
    responsive: [
      {
        breakpoint: 640, // For devices below sm (up to 640px)
        settings: {
          slidesToShow: 1, // Show 2 slides
        },
      },
      {
        breakpoint: 768, // For devices up to md (up to 768px)
        settings: {
          slidesToShow: 2, // Show 2 slides
        },
      }
    ],
  };

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-red-700 font-extrabold">
          <Typewriter words={["Top Picks"]} loop={1} typeSpeed={150} />
        </h2>
        <input
          type="text"
          placeholder="Search for meals..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          className="w-1/3 p-3 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {searchQuery === "" && (
        <div>
          <Slider {...settings} className="mb-8">
            {topPicks.map((item) => (
              <div key={item.idMeal} className="px-4">
                <div
                  className="item-card border rounded-lg p-6 shadow-lg bg-gray-100 relative overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
                  onClick={() => navigate(`/details/${item.idMeal}`)}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(item);
                    }}
                    className={`absolute top-4 right-4 text-3xl transition-colors duration-300 ${
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
                    className="w-80 h-64 object-cover rounded-md shadow-md mx-auto"
                  />
                  <div className="text-center mt-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.strMeal}
                    </h3>
                    <h4 className="text-lg font-medium text-gray-600 mt-2">
                      Price: ${Math.floor(Math.random() * 20) + 5}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}

      <h2 className="text-3xl text-orange-400 font-bold mb-4 underline">
        Continue Your Search
      </h2>
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.idMeal}
              className="item-card border rounded-lg p-4 shadow-lg bg-white relative overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
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
      ) : (
        searchQuery && (
          <div className="text-center text-xl text-gray-600">
            No results found for "{searchQuery}"
          </div>
        )
      )}
    </div>
  );
};

export default Items;
