import React from "react";
import { Link } from "react-router-dom";
import './styles.css'; 

function Footer() {
  return (
    <footer className="footer">
      © 2025<Link to="/about"> Urban Spice </Link>
    </footer>
  );
}

export default Footer;