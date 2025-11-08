 //Importing necessary React tools and components
import { useParams, Link } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import './MealType.css';
import MenuItem from './MenuItem';
import Button from './Button';

// REMOVED import foodMenu.js  // was used for mock data before

function MealType() {
  const { mealType } = useParams();  // get category name from URL like 'breakfast' or 'lunch'

  // ADDED: state to hold menu items fetched from backend
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true); // ADDED: track if data is still loading

  const selectRefs = useRef([]);
  const [total, setTotal] = useState(0);

  // UPDATED: fetch live data from backend + added [mealType] dependency
  useEffect(() => {
     setLoading(true); // start loading before fetch
    fetch(`http://localhost:8080/api/menuitems/category/${mealType}`)  // ADDED: fetch from backend by category
      .then(response => response.json())
      .then(data => {
        setMenuItems(data);  // store response data

        setTotal(0);
        selectRefs.current = [];  // clear previous dropdowns
         setLoading(false); // ADDED: stop loading after data is fetched
      })
      .catch(error => {
  console.error("Error fetching data:", error);
  setLoading(false);
});}, [mealType]); // ADDED: run again when user switches to another category

  // Calculate total price
  const calculateTotal = () => {
    let sum = 0;
    selectRefs.current.forEach((selectElement, index) => {
      const qty = parseInt(selectElement?.value) || 0;
      sum += qty * menuItems[index].price;
    });
    setTotal(sum);
  };
if (loading) return <p>Loading {mealType} menu...</p>;//loading massage
  if (menuItems.length === 0) {
    return <p>No items found for {mealType}.</p>;
  }

  return (
    <div className="menuDiv">
      <h2>{mealType.toUpperCase()} Menu</h2>

      {menuItems.map((item, index) => (
        <MenuItem
          key={item.id}
          item={item}
          refEl={selectElement => (selectRefs.current[index] = selectElement)}
          onChange={calculateTotal}
        />
      ))}

      <div className='priceDiv'>
        Total Price: ${total.toFixed(2)}
      </div>

      <Link to="/address">
        <Button text="Order Now" className="orderButton" />
      </Link>
    </div>
  );
}

export default MealType;