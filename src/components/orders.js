import React, { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch all orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  if (orders.length === 0) {
    return (<div className="flex items-center justify-center h-screen text-2xl text-gray-500 font-semibold">
      No orders have been placed yet.
    </div>);
  }
  const removeOrdersFromLocalStorage = () => {
    localStorage.removeItem("orders")
    setOrders([])
  }

  return (
    <div className="orders p-4">
      <button onClick={removeOrdersFromLocalStorage}>Remove orders</button>
      <h1 className="text-5xl font-bold mb-6 text-center">
        <span className="text-black">My</span>{" "}
        <span className="text-orange-500">Orders</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders
          .slice().reverse().map((order, index) => (
          <div
            key={index}
            className="order-item p-4 border rounded-lg shadow-md flex flex-col items-center"
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
