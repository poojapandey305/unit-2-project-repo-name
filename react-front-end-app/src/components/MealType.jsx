 Importing necessary React tools and components
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

  const selectRefs = useRef([]);
  const [total, setTotal] = useState(0);

  // UPDATED: fetch live data from backend + added [mealType] dependency
  useEffect(() => {
    fetch(`http://localhost:8080/api/menuitems/category/${mealType}`)  // ADDED: fetch from backend by category
      .then(response => response.json())
      .then(data => {
        setMenuItems(data);  // store response data
        selectRefs.current = [];  // clear previous dropdowns
      })
      .catch(error => console.error("Error fetching data:", error));
  }, [mealType]); // ADDED: run again when user switches to another category

  // Calculate total price
  const calculateTotal = () => {
    let sum = 0;
    selectRefs.current.forEach((selectElement, index) => {
      const qty = parseInt(selectElement?.value) || 0;
      sum += qty * menuItems[index].price;
    });
    setTotal(sum);
  };

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