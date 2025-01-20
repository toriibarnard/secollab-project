// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'; // Import the external CSS file for Navbar

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
        </nav>
    );
};

export default Navbar;