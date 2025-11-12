
//Importing necessary React tools and components
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart() {
  // state variables
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const userId = user?.id || 1; // fallback to default user if not logged in
  const baseURL = "http://localhost:8080/api/carts";

  // fetch the cart for current user
  useEffect(() => {
    fetch(`${baseURL}/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        console.log("Cart data:", data);
        setCart(data);

        // calculate total if items exist
        if (data && data.cartItems) {
          const sum = data.cartItems.reduce((acc, item) => {
            const price = Number(item.menuItem?.price || 0);
            const qty = Number(item.quantity || 0);
            return acc + price * qty;
          }, 0);
          setTotal(sum);
        }
      })
      .catch(err => console.error("Error fetching cart:", err));
  }, [userId]);

  if (!cart) return <p>Loading cart...</p>;

  return (
    <div className="cartDiv">
      <h2>Your Cart</h2>

      {/* check if there are items in the cart */}
      {cart.cartItems && cart.cartItems.length > 0 ? (
        <>
          {/* render each cart item */}
          {cart.cartItems.map((ci) => (
            <div key={ci.cartItemId} className="cartItem">
              <img
                src={ci.menuItem?.image && ci.menuItem.image.startsWith('/')
                  ? ci.menuItem.image
                  : `/${ci.menuItem?.image}`}
                alt={ci.menuItem?.name}
                className="cartItemImage"
              />
              <span className="cartItemName">{ci.menuItem?.name}</span>
              <span className="cartItemQty">Qty: {ci.quantity}</span>
              <span className="cartItemPrice">
                ${(ci.menuItem?.price * ci.quantity).toFixed(2)}
              </span>
            </div>
          ))}

          {/* total section */}
          <div className="cartTotal">
            <strong>Total: ${isNaN(total) ? 0 : total.toFixed(2)}</strong>
          </div>

          {/* action buttons */}
          <div className="cartButtons">
            <button
              className="goBackButton"
              onClick={() => navigate(-1)}  // navigate to previous page
            >
              Go Back
            </button>

            <button
              className="checkoutButton"
              onClick={() => navigate("/address")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default Cart;