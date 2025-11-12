// Importing CSS for navbar styling
import './Navbar.css';

// Importing Link from react-router-dom to enable navigation between pages without reloading
import { Link } from "react-router-dom";

// Navbar component
function Navbar() {
  return (
    <nav>
      {/* Container for all navigation links */}
      <div className="navBarDiv">
        {/* Link to the homepage */}
        <Link to="/">Home</Link>

        {/* Link to breakfast category page */}
        <Link to="/category/breakfast">Breakfast</Link>

        {/* Link to lunch category page */}
        <Link to="/category/lunch">Lunch</Link>

        {/* Link to dinner category page */}
        <Link to="/category/dinner">Dinner</Link>

        {/* Link to About Us page */}
        <Link to="/about">About Us</Link>
        
         <Link to="/cart">Cart</Link>
      </div>
    </nav>
  );
}

// Exporting the component to use it in other parts of the app
export default Navbar;