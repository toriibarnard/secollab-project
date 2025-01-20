// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/login" className="navbar-item">Login</Link>
      <Link to="/register" className="navbar-item">Register</Link>
    </nav>
  );
};

export default Navbar;