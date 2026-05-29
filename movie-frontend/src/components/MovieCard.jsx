// src/components/MovieCard.jsx
// Displays a single movie as a poster card.
// Clicking navigates to the movie's detail page.

import React from "react";
import { useNavigate } from "react-router-dom";
import "./MovieCard.css";

export default function MovieCard({ movie }) {
    const navigate = useNavigate();

    // Convert ObjectId to string for the URL
    const handleClick = () => {
        navigate(`/movie/${movie.imdbId}`);
    };

    return (
        <article className="movie-card" onClick={handleClick} role="button" tabIndex={0}
                 onKeyDown={(e) => e.key === "Enter" && handleClick()}
                 aria-label={`View details for ${movie.title}`}
        >
            {/* ── Poster image ── */}
            <div className="movie-card__poster-wrap">
                <img
                    src={movie.poster || "https://via.placeholder.com/300x450?text=No+Poster"}
                    alt={`${movie.title} poster`}
                    className="movie-card__poster"
                    loading="lazy"
                />

                {/* Red overlay on hover */}
                <div className="movie-card__overlay">
                    <span className="movie-card__play-btn">▶ Details</span>
                </div>
            </div>

            {/* ── Card footer info ── */}
            <div className="movie-card__info">
                <h3 className="movie-card__title">{movie.title}</h3>
                <div className="movie-card__meta">
                    <span className="movie-card__year">{movie.releaseDate}</span>
                    {movie.genres && movie.genres.length > 0 && (
                        <span className="movie-card__genre">{movie.genres[0]}</span>
                    )}
                </div>
            </div>
        </article>
    );
}