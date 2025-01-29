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
    <div>
      {/* Add New Address Button */}
      <button onClick={() => setShowForm(true)}>+ Add New Address</button>

      {/* Form to Add/Edit Address */}
      {showForm && (
        <div>
          <input
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
          />
          <input
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="City/Location"
          />
          <button onClick={handleAddOrEdit}>
            {editIndex !== null ? "Save Changes" : "Add Address"}
          </button>
          <button onClick={() => setShowForm(false)}>Cancel</button>
        </div>
      )}

      {/* Address List */}
      <ul>
        {addresses.map((address, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            <label>
              <input
                type="radio"
                name="selectedAddress"
                checked={
                  currentAddress && currentAddress.phone === address.phone
                }
                onChange={() => handleSelectAddress(index)}
              />
              <strong>{address.username}</strong>, {address.phone},{" "}
              {address.city}
            </label>
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleRemove(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressManager;
