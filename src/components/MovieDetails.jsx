import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovieDetails } from "../redux/movieSlice";
import { ToastContainer, toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "../styles/MovieDetails.css";
import AOS from "aos";
import "aos/dist/aos.css";

const MovieDetails = ({ movieId, onClose }) => {
  const dispatch = useDispatch();
  const { selectedMovie, status, error } = useSelector((state) => state.movies);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

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
        <div className="movie-details loading" data-aos="fade-in">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="movie-details-overlay">
        <div className="movie-details error" data-aos="fade-in">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-details-overlay" >
      {selectedMovie && (
        <div className="movie-details" >
          <button
            className="close-button"
            onClick={onClose}
            data-aos="fade-left"
          >
            <FaTimes />
          </button>
          <div>
            <img
              src={selectedMovie.Poster}
              alt={selectedMovie.Title}
              data-aos="zoom-in"
            />
          </div>
          <div className="details" data-aos="fade-up">
            <h2>{selectedMovie.Title}</h2>
            <p>
              <strong data-aos="fade-up" data-aos-delay="100">
                Year:
              </strong>{" "}
              {selectedMovie.Year}
            </p>
            <p>
              <strong data-aos="fade-up" data-aos-delay="100">
                Director:
              </strong>{" "}
              {selectedMovie.Director}
            </p>
            <p>
              <strong data-aos="fade-up" data-aos-delay="100">
                Actors:
              </strong>{" "}
              {selectedMovie.Actors}
            </p>
            <p>
              <strong data-aos="fade-up" data-aos-delay="100">
                Genres:
              </strong>{" "}
              {selectedMovie.Genre}
            </p>
            <p>
              <strong data-aos="fade-up" data-aos-delay="100">
                Language:
              </strong>{" "}
              {selectedMovie.Language}
            </p>
            <p>
              <strong data-aos="fade-up" data-aos-delay="100">
                Runtime:
              </strong>{" "}
              {selectedMovie.Runtime}
            </p>
            <p>
              <strong data-aos="fade-up" data-aos-delay="100">
                Awards:
              </strong>{" "}
              {selectedMovie.Awards}
            </p>
            <p>
              <strong data-aos="fade-up" data-aos-delay="100">
                Ratings:
              </strong>{" "}
              {selectedMovie.Ratings.map((rating, index) => (
                <span
                  key={index}
                  className="rating-circle"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  {rating.Source}: {rating.Value}
                </span>
              ))}
            </p>
            <p>
              <strong data-aos="fade-up" data-aos-delay="100">
                Plot:
              </strong>{" "}
              {selectedMovie.Plot}
            </p>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default MovieDetails;
