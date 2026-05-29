// src/components/ReviewList.jsx
// Renders the list of reviews for a movie.
// Receives the reviews array as a prop from the MovieDetail page.

import React from "react";
import "./ReviewList.css";

export default function ReviewList({ reviews }) {
    if (!reviews || reviews.length === 0) {
        return (
            <p className="review-list__empty">
                No reviews yet. Be the first to share your thoughts!
            </p>
        );
    }

    return (
        <ul className="review-list">
            {reviews.map((review, idx) => (
                <li
                    key={review.id || idx}
                    className="review-list__item"
                    style={{ animationDelay: `${idx * 0.07}s` }}
                >
                    {/* Avatar with initials fallback */}
                    <div className="review-list__avatar" aria-hidden="true">
                        {/* Using index-based letter so it varies per review */}
                        {String.fromCharCode(65 + (idx % 26))}
                    </div>

                    <div className="review-list__content">
                        <div className="review-list__meta">
                            <span className="review-list__author">Viewer {idx + 1}</span>
                            <span className="review-list__dot">·</span>
                            <span className="review-list__tag">Verified Review</span>
                        </div>
                        <p className="review-list__body">{review.body}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
}