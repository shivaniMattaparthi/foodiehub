import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

    localStorage.setItem("currentOrder", JSON.stringify(order));
    navigate("/ordersummary");
  };

  if (!item) return <div className="flex items-center justify-center h-screen bg-gray-100">
  <div className="relative w-16 h-16">
    <div className="absolute top-0 left-0 w-full h-full border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
    <div className="absolute top-1 left-1 w-[90%] h-[90%] border-4 border-t-transparent border-gray-300 rounded-full"></div>
  </div>
</div>

  return (
    <div className="mx-auto h-[100vh] flex flex-col items-center p-10 bg-gradient-to-b from-gray-100 via-blue-100 to-purple-100 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">{item.strMeal}</h1>
      <div className="flex flex-col md:flex-row items-center justify-center md:space-x-6">
        <img
          src={item.strMealThumb}
          alt={item.strMeal}
          className="w-80 h-60 object-cover rounded-md shadow-md mb-6 md:mb-0"
        />
        <p className="text-gray-600 leading-relaxed md:w-1/2 text-center md:text-left">{item.strInstructions}</p>
      </div>
      <div className="mt-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Price: ${Math.floor(Math.random() * 20) + 5}</h2>
        <button
          onClick={handlePlaceOrder}
          className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default ItemDetails;
