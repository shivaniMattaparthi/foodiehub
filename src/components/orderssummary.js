import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OrderSummary = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const storedOrder = JSON.parse(localStorage.getItem("currentOrder"));
    if (storedOrder) {
      setOrder(storedOrder);
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!order) {
    return <div>Loading order details...</div>;
  }

  const handleContinue = () => {
    const newOrder = {
      ...order,
      quantity,
      totalPrice: order.price * quantity,
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = [...existingOrders, newOrder];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    toast.success("Order placed successfully!");
    navigate("/");
  };

  const totalPrice = order.price * quantity;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-blue-100 to-purple-100 flex items-center justify-center">
      <div className="order-summary max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-2xl">
        {/* Header */}
        <h1 className="text-3xl font-semibold mb-6 text-center">
          <span className="text-orange-500">Order</span>{" "}
          <span className="text-black">Summary</span>
        </h1>

        {/* Order Item Details */}
        <div className="flex items-center gap-6 mb-6">
          <img
            src={order.image}
            alt={order.title}
            className="w-28 h-28 object-cover rounded-xl border border-gray-200 shadow-md"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {order.title}
            </h2>
            <p className="text-gray-600 text-lg mt-2">
              Price:{" "}
              <span className="font-medium text-indigo-700">
                ${order.price}
              </span>
            </p>
            <div className="flex items-center gap-4 mt-4">
              <label htmlFor="quantity" className="text-gray-700 font-medium">
                Quantity:
              </label>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-16 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
              />
            </div>
          </div>
        </div>

        {/* Total Price */}
        <div className="mt-6 bg-indigo-50 p-4 rounded-lg text-center shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">
            Total Price:{" "}
            <span className="text-indigo-800 font-bold text-xl">
              ${totalPrice}
            </span>
          </h3>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="block w-full mt-8 bg-orange-500 text-white text-lg font-bold py-3 rounded-lg shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
