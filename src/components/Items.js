import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

  return (
    <div className="items grid grid-cols-2 gap-4 p-4">
      {items.map((item) => (
        <div
          key={item.idMeal}
          className="item-card border rounded-lg p-4 shadow-lg hover:shadow-xl relative"
          onClick={() => navigate(`/details/${item.idMeal}`)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(item);
            }}
            className={`absolute bottom-2 right-2 text-3xl ${
              wishlist.some(({ idMeal }) => idMeal === item.idMeal)
                ? "text-red-500"
                : "text-black"
            }`}
          >
            ♥
          </button>
          <img
            src={item.strMealThumb}
            alt={item.strMeal}
            className="w-full h-40 object-cover rounded-md"
          />
          <h3 className="text-lg font-bold mt-2">{item.strMeal}</h3>
          <h4 className="text-lg font-bold mt-2">
            Price: ${Math.floor(Math.random() * 20) + 5}
          </h4>
        </div>
      ))}
    </div>
  );
};

export default Items;
