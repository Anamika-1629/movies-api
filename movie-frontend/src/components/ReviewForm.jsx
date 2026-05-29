// src/components/ReviewForm.jsx
// Form for submitting a new movie review.
// On submit, calls POST /api/v1/reviews with the reviewBody + imdbId.

import React, { useState } from "react";
import api from "../api/axiosConfig";
import "./ReviewForm.css";

export default function ReviewForm({ imdbId, onReviewAdded }) {
    const [body, setBody]         = useState("");
    const [loading, setLoading]   = useState(false);
    const [error, setError]       = useState(null);
    const [success, setSuccess]   = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!body.trim()) return;

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // POST to /api/v1/reviews — backend expects { reviewBody, imdbId }
            const { data } = await api.post("/api/v1/reviews", {
                reviewBody: body.trim(),
                imdbId,
            });

            setBody("");
            setSuccess(true);
            // Lift the new review up so the parent can prepend it to the list
            if (onReviewAdded) onReviewAdded(data);

            // Auto-hide success message after 3 seconds
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError("Couldn't submit your review. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="review-form">
            <h3 className="review-form__heading">Write a Review</h3>

            <form onSubmit={handleSubmit} className="review-form__form">
        <textarea
            className="review-form__textarea"
            placeholder="Share your thoughts on this film…"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            maxLength={1000}
            disabled={loading}
            aria-label="Review text"
        />

                <div className="review-form__footer">
                    <span className="review-form__char-count">{body.length} / 1000</span>

                    <button
                        type="submit"
                        className="review-form__submit"
                        disabled={loading || !body.trim()}
                    >
                        {loading ? "Submitting…" : "Post Review"}
                    </button>
                </div>
            </form>

            {/* Feedback messages */}
            {success && (
                <p className="review-form__msg review-form__msg--success">
                    ✓ Review posted successfully!
                </p>
            )}
            {error && (
                <p className="review-form__msg review-form__msg--error">
                    ✕ {error}
                </p>
            )}
        </div>
    );
}