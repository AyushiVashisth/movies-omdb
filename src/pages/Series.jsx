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
import "../styles/Series.css";
import MovieDetails from "../components/MovieDetails";
import AOS from "aos";
import "aos/dist/aos.css";

const Series = () => {
  const dispatch = useDispatch();
  const { series, status, error, filters, selectedMovie } = useSelector(
    (state) => state.movies
  );
  const [sortBy, setSortBy] = useState("asc");
  const [titleFilter, setTitleFilterLocal] = useState(filters.title);
  const [yearFilter, setYearFilterLocal] = useState(filters.year);
  let debounceTimeout = null;

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

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
      dispatch(fetchMovies({ query: value, type: "series" }));
    }, 1000);
  };

  const handleYearChange = (e) => {
    const { value } = e.target;
    setYearFilterLocal(value);
    debounceSearch(() => {
      dispatch(setYearFilter(value));
      dispatch(fetchMovies({ query: filters.title, type: "series" }));
    }, 1000);
  };

  const toggleSort = () => {
    const newSortBy = sortBy === "asc" ? "desc" : "asc";
    setSortBy(newSortBy);
  };

  const sortedSeries = [...series].sort((a, b) => {
    if (sortBy === "asc") {
      return parseInt(a.Year) - parseInt(b.Year);
    } else {
      return parseInt(b.Year) - parseInt(a.Year);
    }
  });

  const filteredSeries = sortedSeries.filter(
    (seriesItem) => yearFilter === "" || seriesItem.Year === yearFilter
  );

  const handleSeriesClick = (seriesId) => {
    dispatch(fetchMovieDetails(seriesId));
  };

  const handleCloseDetails = () => {
    dispatch(clearSelectedMovie());
  };

  return (
    <div className="series-container">
      <div className="filters" data-aos="fade-down">
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
              <div key={index} className="skeleton-item" data-aos="fade-up">
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
      {status === "succeeded" && filteredSeries.length === 0 && (
        <div className="no-results" data-aos="fade-up">
          <p>No results found.</p>
        </div>
      )}
      {status === "succeeded" && filteredSeries.length > 0 && (
        <div className="results-container" data-aos="fade-up">
          {filteredSeries.map((seriesItem) => (
            <div
              key={seriesItem.imdbID}
              className="series-item"
              onClick={() => handleSeriesClick(seriesItem.imdbID)}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <img src={seriesItem.Poster} alt={seriesItem.Title} />
              <h2>{seriesItem.Title}</h2>
              <p>{seriesItem.Year}</p>
            </div>
          ))}
        </div>
      )}
      {status === "failed" && <p>{error}</p>}

      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={handleCloseDetails}
          data-aos="fade-up"
        />
      )}
    </div>
  );
};

export default Series;
