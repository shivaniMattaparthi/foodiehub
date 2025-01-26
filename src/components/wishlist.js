import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  return (
    <div className="wishlist p-4">
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
      {!wishlist.length ? (
        <div>
          No items in your wishlist. <Link to="/">Go to categories</Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {wishlist.map((item) => (
            <div
              key={item.idMeal}
              className="wishlist-item flex items-center border rounded-lg p-4 shadow-lg"
            >
              <img
                src={item.strMealThumb}
                alt={item.strMeal}
                className="w-20 h-20 object-cover rounded-md mr-4"
              />
              <div>
                <h3 className="text-lg font-bold">{item.strMeal}</h3>
                <h4 className="text-md font-semibold mt-1">
                  Price: ${Math.floor(Math.random() * 20) + 5}p
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
