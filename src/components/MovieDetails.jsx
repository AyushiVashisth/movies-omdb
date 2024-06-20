import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovieDetails } from "../redux/movieSlice";
import { ToastContainer, toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "../styles/MovieDetails.css";

const MovieDetails = ({ movieId, onClose }) => {
  const dispatch = useDispatch();
  const { selectedMovie, status, error } = useSelector((state) => state.movies);

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieDetails(movieId));
    }
  }, [dispatch, movieId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (status === "loading") {
    return (
      <div className="movie-details-overlay">
        <div className="movie-details loading">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="movie-details-overlay">
        <div className="movie-details error">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-details-overlay">
      {selectedMovie && (
        <div className="movie-details">
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
          <div>
            {" "}
            <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
          </div>

          <div className="details">
            <h2>{selectedMovie.Title}</h2>
            <p>
              <strong>Year:</strong> {selectedMovie.Year}
            </p>
            <p>
              <strong>Director:</strong> {selectedMovie.Director}
            </p>
            <p>
              <strong>Actors:</strong> {selectedMovie.Actors}
            </p>
            <p>
              <strong>Genres:</strong> {selectedMovie.Genre}
            </p>
            <p>
              <strong>Language:</strong> {selectedMovie.Language}
            </p>
            <p>
              <strong>Runtime:</strong> {selectedMovie.Runtime}
            </p>
            <p>
              <strong>Awards:</strong> {selectedMovie.Awards}
            </p>
            <p>
              <strong>Ratings:</strong>{" "}
              {selectedMovie.Ratings.map((rating, index) => (
                <span key={index} className="rating-circle">
                  {rating.Source}: {rating.Value}
                </span>
              ))}
            </p>
            <p>
              <strong>Plot:</strong> {selectedMovie.Plot}
            </p>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default MovieDetails;
