import React, { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch all orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  if (orders.length === 0) {
    return <div>No orders have been placed yet.</div>;
  }

  return (
    <div className="orders p-4">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order, index) => (
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
