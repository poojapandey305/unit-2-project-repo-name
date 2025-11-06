// Importing React library to use JSX and components
import React from 'react';

// Importing styles from MealType.css file
import './MealType.css';

// Defining the MenuItem component
// It receives three props: item (food details), refEl (reference to dropdown), and onChange (event handler)
function MenuItem({ item, refEl, onChange }) {
  // creating an array of quantities from 0 to 5
  const quantities = [0, 1, 2, 3, 4, 5];

  return (
    <div className="menuItem">
      {/* for displaying the item's image with alt text for accessibility */}
      <img src={item.image} alt={item.name} className="itemImage" />

      {/* displaying the food item's name */}
      <span className="itemName">{item.name}</span>

      {/* Showing the price of the item */}
      <span className="itemPrice">${item.price}</span>

      {/* Label shown before the dropdown to tell the user what it does */ }
      <span className="itemQuantity">Select Quantity:</span>

      {/* Dropdown menu to select quantity */}
      <select
        className="quantitySelect"
        ref={refEl}           //  this will pass the dropdown element to the parent so it can read the selected quantity
        onChange={onChange}   // This will trigger a function when the user changes the quantity and Call parent's onChange handler to update total
      >
        {/* Looping through quantity options and creating a dropdown option for each (0 to 5) */}
        {quantities.map(qty => (
          <option key={qty} value={qty}>{qty}</option>
        ))}
      </select>
    </div>
  );
}

// Export this component so it can be used in other files
export default MenuItem;