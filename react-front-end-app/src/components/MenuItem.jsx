
import React from 'react';


import './MealType.css';

// Defining the MenuItem component

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

     
      <span className="itemName">{item.name}</span>

      
      <span className="itemPrice">${item.price}</span>

      {/* label shown before the dropdown */}
      <span className="itemQuantity">Select Quantity:</span>

      {/* Dropdown menu to select quantity */}
      <select
        className="quantitySelect"
        ref={refEl}                   
        value={item.selectedQty || 0} 
        onChange={onChange}           
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