// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={{ padding: "10px", backgroundColor: "#333", color: "white" }}>
            <Link to="/" style={{ color: "white", marginRight: "10px" }}>Login</Link>
            <Link to="/dashboard" style={{ color: "white" }}>Dashboard</Link>
        </nav>
    );
};

export default Navbar;