import React, { useState } from "react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  return (
    <div className="wishlist p-6 min-h-screen">
      <h2 className="text-5xl font-bold mb-6 text-center">
        <span className="wishlistText">My</span>{" "}
        <span className="text-orange-500">Wishlist</span>
      </h2>

      {!wishlist.length ? (
        <div className="text-center text-gray-600">
          No items in your wishlist.{" "}
          <Link to="/" className="text-orange-500 underline">
            Go to categories
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.idMeal}
              className="bg-white border border-gray-200 rounded-lg shadow-lg p-5 transform hover:scale-105 hover:shadow-2xl transition duration-300"
            >
              <img
                src={item.strMealThumb}
                alt={item.strMeal}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.strMeal}
                </h3>
                <h4 className="text-md font-medium text-orange-600">
                  Price: ${Math.floor(Math.random() * 20) + 5}
                </h4>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
