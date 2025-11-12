import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./Cart.css";
import Button from "./Button";

function Cart() {
  // State variables to store cart data, loading status, and error messages
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(""); // For inline total or info message
  const navigate = useNavigate(); // used for smooth page navigation

  const userId = 1; // fixed user id
  const baseURL = "http://localhost:8080/api/carts"; // backend base URL

  // Fetch cart data when component loads
  useEffect(() => {
    fetch(`${baseURL}/user/${userId}`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load cart");
        return response.json();
      })
      .then((data) => {
        setCart(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // remove specific item from cart and refresh
  const handleRemoveItem = async (cartItemId) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this item?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${baseURL}/removeItem/${cartItemId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to remove item");

      const updatedCart = await fetch(`${baseURL}/user/${userId}`).then((r) => r.json());
      setCart(updatedCart);
      setMessage("Item removed successfully!");
    } catch (err) {
      setError("Error removing item: " + err.message);
    }
  };

  // change quantity of an item
  const handleQuantityChange = async (cartItemId, newQuantity) => {
    try {
      const response = await fetch(
        `${baseURL}/updateQuantity/${cartItemId}?quantity=${newQuantity}`,
        { method: "PUT" }
      );
      if (!response.ok) throw new Error("Failed to update quantity");

      const updatedCart = await fetch(`${baseURL}/user/${userId}`).then((r) => r.json());
      setCart(updatedCart);
      setMessage("Quantity updated successfully!");
    } catch (err) {
      setError("Error updating quantity: " + err.message);
    }
  };

  // calculate total from backend and show inline message (no alert)
  const handleGetTotal = async () => {
    try {
      const response = await fetch(`${baseURL}/${cart.cartId}/total`);
      if (!response.ok) throw new Error("Failed to calculate total");
      const total = await response.text();
      setMessage(`Your cart total is $${parseFloat(total).toFixed(2)}`);
    } catch (err) {
      setError("Error calculating total: " + err.message);
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p className="error-text">Error: {error}</p>;
  if (!cart) return <p>No cart found.</p>;

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>

      {/* If no items in cart, show message */}
      {cart.cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price ($)</th>
              <th>Quantity</th>
              <th>Total ($)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.cartItems.map((item) => (
              <tr key={item.cartItemId}>
                <td>{item.menuItem?.name || "Unknown Item"}</td>
                <td>{item.menuItem?.price?.toFixed(2) || "0.00"}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.cartItemId, e.target.value)
                    }
                    style={{
                      width: "60px",
                      textAlign: "center",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                  />
                </td>
                <td>
                  {(item.menuItem?.price * item.quantity).toFixed(2) || "0.00"}
                </td>
                <td>
                  <Button
                    text="Remove"
                    onClick={() => handleRemoveItem(item.cartItemId)}
                    className="smallButton"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Order summary section */}
      {cart.cartItems.length > 0 && (
        <div className="cart-summary">
          <h3>Order Summary</h3>

          <p>
            Subtotal: $
            {cart.cartItems
              .reduce(
                (sum, item) => sum + item.menuItem?.price * item.quantity,
                0
              )
              .toFixed(2)}
          </p>

          <p>Delivery: $0.00</p>
          <hr />

          {/* Buttons styled */}
          <div style={{ textAlign: "center" }}>
            <Button
              text="Calculate Total"
              onClick={handleGetTotal}
              className="total-btn"
            />
            <Button
              text="Proceed to Checkout"
              onClick={() => navigate("/address")}
              className="nxtButton"
            />
            <Button
              text="⬅ Back to Menu"
              onClick={() => navigate("/")}
              className="smallButton"
            />
          </div>

          {/* Inline message display */}
          {message && <p className="message">{message}</p>}
        </div>
      )}
    </div>
  );
}

export default Cart;
