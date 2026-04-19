import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Lazy loading pages → improves performance
// These components are NOT loaded until user visits route
const Home = lazy(() => import("./pages/Home"));
const Jobs = lazy(() => import("./pages/Jobs"));
const Saved = lazy(() => import("./pages/Saved"));

function App() {
  return (
    <Router>
      <Navbar />

      {/* Suspense handles loading state for lazy components */}
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/saved" element={<Saved />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;