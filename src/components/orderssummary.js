import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OrderSummary = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentAddress, setCurrentAddress] = useState(null);

  useEffect(() => {
    // Fetch order from localStorage
    const storedOrder = JSON.parse(localStorage.getItem("currentOrder"));
    if (storedOrder) {
      setOrder(storedOrder);
    } else {
      navigate("/");
    }

    // Fetch current address from localStorage
    const storedAddress = JSON.parse(localStorage.getItem("currentAddress"));
    if (storedAddress) {
      setCurrentAddress(storedAddress);
    }
  }, [navigate]);

  if (!order) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
          <div className="absolute top-1 left-1 w-[90%] h-[90%] border-4 border-t-transparent border-gray-300 rounded-full"></div>
        </div>
      </div>
    );
  }

  const handleContinue = () => {
    if (!currentAddress) {
      toast.error("Please select an address before continuing!");
      return;
    }

    const newOrder = {
      ...order,
      quantity,
      totalPrice: order.price * quantity,
      address: currentAddress,
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = [...existingOrders, newOrder];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    toast.success(
      `"Thank you, ${currentAddress.username}! Your order from ${currentAddress.city} has been received. Deliciousness coming soon!"`
    );
    navigate("/");
  };

  const totalPrice = order.price * quantity;

  return (
    <div className="min-h-screen orderssummary flex items-center justify-center">
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

        {/* Current Address */}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800">
            Delivery Address:
          </h3>
          {currentAddress ? (
            <p className="text-gray-700 mt-2">
              <strong>{currentAddress.username}</strong>, {currentAddress.phone}
              , {currentAddress.city}
            </p>
          ) : (
            <p className="text-red-500 mt-2">No address selected</p>
          )}
          <button
            onClick={() => navigate("/savedaddresses")}
            className="mt-3 text-blue-600 hover:underline"
          >
            Change Address
          </button>
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
