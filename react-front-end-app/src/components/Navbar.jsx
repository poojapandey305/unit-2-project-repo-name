// Importing CSS for navbar styling
import './Navbar.css';

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // To detect route changes
  const [loggedUser, setLoggedUser] = useState(null);

  // Recheck logged-in user whenever page changes
  useEffect(() => {
    const userData = localStorage.getItem("urbanspiceUser");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setLoggedUser(parsedUser);
    } else {
      setLoggedUser(null);
    }
  }, [location.pathname]);  // Refresh on route change

  const handleLogout = () => {
    localStorage.removeItem("urbanspiceUser");
    setLoggedUser(null);
    navigate("/");
  };

  return (
    <nav>
      <div className="navBarDiv">
        <Link to="/">Home</Link>
        <Link to="/category/breakfast">Breakfast</Link>
        <Link to="/category/lunch">Lunch</Link>
        <Link to="/category/dinner">Dinner</Link>
        <Link to="/about">About Us</Link>
        <Link to="/cart">Cart</Link>

        {loggedUser ? (
          <span className="nav-link logout-link" onClick={handleLogout}>
            Logout
          </span>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;