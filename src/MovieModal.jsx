import React, { useState, useEffect } from "react";

const MovieModal = ({ movieId, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const url = `http://www.omdbapi.com/?i=${movieId}&apikey=4f858421`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) return null;

  return (
    <div className="modal-overlay">
      <h2>{movieDetails.Title}</h2>
      <p><strong>Genre:</strong> {movieDetails.Genre}</p>
      <p><strong>Plot:</strong> {movieDetails.Plot}</p>
      <p><strong>Ratings:</strong> {movieDetails.imdbRating}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default MovieModal;
