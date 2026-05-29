// src/pages/MovieDetail.jsx
// Shows full info for one movie (poster, trailer, genres, reviews).
// URL param: /movie/:imdbId  →  fetches GET /api/v1/movies/imdb-{imdbId}

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMovie } from "../hooks/useMovies";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";
import "./MovieDetail.css";

export default function MovieDetail() {
    const { imdbId } = useParams();        // grab :imdbId from the URL
    const navigate   = useNavigate();
    const { movie, loading, error } = useMovie(imdbId);

    // Local reviews state so we can prepend new ones instantly (optimistic UI)
    const [localReviews, setLocalReviews] = useState(null);

    // Called by ReviewForm after a successful POST
    const handleReviewAdded = (newReview) => {
        // Initialise from the movie data the first time
        const base = localReviews ?? movie?.reviewIds ?? [];
        setLocalReviews([newReview, ...base]);
    };

    // Decide which reviews array to render
    const reviews = localReviews ?? movie?.reviewIds ?? [];

    /* ── Loading ── */
    if (loading) {
        return (
            <div className="movie-detail movie-detail--loading container">
                <div className="movie-detail__skeleton-poster" />
                <div className="movie-detail__skeleton-info">
                    {[70, 40, 55, 90].map((w, i) => (
                        <div key={i} className="movie-detail__skeleton-line" style={{ width: `${w}%` }} />
                    ))}
                </div>
            </div>
        );
    }

    /* ── Error ── */
    if (error || !movie) {
        return (
            <div className="movie-detail movie-detail--error container">
                <span className="movie-detail__error-icon">⚠</span>
                <h2>Movie not found</h2>
                <p>We couldn't load this movie. The backend may be offline.</p>
                <button className="movie-detail__back-btn" onClick={() => navigate("/")}>
                    ← Back to Movies
                </button>
            </div>
        );
    }

    return (
        <div className="movie-detail">
            {/* ── Backdrop image as a blurred hero ── */}
            {movie.backdrops?.[0] && (
                <div
                    className="movie-detail__backdrop"
                    style={{ backgroundImage: `url(${movie.backdrops[0]})` }}
                    aria-hidden="true"
                />
            )}

            <div className="container movie-detail__inner">
                {/* Back button */}
                <button className="movie-detail__back-btn" onClick={() => navigate(-1)}>
                    ← Back
                </button>

                {/* ── Top section: poster + info side by side ── */}
                <div className="movie-detail__top">
                    {/* Poster */}
                    <div className="movie-detail__poster-wrap">
                        <img
                            src={movie.poster || "https://via.placeholder.com/300x450?text=No+Poster"}
                            alt={`${movie.title} poster`}
                            className="movie-detail__poster"
                        />
                    </div>

                    {/* Info panel */}
                    <div className="movie-detail__info">
                        <div className="movie-detail__badges">
                            {movie.genres?.map((g) => (
                                <span key={g} className="movie-detail__genre-badge">{g}</span>
                            ))}
                        </div>

                        <h1 className="movie-detail__title">{movie.title}</h1>

                        <div className="movie-detail__meta">
                            <span className="movie-detail__year">{movie.releaseDate}</span>
                            <span className="movie-detail__separator">·</span>
                            <span className="movie-detail__imdb">
                IMDb: <strong>{movie.imdbId}</strong>
              </span>
                        </div>

                        {/* Trailer button */}
                        {movie.trailerLink && (
                            <a
                                href={movie.trailerLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="movie-detail__trailer-btn"
                            >
                                ▶ Watch Trailer
                            </a>
                        )}

                        {/* Backdrops strip */}
                        {movie.backdrops?.length > 0 && (
                            <div className="movie-detail__backdrops">
                                {movie.backdrops.slice(0, 4).map((url, i) => (
                                    <img key={i} src={url} alt={`backdrop ${i + 1}`} className="movie-detail__backdrop-thumb" />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Reviews section ── */}
                <section className="movie-detail__reviews">
                    <h2 className="movie-detail__reviews-heading">
                        Reviews
                        <span className="movie-detail__review-count">
              {reviews.length}
            </span>
                    </h2>

                    {/* Submit new review */}
                    <ReviewForm imdbId={movie.imdbId} onReviewAdded={handleReviewAdded} />

                    {/* Existing reviews */}
                    <div className="movie-detail__review-list">
                        <ReviewList reviews={reviews} />
                    </div>
                </section>
            </div>
        </div>
    );
}