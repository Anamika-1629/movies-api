// src/App.jsx
// Root component — sets up React Router with two routes:
//   /            → Home (movie grid)
//   /movie/:imdbId → MovieDetail

import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import "./styles/global.css";
import "./App.css";

export default function App() {
  return (
      <>
        {/* Navbar is rendered on every page */}
        <Navbar />

        {/* Page content swaps based on the URL */}
        <main>
          <Routes>
            <Route path="/"               element={<Home />} />
            <Route path="/movie/:imdbId"  element={<MovieDetail />} />

            {/* Catch-all: redirect unknown URLs back home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </>
  );
}