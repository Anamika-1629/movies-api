// src/pages/Home.jsx
// The main landing page — shows a hero banner + the full movie grid.

import React, { useState } from "react";
import { useMovies } from "../hooks/useMovies";
import MovieCard from "../components/MovieCard";
import "./Home.css";

export default function Home() {
    const { movies, loading, error } = useMovies();
    const [search, setSearch] = useState("");

    // Client-side filter — no extra API call needed
    const filtered = movies.filter((m) =>
        m.title?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="home">
            {/* ── Hero Banner ── */}
            <section className="home__hero">
                <div className="home__hero-bg" aria-hidden="true" />
                <div className="container home__hero-content">
                    <p className="home__hero-eyebrow">Welcome to</p>
                    <h1 className="home__hero-title">CINEMASCOPE</h1>
                    <p className="home__hero-subtitle">
                        Discover films. Leave your mark. Cinema lives here.
                    </p>

                    {/* Search input */}
                    <div className="home__search-wrap">
                        <span className="home__search-icon" aria-hidden="true">⌕</span>
                        <input
                            className="home__search"
                            type="text"
                            placeholder="Search movies…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            aria-label="Search movies"
                        />
                    </div>
                </div>
            </section>

            {/* ── Movie Grid ── */}
            <section className="home__grid-section container">
                <div className="home__section-header">
                    <h2 className="home__section-title">All Movies</h2>
                    {!loading && (
                        <span className="home__count">
              {filtered.length} title{filtered.length !== 1 ? "s" : ""}
            </span>
                    )}
                </div>

                {/* Loading skeleton */}
                {loading && (
                    <div className="home__grid">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="home__skeleton" />
                        ))}
                    </div>
                )}

                {/* Error state */}
                {error && (
                    <div className="home__error">
                        <span className="home__error-icon">⚠</span>
                        <p>Could not load movies.</p>
                        <small>Make sure your Spring Boot backend is running on <code>http://localhost:8080</code></small>
                    </div>
                )}

                {/* Movie cards */}
                {!loading && !error && (
                    <>
                        {filtered.length === 0 ? (
                            <p className="home__no-results">No movies match "{search}"</p>
                        ) : (
                            <div className="home__grid">
                                {filtered.map((movie, i) => (
                                    <div
                                        key={movie.imdbId}
                                        style={{ animationDelay: `${i * 0.06}s` }}
                                    >
                                        <MovieCard movie={movie} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
}