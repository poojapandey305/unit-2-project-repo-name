import { useState } from "react";
import './PaymentPreference.css';

// This component lets the user select a payment option
function PaymentPreference() {
  const [payment, setPayment] = useState("");         // Stores selected payment method
  const [thankYou, setThankYou] = useState(false);    // Controls display of thank you message

  // Handle user selecting a payment option
  const handleChange = (e) => {
    const selected = e.target.value;    // Getting value from selected radio button
    setPayment(selected);               // Updating selected payment option

    // If "Pay on Delivery" is chosen, show thank you message
    if (selected === "Pay on Delivery") {
      setThankYou(true);
    } else {
      setThankYou(false); // Hide message if selection changes
    }
  };

  return (
    <div className="paymentDiv">
      <h2>Select Payment Option</h2>

      {/* Radio option for "Pay Now" */}
      <label>
        <input
          type="radio"
          value="Pay Now"
          checked={payment === "Pay Now"}   // this one checks the correct radio button
          onChange={handleChange}           // this one handles user selection
        />
        Pay Now
      </label>

      {/* Radio option for "Pay on Delivery" */}
      <label>
        <input
          type="radio"
          value="Pay on Delivery"
          checked={payment === "Pay on Delivery"}
          onChange={handleChange}
        />
        Pay on Delivery
      </label>

      {/* Showing current selection */}
      <p>You selected: {payment}</p>

      {/* Thank you message appears only when Pay on Delivery is selected */}
      {thankYou && (
        <div style={{ marginTop: "1rem", color: "green" }}>
          Thank you! Your order has been placed. You can pay on delivery.
        </div>
      )}
    </div>
  );
}

export default PaymentPreference;