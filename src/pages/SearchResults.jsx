import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchMovies,
  clearSelectedMovie,
  fetchMovieDetails
} from "../redux/movieSlice";
import MovieDetails from "../components/MovieDetails";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/SearchResults.css";
import { FaHandPointLeft } from "react-icons/fa";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SearchResults = () => {
  const { query } = useParams();
  const dispatch = useDispatch();
  const { movies, status, error, selectedMovie } = useSelector(
    (state) => state.movies
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      dispatch(fetchMovies({ query, type: "movie" }));
    }
    return () => {
      dispatch(clearSelectedMovie());
    };
  }, [dispatch, query]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleBack = () => {
    navigate(`/`);
  };

  const handleMovieClick = (movieId) => {
    dispatch(fetchMovieDetails(movieId));
  };

  const handleCloseDetails = () => {
    dispatch(clearSelectedMovie());
  };

  return (
    <div className="search-results">
      <div className="heading-container">
        <h1>Search Results for "{query}"</h1>
        <button className="backButton" onClick={handleBack}>
          <FaHandPointLeft className="backIcon" />
          Back
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

      {status === "succeeded" && movies.length === 0 && (
        <div className="no-results">
          <p>No results found.</p>
        </div>
      )}

      {status === "succeeded" && movies.length > 0 && (
        <div className="results-container">
          {movies.map((movie) => (
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
        <MovieDetails movie={selectedMovie} onClose={handleCloseDetails} />
      )}

      <ToastContainer />
    </div>
  );
};

export default SearchResults;
