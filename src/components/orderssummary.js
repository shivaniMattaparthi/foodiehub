import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OrderSummary = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Try to load the order from localStorage
    const storedOrder = JSON.parse(localStorage.getItem("currentOrder"));
    if (storedOrder) {
      setOrder(storedOrder);
    } else {
      // If no order is found, navigate back to the homepage
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

    // Retrieve existing orders from localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    // Add the new order to the list
    const updatedOrders = [...existingOrders, newOrder];

    // Save the updated orders back to localStorage
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    toast.success("Order placed successfully!");
    navigate("/"); // Navigate back to the homepage
  };

  const totalPrice = order.price * quantity;

  return (
    <div className="order-summary p-4">
      <h1 className="text-2xl font-bold mb-4">Order Summary</h1>

      {/* Order Item Details */}
      <div className="flex items-center mb-4">
        <img
          src={order.image}
          alt={order.title}
          className="w-20 h-20 object-cover rounded-md mr-4"
        />
        <div>
          <h2 className="text-lg font-semibold">{order.title}</h2>
          <p className="text-gray-600">Price: ${order.price}</p>
          <div className="flex items-center mt-2">
            <label htmlFor="quantity" className="mr-2">
              Quantity:
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-16 p-1 border rounded"
            />
          </div>
        </div>
      </div>

      {/* Total Price */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Total Price: ${totalPrice}</h3>
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        className="bg-green-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-green-600"
      >
        Continue
      </button>
    </div>
  );
};

export default OrderSummary;
