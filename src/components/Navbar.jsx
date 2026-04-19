import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>CareerLens</h2>

      <div>
        {/* Link prevents full page reload (SPA behavior) */}
        <Link to="/">Home</Link>
        <Link to="/jobs">Jobs</Link>
        <Link to="/saved">Saved</Link>
      </div>
    </nav>
  );
}

export default Navbar;