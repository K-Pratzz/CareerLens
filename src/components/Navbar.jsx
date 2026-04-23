import React, { useState, useEffect } from "react";

function Navbar() {
  const [dark, setDark] = useState(
    JSON.parse(localStorage.getItem("theme")) || true
  );

  useEffect(() => {
    document.body.className = dark ? "dark" : "light";
    localStorage.setItem("theme", JSON.stringify(dark));
  }, [dark]);

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
      <h2>CareerLens</h2>

      <button onClick={() => setDark(!dark)}>
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>
    </div>
  );
}

export default Navbar;