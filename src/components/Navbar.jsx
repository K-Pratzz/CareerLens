import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [dark, setDark] = useState(
    JSON.parse(localStorage.getItem("theme")) ?? true
  );

  useEffect(() => {
    document.body.classList.toggle("light", !dark);
    localStorage.setItem("theme", JSON.stringify(dark));
  }, [dark]);

  return (
    <div className="navbar">
      <h2>CareerLens</h2>

      <div>
        <Link to="/">Jobs</Link>
        <Link to="/saved">Saved</Link>
        <button onClick={() => setDark(!dark)}>
          {dark ? "Light" : "Dark"}
        </button>
      </div>
    </div>
  );
}

export default Navbar;