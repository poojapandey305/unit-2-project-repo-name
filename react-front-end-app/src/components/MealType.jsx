//Importing necessary React tools and components
import { useParams } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import './MealType.css';
import MenuItem from './MenuItem';
import Button from './Button';
function MealType() {
  const { mealType } = useParams();  // get category name from URL like 'breakfast' or 'lunch'

  // state to hold menu items fetched from backend
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true); // track if data is still loading
  const [total, setTotal] = useState(0);

  const selectRefs = useRef([]);

  // base URL for backend API
  const baseURL = "http://localhost:8080/api/carts";
  const userId = 1;  // fixed user for now

  // fetch menu items from backend by category name
  useEffect(() => {
    setLoading(true); 
    fetch(`http://localhost:8080/api/menuitems/category/${mealType}`)  
      .then(response => response.json())
      .then(data => { 
        console.log("Fetched data:", data);  
        setMenuItems(data);  
        setTotal(0);
        selectRefs.current = [];  
        setLoading(false); 
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [mealType]); //It run again when user switches to another category

  //To calculate total price based on selected quantity
  const calculateTotal = () => {
    let sum = 0;
    selectRefs.current.forEach((selectElement, index) => {
      const qty = parseInt(selectElement?.value) || 0;
      sum += qty * menuItems[index].price;
    });
    setTotal(sum);
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
      alert("Item added to cart successfully!");
    } catch (err) {
      alert("Error adding to cart: " + err.message);
    }
  };

  if (loading) return <p>Loading {mealType} menu...</p>; // loading message
  if (menuItems.length === 0) {
    return <p>No items found for {mealType}.</p>;
  }

  return (
    <div className="menuDiv">
      <h2>{mealType.toUpperCase()} Menu</h2>

      {menuItems.map((item, index) => (
        <div key={item.itemId} className="menuItemDiv">
          <MenuItem
            item={item}
            refEl={selectElement => (selectRefs.current[index] = selectElement)}
            onChange={calculateTotal}
          />

          {/* button to add item to cart */}
<Button
  text="Add to Cart"
  className="smallButton"
  onClick={() => handleAddToCart(item.itemId, 1)}
/>
        </div>
      ))}

      {/* displaying total price for selected items */}
      <div className='priceDiv'>
        Total Price: ${total.toFixed(2)}
      </div>
    </div>
  );
}

export default MealType;
