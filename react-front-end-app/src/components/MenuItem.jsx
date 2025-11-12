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
      {/* displaying the item's image with alt text for accessibility */}
      <img
        src={item.image && item.image.startsWith('/') ? item.image : `/${item.image}`}
        alt={item.name}
        className="itemImage"
      />

      {/* displaying the food item's name */}
      <span className="itemName">{item.name}</span>

      {/* showing the price of the item */}
      <span className="itemPrice">${item.price}</span>

      {/* label shown before the dropdown */}
      <span className="itemQuantity">Select Quantity:</span>

      {/* Dropdown menu to select quantity */}
      <select
        className="quantitySelect"
        ref={refEl}                   // Pass dropdown element reference to parent
        value={item.selectedQty || 0} // prefill quantity based on backend data
        onChange={onChange}           // Trigger parent's handler on change
      >
        {/* Looping through quantity options and creating dropdown options */}
        {quantities.map(qty => (
          <option key={qty} value={qty}>{qty}</option>
        ))}
      </select>
    </div>
  );
}

export default MenuItem;