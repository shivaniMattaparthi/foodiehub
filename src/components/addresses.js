import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddressManager = () => {
  const [addresses, setAddresses] = useState([]);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    city: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedAddresses = localStorage.getItem("addresses");
    const storedCurrentAddress = localStorage.getItem("currentAddress");

    if (storedAddresses) {
      try {
        const parsedAddresses = JSON.parse(storedAddresses);
        if (Array.isArray(parsedAddresses) && parsedAddresses.length > 0) {
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

  useEffect(() => {
    if (addresses.length > 0) {
      localStorage.setItem("addresses", JSON.stringify(addresses));
    }
    if (currentAddress) {
      localStorage.setItem("currentAddress", JSON.stringify(currentAddress));
    }
  }, [addresses, currentAddress]);

  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
    if (currentAddress) {
      localStorage.setItem("currentAddress", JSON.stringify(currentAddress));
    } else {
      localStorage.removeItem("currentAddress");
    }
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
    setShowForm(true);
  };

  const handleRemove = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));

    if (currentAddress && currentAddress.phone === addresses[index].phone) {
      setCurrentAddress(null);
      localStorage.removeItem("currentAddress");
    }
  };

  const handleSelectAddress = (index) => {
    setCurrentAddress(addresses[index]);
  };
  const handleGoBackFunc = () => {
    navigate("/ordersummary");
  };
  return (
    <div className="Address min-h-screen pt-8">
      <div className="max-w-lg mx-auto p-5 bg-white shadow-md rounded-lg">
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
        >
          + Add New Address
        </button>

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

        <ul className="mt-4">
          {addresses.map((address, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-3 bg-gray-100 rounded-md mb-2 shadow-sm"
            >
              <label className="flex items-center space-x-2  cursor-pointer">
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
                  className="bg-blue-500 cursor-pointer text-white hover:bg-blue-600  px-3 py-2 rounded-md"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 cursor-pointer text-white hover:bg-red-600 px-3 py-2 rounded-md"
                  onClick={() => handleRemove(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center mt-5">
        <button
          onClick={handleGoBackFunc}
          className="bg-orange-500 text-white px-3 py-3 rounded-md"
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default AddressManager;
