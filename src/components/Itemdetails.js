import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();
        setItem(data.meals?.[0] || null);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    })();
  }, [id]);

  const handlePlaceOrder = () => {
    const order = {
      id: item.idMeal,
      title: item.strMeal,
      price: Math.floor(Math.random() * 20) + 5,
      image: item.strMealThumb,
    };

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...orders, order]));
    toast.success("Order placed successfully!");
    navigate("/");
  };

  if (!item) return <div>Loading details...</div>;

  return (
    <div className="item-details p-4">
      <h1 className="text-2xl font-bold mb-4">{item.strMeal}</h1>
      <img
        src={item.strMealThumb}
        alt={item.strMeal}
        className="w-full h-60 object-cover rounded-md"
      />
      <h2 className="text-xl font-semibold">
        Price: ${Math.floor(Math.random() * 20) + 5}
      </h2>
      <p className="text-md mt-2">{item.strInstructions}</p>
      <button
        onClick={handlePlaceOrder}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-600"
      >
        Place Order
      </button>
    </div>
  );
};

export default ItemDetails;
