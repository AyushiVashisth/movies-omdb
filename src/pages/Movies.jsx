import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovies,
  setTitleFilter,
  setYearFilter,
  clearSelectedMovie,
  fetchMovieDetails
} from "../redux/movieSlice";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/Movies.css";
import MovieDetails from "../components/MovieDetails";

const Movies = () => {
  const dispatch = useDispatch();
  const { movies, status, error, filters, selectedMovie } = useSelector(
    (state) => state.movies
  );
  const [sortBy, setSortBy] = useState("asc");
  const [titleFilter, setTitleFilterLocal] = useState(filters.title);
  const [yearFilter, setYearFilterLocal] = useState(filters.year);
  let debounceTimeout = null;

  useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  const debounceSearch = (func, delay) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    debounceTimeout = setTimeout(func, delay);
  };

  const handleTitleChange = (e) => {
    const { value } = e.target;
    setTitleFilterLocal(value);
    debounceSearch(() => {
      dispatch(setTitleFilter(value));
      dispatch(fetchMovies({ query: value, type: "movie" }));
    }, 1000); 
  };

  const handleYearChange = (e) => {
    const { value } = e.target;
    setYearFilterLocal(value);
    debounceSearch(() => {
      dispatch(setYearFilter(value));
      dispatch(fetchMovies({ query: filters.title, type: "movie" }));
    }, 1000); 
  };

  const toggleSort = () => {
    const newSortBy = sortBy === "asc" ? "desc" : "asc";
    setSortBy(newSortBy);
  };

  const sortedMovies = [...movies].sort((a, b) => {
    if (sortBy === "asc") {
      return parseInt(a.Year) - parseInt(b.Year);
    } else {
      return parseInt(b.Year) - parseInt(a.Year);
    }
  });

  const filteredMovies = sortedMovies.filter(
    (movie) => yearFilter === "" || movie.Year === yearFilter
  );

  const handleMovieClick = (movieId) => {
    dispatch(fetchMovieDetails(movieId));
  };

  const handleCloseDetails = () => {
    dispatch(clearSelectedMovie());
  };

  return (
    <div className="movies-container">
      <div className="filters">
        <input
          type="text"
          placeholder="Filter by title..."
          value={titleFilter}
          onChange={handleTitleChange}
        />
        <input
          type="text"
          placeholder="Filter by year..."
          value={yearFilter}
          onChange={handleYearChange}
        />
        <button onClick={toggleSort}>
          Sort by Year ({sortBy === "asc" ? "Ascending" : "Descending"})
        </button>
      </div>
      {status === "loading" && (
        <SkeletonTheme color="#202020" highlightColor="#444">
          <div className="skeleton-container">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="skeleton-item">
                <Skeleton circle={true} height={40} width={40} />
                <Skeleton height={20} width={`80%`} style={{ marginTop: 10 }} />
                <Skeleton height={20} width={`60%`} />
                <Skeleton height={20} width={`90%`} />
                <Skeleton height={20} width={`75%`} />
              </div>
            ))}
          </div>
        </SkeletonTheme>
      )}
      {status === "succeeded" && filteredMovies.length === 0 && (
        <div className="no-results">
          <p>No results found.</p>
        </div>
      )}
      {status === "succeeded" && filteredMovies.length > 0 && (
        <div className="results-container">
          {filteredMovies.map((movie) => (
            <div
              key={movie.imdbID}
              className="movie-item"
              onClick={() => handleMovieClick(movie.imdbID)} 
            >
              <img src={movie.Poster} alt={movie.Title} />
              <h2>{movie.Title}</h2>
              <p>{movie.Year}</p>
            </div>
          ))}
        </div>
      )}
      {status === "failed" && <p>{error}</p>}

      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};

export default Movies;
