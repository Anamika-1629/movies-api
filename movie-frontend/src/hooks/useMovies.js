// src/hooks/useMovies.js
// Custom hook — fetches the full movie list once and stores it in state.
// Any component that needs the movie list can call this hook.

import { useState, useEffect } from "react";
import api from "../api/axiosConfig";

export function useMovies() {
    const [movies, setMovies]   = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(null);

    useEffect(() => {
        let cancelled = false; // prevents state update if component unmounts mid-fetch

        async function fetchMovies() {
            try {
                const { data } = await api.get("/api/v1/movies");
                if (!cancelled) setMovies(data);
            } catch (err) {
                if (!cancelled) setError(err.message || "Failed to load movies");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchMovies();
        return () => { cancelled = true; };
    }, []);

    return { movies, loading, error };
}

// ─── Fetch a single movie by imdbId ──────────────────────────────
export function useMovie(imdbId) {
    const [movie, setMovie]     = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(null);

    useEffect(() => {
        if (!imdbId) return;
        let cancelled = false;

        async function fetchMovie() {
            try {
                setLoading(true);
                const { data } = await api.get(`/api/v1/movies/imdb-${imdbId}`);
                if (!cancelled) setMovie(data);
            } catch (err) {
                if (!cancelled) setError(err.message || "Movie not found");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchMovie();
        return () => { cancelled = true; };
    }, [imdbId]);

    return { movie, loading, error };
}