// Importing React library
import React from 'react';


import './Button.css';

// creating a reusable button component that can be used across the app
function Button({ text, onClick, type = "button", className = "" }) {
  return (
    <button
      className={`customButton ${className}`} 
      type={type} 
      onClick={onClick} // function to be called when the button is clicked
    >
      {text} 
    </button>
  );
}


export default Button;