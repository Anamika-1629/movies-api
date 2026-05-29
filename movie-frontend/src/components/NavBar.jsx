// src/components/Navbar.jsx
// Top navigation bar — logo on the left, nav links on the right.

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Add a solid background once the user scrolls down
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
            <div className="navbar__inner container">
                {/* ── Logo ── */}
                <Link to="/" className="navbar__logo">
                    <span className="navbar__logo-icon">▶</span>
                    CINEMASCOPE
                </Link>

                {/* ── Links ── */}
                <ul className="navbar__links">
                    <li>
                        <Link
                            to="/"
                            className={`navbar__link ${location.pathname === "/" ? "navbar__link--active" : ""}`}
                        >
                            Movies
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}