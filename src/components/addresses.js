import React, { useState, useEffect } from "react";

const AddressManager = () => {
  const [addresses, setAddresses] = useState([]);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    city: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedAddresses = localStorage.getItem("addresses");
    const storedCurrentAddress = localStorage.getItem("currentAddress");

    if (storedAddresses) {
      try {
        const parsedAddresses = JSON.parse(storedAddresses);
        if (Array.isArray(parsedAddresses)) {
          setAddresses(parsedAddresses);
        }
      } catch (error) {
        console.error("Error parsing addresses:", error);
      }
    }

    if (storedCurrentAddress) {
      try {
        setCurrentAddress(JSON.parse(storedCurrentAddress));
      } catch (error) {
        console.error("Error parsing currentAddress:", error);
      }
    }
  }, []);

  // Save addresses and current address to localStorage
  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
    localStorage.setItem("currentAddress", JSON.stringify(currentAddress));
  }, [addresses, currentAddress]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrEdit = () => {
    if (editIndex !== null) {
      const updatedAddresses = [...addresses];
      updatedAddresses[editIndex] = formData;
      setAddresses(updatedAddresses);
      setEditIndex(null);
    } else {
      setAddresses([...addresses, formData]);
    }

    setFormData({ username: "", phone: "", city: "" });
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setFormData(addresses[index]);
    setEditIndex(index);
    console.log(editIndex,"edi")
    setShowForm(true);
  };

  const handleRemove = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
    if (currentAddress && currentAddress === addresses[index]) {
      setCurrentAddress(null);
    }
  };

  const handleSelectAddress = (index) => {
    setCurrentAddress(addresses[index]);
  };

  return (
    <div className="bg-gradient-to-b from-gray-100 via-blue-100 to-purple-100 min-h-screen pt-8">
      <div className="max-w-lg mx-auto  p-5 bg-white shadow-md rounded-lg">
      {/* Add New Address Button */}
      <button
        onClick={() => setShowForm(true)}
        className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
      >
        + Add New Address
      </button>

      {/* Form to Add/Edit Address */}
      {showForm && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-100">
          <input
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
            className="w-full p-2 mb-2 border rounded-md"
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="w-full p-2 mb-2 border rounded-md"
          />
          <input
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="City/Location"
            className="w-full p-2 mb-2 border rounded-md"
          />
          <div className="flex justify-between">
            <button
              onClick={handleAddOrEdit}
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
            >
              {editIndex !== null ? "Save Changes" : "Add Address"}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Address List */}
      <ul className="mt-4">
        {addresses.map((address, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-3 bg-gray-100 rounded-md mb-2 shadow-sm"
          >
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="selectedAddress"
                checked={
                  currentAddress && currentAddress.phone === address.phone
                }
                onChange={() => handleSelectAddress(index)}
              />
              <span className="font-medium">
                {address.username}, {address.phone}, {address.city}
              </span>
            </label>
            <div className="flex space-x-3">
              <button
                className="text-orange-500 cursor-pointer hover:text-orange-600"
                onClick={() => handleEdit(index)}
              >
                Edit
              </button>
              <button
                className="text-red-500 cursor-pointer hover:text-red-600"
                onClick={() => handleRemove(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default AddressManager;
