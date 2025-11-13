import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentPreference.css";
import Button from "./Button";

function PaymentPreference() {
  const [selectedMethod, setSelectedMethod] = useState("Pay on Delivery"); // default choice
  const [message, setMessage] = useState(""); // to display confirmation/status message
  const navigate = useNavigate();

  // When user clicks confirm payment button
  const handleConfirm = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentMethod: selectedMethod,
          paymentStatus: "Pending", // MVP keeps Pay on Delivery default as Pending
        }),
      });

      if (!response.ok) throw new Error("Failed to create payment");

      setMessage(`Order confirmed successfully! 
Payment Method: ${selectedMethod} 
   [Payment Status: Pending]`);
    } catch (err) {
      setMessage("Error confirming payment: " + err.message);
    }
  };

  // To navigate back to Address form if needed
  const handlePrevious = () => {
    navigate(-1);
  };

  return (
    <div className="payment-container">
      <h2>Payment Preference</h2>

      <div className="payment-options">
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="Pay on Delivery"
            checked={selectedMethod === "Pay on Delivery"}
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          Pay on Delivery
        </label>

        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="Pay Now"
            checked={selectedMethod === "Pay Now"}
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          Pay Now
        </label>
      </div>

      {/* Button section styling */}
      <div className="payment-buttons">
        <Button
          text="⬅ Previous"
          onClick={handlePrevious}
          className="prvButton"
        />
        <Button
          text="Confirm Payment"
          onClick={handleConfirm}
          className="nxtButton"
        />
      </div>

      {/* Message to be displayed after confirmation */}
      {message && <p className="confirmation-message">{message}</p>}
    </div>
  );
}

export default PaymentPreference;