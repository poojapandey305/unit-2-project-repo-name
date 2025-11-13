import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AddressForm.css";

function AddressForm() {
  const navigate = useNavigate();
  const loadedOnce = useRef(false);

  const [formData, setFormData] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  const [error, setError] = useState(""); // added for validation

  // To load saved data once
  useEffect(() => {
    if (loadedOnce.current) return;
    loadedOnce.current = true;

    const saved = localStorage.getItem("addressForm");
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (err) {
        console.error("Error reading saved address:", err);
      }
    }
  }, []);

  // method to Save any change to localStorage
  useEffect(() => {
    localStorage.setItem("addressForm", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Proceed button with validation
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // reset error
    
    
  //basic validation for the form

    //To  Check if any field is empty
    for (let key in formData) {
      if (formData[key].trim() === "") {
        setError("All fields are required.");
        return;
      }
    }

    // Phone: 10 digits
    if (!/^\d{10}$/.test(formData.phone)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    //  ZIP: 6 digits
    if (!/^\d{6}$/.test(formData.zip)) {
      setError("ZIP code must be exactly 6 digits.");
      return;
    }

    // for proceeding to checkout
    localStorage.setItem("addressForm", JSON.stringify(formData));
    navigate("/checkout");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="addressContainer">
      <h2 className="addressHeader">Delivery Address</h2>

      <form className="addressForm" onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />

        <label>Street:</label>
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          placeholder="Street address"
          required
        />

        <label>City:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          required
        />

        <label>State:</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="State"
          required
        />

        <label>ZIP Code:</label>
        <input
          type="text"
          name="zip"
          value={formData.zip}
          onChange={handleChange}
          placeholder="ZIP"
          required
        />

        <label>Phone Number:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
          required
        />

        {/*To Show validation error if exists */}
        {error && <p className="errorText">{error}</p>}

        <div className="addressButtons">
          <button
            type="button"
            className="goBackButton"
            onClick={handleBack}
          >
            Go Back
          </button>

          <button type="submit" className="addressButton">
            Proceed to Payment
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddressForm;