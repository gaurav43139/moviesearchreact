import React, { useState, useEffect } from "react";
import MovieModal from "./MovieModal";
import './App.css'

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchMovies = async (query ) => {
    if (query.length===0){
      alert(`Please enter name`)
      return
    }
    // const url = query === "popular"
    //   ? `http://www.omdbapi.com/?s=batman&apikey=4f858421`
    //   : `http://www.omdbapi.com/?s=${query}&apikey=4f858421`;
    const url=`http://www.omdbapi.com/?s=${query}&apikey=4f858421`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.Search || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(searchTerm);
  };

  return (
    <div className="app">
      <h1>Movie Search App</h1>
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="movie-list">
        {movies.map((movie) => (
          <div
            className="movie-item"
            key={movie.imdbID}
            onClick={() => setSelectedMovie(movie.imdbID)}
          >
            {movie.Title} ({movie.Year})
            {/* {`${movie.Title} (${movie.Year})`} */}
          </div>
        ))}
      </div>

      {selectedMovie && (
        <MovieModal movieId={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
};

export default App;
