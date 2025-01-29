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
    if (addresses.length > 0) {
      localStorage.setItem("addresses", JSON.stringify(addresses));
    }
    if (currentAddress) {
      localStorage.setItem("currentAddress", JSON.stringify(currentAddress));
    }
  }, [addresses, currentAddress]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrEdit = () => {
    if (editIndex !== null) {
      // Editing an address
      const updatedAddresses = [...addresses];
      updatedAddresses[editIndex] = formData;
      setAddresses(updatedAddresses);
      setEditIndex(null);
    } else {
      // Adding a new address
      setAddresses([...addresses, formData]);
    }

    setFormData({ username: "", phone: "", city: "" });
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setFormData(addresses[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleRemove = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);

    // Clear the current address if it was removed
    if (currentAddress && currentAddress === addresses[index]) {
      setCurrentAddress(null);
    }
  };

  const handleSelectAddress = (index) => {
    setCurrentAddress(addresses[index]);
  };

  return (
    <div className="bg-gradient-to-b from-gray-100 via-blue-100 to-purple-100 min-h-screen pt-8">
      <div className="max-w-lg mx-auto bg-white p-6  rounded-lg shadow-lg">
      {/* Add New Address Button */}
      <button
        className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-400 focus:outline-none"
        onClick={() => setShowForm(true)}
      >
        + Add New Address
      </button>

      {/* Form to Add/Edit Address */}
      {showForm && (
        <div className="mt-4 space-y-4">
          <input
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="City/Location"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <div className="flex justify-between">
            <button
              className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-400 focus:outline-none"
              onClick={handleAddOrEdit}
            >
              {editIndex !== null ? "Save Changes" : "Add Address"}
            </button>
            <button
              className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Address List */}
      <ul className="mt-6 space-y-4">
        {addresses.map((address, index) => (
          <li
            key={index}
            className="bg-white p-4 rounded-md shadow-md flex justify-between items-center"
          >
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="selectedAddress"
                checked={
                  currentAddress && currentAddress.phone === address.phone
                }
                onChange={() => handleSelectAddress(index)}
                className="text-orange-500"
              />
              <span className="font-semibold text-gray-800">
                {address.username}, {address.phone}, {address.city}
              </span>
            </label>
            <div className="space-x-2 flex">
              <button
                className="bg-orange-500 text-white cursor-pointer hover:text-orange-400 px-3 py-2 rounded-md"
                onClick={() => handleEdit(index)}
              >Edit</button>
              <button
                className=" bg-red-500 cursor-pointer text-white hover:text-red-400 px-3 py-2 rounded-md"
                onClick={() => handleRemove(index)}
              >Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default AddressManager;
