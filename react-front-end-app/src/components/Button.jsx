/// Importing React library
import React from 'react';

// Import CSS file to style the button
import './Button.css';

// creating a button component that can be reused across the app
function Button({ text, onClick, type = "button", className = "" }) {
  return (
    <button
      className={`customButton ${className}`} // Combining  default and custom class names
      type={type} // for setting up button type like submit, button)
      onClick={onClick} // Call function when button is clicked
    >
      {text} {/* For Showing the text passed to the button */}
    </button>
  );
}

export default Button;