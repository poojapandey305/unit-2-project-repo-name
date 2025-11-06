// Importing the Link component for navigation between pages
import { Link } from "react-router-dom";

// Importing food menu data
import foodMenu from "../data/foodMenu";

// Importing the CSS file for styling this component
import './Home.css';

// Importing React and some of its hooks (useRef, useState, useEffect )
import React, { useRef, useState, useEffect } from "react";

function Home() {
  return (
    // Defining a div with a class name for styling using CSS
    <div className="mainpageDiv">
      
      {/* Page heading */}
      <h2 className="appNameFadeIn">Welcome to Urban Spice</h2>

      {/* a paragraph discribing the app */}
      <p className="mainpageText">
        Urban Spice has been serving delicious Indian cuisine since 2005. 
        Known for our authentic flavors and warm hospitality, 
        we bring the true taste of India to your plate. From street-style snacks to rich curries, 
        we have something for every craving.
      </p>

      {/* defining a div forfood item images with classname  */}
      <div className="mainfoodItems">
        {/* Each image is containing a alt text as alternate(incase if image doesn't work) */}
        <img src="/images/Jalebi.M.jfif" alt="Jalebi" />
        <img src="/images/Dhokla.M.jfif" alt="Dhokla" />
        <img src="/images/Gulabjamun.M.jfif" alt="Gulab Jamun" />
        <img src="/images/Motichoor.M.jfif" alt="Motichoor Ladoo" />
      </div>
    </div>
  );
}

// Exporting the component to be used in other parts of the app
export default Home;