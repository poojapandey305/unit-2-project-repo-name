import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [userId, setUserId] = useState(null);

  //Method to Load logged-in user and cart
  useEffect(() => {
    const storedUser = localStorage.getItem("urbanspiceUser");
    if (!storedUser) return;

    const user = JSON.parse(storedUser);
    setUserId(user.userId);

    fetchCart(user.userId);
  }, []);

  //Method to Fetch cart from backend
  const fetchCart = (uid) => {
    fetch(`http://localhost:8080/api/carts/user/${uid}`)
      .then((res) => res.json())
      .then((data) => {
        const items = data.cartItems || [];
        setCartItems(items);
        calculateTotal(items);
      })
      .catch((err) => console.log("Error loading cart:", err));
  };

  //For total calculation
  const calculateTotal = (items) => {
    const sum = items.reduce(
      (acc, item) => acc + item.menuItem.price * item.quantity,
      0
    );
    setTotal(sum);
  };

  // To Update quantity
  const handleQuantityChange = async (cartItemId, newQty) => {
    if (newQty < 1) return;

    await fetch(
      `http://localhost:8080/api/carts/updateQuantity/${cartItemId}?quantity=${newQty}`,
      { method: "PUT" }
    );

    fetchCart(userId);
  };

  //  To Remove item from  the cart
  const handleRemove = async (cartItemId) => {
    await fetch(
      `http://localhost:8080/api/carts/removeItem/${cartItemId}`,
      { method: "DELETE" }
    );

    fetchCart(userId);
  };

  return (
    <div className="cart-container">

      {/* Go Back Button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        Go Back
      </button>

      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.cartItemId} className="cart-item">
            <img src={item.menuItem.image} alt="" className="cart-img" />

            <div className="cart-details">
              <h3>{item.menuItem.name}</h3>
              <p>$ {item.menuItem.price}</p>

              <div className="quantity-section">
                <button
                  onClick={() =>
                    handleQuantityChange(item.cartItemId, item.quantity - 1)
                  }
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    handleQuantityChange(item.cartItemId, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>

              <button
                className="remove-btn"
                onClick={() => handleRemove(item.cartItemId)}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      {/* Total */}
      <h3 className="total-text">Total: $ {total}</h3>

      {/* Checkout Button */}
      <button
        className="checkout-btn"
        onClick={() => navigate("/address")}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Cart;