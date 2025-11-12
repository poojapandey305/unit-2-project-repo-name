import React, { useEffect, useState } from "react";
import "./Cart.css";

function Cart() {
  // State variables to store cart data, loading status, and error messages
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For fixed user
  const userId = 1;

  // Base URL of backend cart API
  const baseURL = "http://localhost:8080/api/carts";

  /**
   * useEffect runs once when this component loads.
   * It fetches the user's existing cart from the backend.
   */
  useEffect(() => {
    console.log("Fetching cart from:", `${baseURL}/user/${userId}`);
    fetch(`${baseURL}/user/${userId}`)
      .then((response) => {
        console.log("Response status:", response.status);
        if (!response.ok) throw new Error("Failed to load cart");
        return response.json();
      })
      .then((data) => {
        console.log("Fetched cart data:", data);
        setCart(data);
        console.log("Fetched cart JSON:", JSON.stringify(data, null, 2));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []); // Runs only once when component loads

  // To remove a specific item from the user's cart.
  const handleRemoveItem = async (cartItemId) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this item?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${baseURL}/removeItem/${cartItemId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to remove item");

      // After removing, fetch the latest cart again so UI updates
      const updatedCart = await fetch(`${baseURL}/user/${userId}`).then((r) => r.json());
      setCart(updatedCart);
    } catch (err) {
      alert("Error removing item: " + err.message);
    }
  };

  // To fetch total price of the cart dynamically from backend
  const handleGetTotal = async () => {
    try {
      const response = await fetch(`${baseURL}/${cart.cartId}/total`);
      if (!response.ok) throw new Error("Failed to calculate total");
      const total = await response.text();
      alert(`Your cart total is $${parseFloat(total).toFixed(2)}`);
    } catch (err) {
      alert("Error calculating total: " + err.message);
    }
  };

  // Loading and error handling before rendering cart data
  if (loading) return <p>Loading cart...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
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
            {/* Loop through each cart item and display info */}
            {cart.cartItems.map((item) => (
              <tr key={item.cartItemId}>
                <td>{item.menuItem?.name || "Unknown Item"}</td>
                <td>{item.menuItem?.price?.toFixed(2) || "0.00"}</td>
                <td>{item.quantity}</td>
                <td>{(item.itemTotal || 0).toFixed(2)}</td>
                <td>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveItem(item.cartItemId)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Show total button only when there are items */}
      {cart.cartItems.length > 0 && (
        <button className="total-btn" onClick={handleGetTotal}>
          Calculate Total
        </button>
      )}
    </div>
  );
}

export default Cart;
