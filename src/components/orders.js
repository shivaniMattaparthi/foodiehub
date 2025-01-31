import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa"; // Import trash icon

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  const removeOrdersFromLocalStorage = () => {
    localStorage.removeItem("orders");
    setOrders([]);
  };

  const handleDeleteOrder = (index) => {
    const updatedOrders = orders.filter((_, i) => i !== index);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  if (orders.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl text-gray-500 font-semibold p-4">
        No orders have been placed yet.
      </div>
    );
  }

  return (
    <div className="orders min-h-screen p-4">
      <button
        onClick={removeOrdersFromLocalStorage}
        className="bg-orange-500 text-white px-3 py-3 rounded-md"
      >
        Remove all orders
      </button>
      <h1 className="text-5xl font-bold mb-6 text-center">
        <span className="text-black">My</span>{" "}
        <span className="text-orange-500">Orders</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders
          .slice()
          .reverse()
          .map((order, index) => (
            <div
              key={index}
              className="relative order-item p-4 border rounded-lg shadow-md flex flex-col items-center"
            >
              <img
                src={order.image}
                alt={order.title}
                className="w-20 h-20 object-cover rounded-md mb-2"
              />
              <h2 className="text-lg font-semibold">{order.title}</h2>
              <p>Price: ${order.price}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Total Price: ${order.totalPrice}</p>

              <button
                onClick={() => handleDeleteOrder(index)}
                className="absolute bottom-1 right-2 text-red-600 hover:text-red-800"
              >
                <FaTrash size={18} />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Orders;
