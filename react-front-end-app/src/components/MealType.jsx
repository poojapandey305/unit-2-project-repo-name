// Importing necessary React hooks and router tools
import { useParams, Link } from "react-router-dom"; // for getting mealType from URL and create navigation links
import foodMenu from "../data/foodMenu";             // Importing the food data
import './MealType.css';                             
import React, { useRef, useState, useEffect } from "react"; // Importing hooks for state 
import MenuItem from './MenuItem';      // MenuItem is  child component that displays individual food items
import Button from './Button';          // A reusable button component

function MealType() {
  const { mealType } = useParams(); // for getting mealType (like 'breakfast' 'lunch' or 'dinner') from the route URL

  // Filtering the list of food items to only show those matching the selected meal type
  const filteredItems = foodMenu.filter(item => item.category === mealType);

  const selectRefs = useRef([]); // useRef is used here to store references to each quantity dropdown (<select>) element
  const [total, setTotal] = useState(0); // State to store and update the total calculated price

  // Calculate total price based on selected quantities
  const calculateTotal = () => {
    let sum = 0;
    selectRefs.current.forEach((selectElement, index) => {
      const qty = parseInt(selectElement?.value) || 0; // it is saying if  no value is selected, treat it as 0
      sum += qty * filteredItems[index].price; // for adding price * quantity
    });
    setTotal(sum); // this will update total price state
  };

  // this will run once when component loads, to show initial price
  useEffect(() => {
    calculateTotal();
  }, []);

  // For showing message if no items match the selected meal type
  if (filteredItems.length === 0) {
    return <p>No items found for this meal type.</p>;
  }

  return (
    <div className="menuDiv">
      <h2>{mealType.toUpperCase()} Menu</h2>

      {/* using map to loop through filtered items and display each one using the MenuItem component */}
      {filteredItems.map((item, index) => (
        <MenuItem
          key={item.id}  // Unique key for React rendering
          item={item}    // this will pass item data to child component
          refEl={selectElement => (selectRefs.current[index] = selectElement)} // this one will pass the select dropdown reference
          onChange={calculateTotal} // this will recalculate total whenever quantity changes after user's action.
        />
      ))}

      {/* Displaying  the total price */}
      <div className='priceDiv'>
        Total Price: ${total}
      </div>
      {/*navigation*/} 

      {/* Button to go to the address form page */}
      <Link to="/address">
        <Button text="Order Now" className="orderButton" />
      </Link>
    </div>
  );
}

export default MealType;