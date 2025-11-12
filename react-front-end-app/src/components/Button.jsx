// Importing React library
import React from 'react';

// Import CSS file to style the button
import './Button.css';

// creating a reusable button component that can be used across the app
function Button({ text, onClick, type = "button", className = "" }) {
  return (
    <button
      className={`customButton ${className}`} // combining default and custom class names
      type={type} // defining the button type (button / submit)
      onClick={onClick} // function to be called when the button is clicked
    >
      {text} {/* text to be displayed on the button */}
    </button>
  );
}

// exporting the button component to be used in other components
export default Button;