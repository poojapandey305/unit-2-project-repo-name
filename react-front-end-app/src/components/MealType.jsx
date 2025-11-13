
// Importing necessary React tools and components
import { useParams } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import './MealType.css';
import MenuItem from './MenuItem';
import Button from './Button';

function MealType() {
  const { mealType } = useParams();  // get category name from URL like 'breakfast' or 'lunch'

  // state variables
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState(""); // for success message

  const selectRefs = useRef([]);

  // base URL for backend API
  const baseURL = "http://localhost:8080/api/carts";
  const userId = 1;  // fixed user 

  // helper function to load local saved quantities
  const loadLocalQuantities = (data) => {
    const saved = JSON.parse(localStorage.getItem("cartQuantities")) || {};
    return data.map(item => ({
      ...item,
      selectedQty: saved[item.itemId] || 0
    }));
  };

  // save current quantities to localStorage
  const saveLocalQuantities = (updatedMenu) => {
    const saved = {};
    updatedMenu.forEach(item => {
      if (item.selectedQty > 0) saved[item.itemId] = item.selectedQty;
    });
    localStorage.setItem("cartQuantities", JSON.stringify(saved));
  };

  // to  fetch menu items and cart data to merge existing quantities
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [menuRes, cartRes] = await Promise.all([
          fetch(`http://localhost:8080/api/menuitems/category/${mealType}`),
          fetch(`${baseURL}/user/${userId}`),
        ]);

        const menuData = await menuRes.json();
        const cartData = await cartRes.json();

        // merge backend and local quantities
        let updatedMenu = menuData.map((item) => {
          const existing = cartData.cartItems?.find(
            (ci) => ci.menuItem?.itemId === item.itemId
          );
          return { ...item, selectedQty: existing ? existing.quantity : 0 };
        });

        updatedMenu = loadLocalQuantities(updatedMenu);
        setMenuItems(updatedMenu);

        // calculate total
        const totalPrice = updatedMenu.reduce(
          (sum, item) => sum + (item.price * (item.selectedQty || 0)),
          0
        );
        setTotal(totalPrice);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [mealType]);

  // calculate total whenever user changes quantity
  const calculateTotal = () => {
    const updated = menuItems.map((item, index) => {
      const qty = Number(selectRefs.current[index]?.value || 0);
      return { ...item, selectedQty: qty };
    });

    const sum = updated.reduce((acc, i) => acc + i.price * i.selectedQty, 0);
    setMenuItems(updated);
    setTotal(sum);
    saveLocalQuantities(updated);
  };

  // fetch or create a cart for the user
  const getOrCreateCart = async () => {
    const res = await fetch(`${baseURL}/user/${userId}`);
    if (!res.ok) throw new Error("Failed to get or create cart");
    return res.json();
  };

  // function triggered when user clicks "Add to Cart"
  const handleAddToCart = async (menuItemId, quantity = 1) => {
    try {
      const cart = await getOrCreateCart();
      const cartId = cart.cartId;

      const response = await fetch(
        `${baseURL}/${cartId}/addItem/${menuItemId}?quantity=${quantity}`,
        { method: "POST" }
      );

      if (!response.ok) throw new Error("Failed to add item");

      // update total visually
      const item = menuItems.find((m) => m.itemId === menuItemId);
      if (item) {
        setTotal((prevTotal) => prevTotal + item.price * quantity);
      }

    //massage showing on screen
      setMessage(`${item.name} added to cart successfully`);
      setTimeout(() => setMessage(""), 2500); // hide after 2.5 seconds
    } catch (err) {
      console.error("Error adding to cart:", err);
      setMessage("Error adding item to cart");
      setTimeout(() => setMessage(""), 2500);
    }
  };

  if (loading) return <p>Loading {mealType} menu...</p>;
  if (menuItems.length === 0) {
    return <p>No items found for {mealType}.</p>;
  }

  return (
    <div className="menuDiv">
      <h2>{mealType.toUpperCase()} Menu</h2>

      {/* show message if available */}
      {message && <div className="successMessage">{message}</div>}

      {menuItems.map((item, index) => (
        <div key={item.itemId} className="menuItemDiv">
          <MenuItem
            item={item}
            refEl={(el) => (selectRefs.current[index] = el)}
            onChange={calculateTotal}
          />
          <Button
            text="Add to Cart"
            className="smallButton"
            onClick={() =>
              handleAddToCart(item.itemId, Number(selectRefs.current[index]?.value || 1))
            }
          />
        </div>
      ))}

      {/* display total */}
      <div className="priceDiv">
        Total Price: ${isNaN(total) ? 0 : total.toFixed(2)}
      </div>
    </div>
  );
}

export default MealType;