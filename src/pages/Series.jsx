import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovies,
  setTitleFilter,
  setYearFilter
} from "../redux/movieSlice";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/Series.css";

const Series = () => {
  const dispatch = useDispatch();
  const { series, status, error, filters } = useSelector(
    (state) => state.movies
  );
  const [sortBy, setSortBy] = useState("asc");

  useEffect(() => {
    dispatch(fetchMovies({ query: filters.title, type: "series" }));
  }, [dispatch, filters.title]);

  const handleTitleChange = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };

  const handleYearChange = (e) => {
    dispatch(setYearFilter(e.target.value));
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
    (seriesItem) => filters.year === "" || seriesItem.Year === filters.year
  );

  return (
    <div className="series-container">
      <div className="filters">
        <input
          type="text"
          placeholder="Filter by title..."
          value={filters.title}
          onChange={handleTitleChange}
        />
        <input
          type="text"
          placeholder="Filter by year..."
          value={filters.year}
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
      {status === "succeeded" && filteredSeries.length === 0 && (
        <div className="no-results">
          <p>No results found.</p>
        </div>
      )}
      {status === "succeeded" && filteredSeries.length > 0 && (
        <div className="results-container">
          {filteredSeries.map((seriesItem) => (
            <div key={seriesItem.imdbID} className="series-item">
              <img src={seriesItem.Poster} alt={seriesItem.Title} />
              <h2>{seriesItem.Title}</h2>
              <p>{seriesItem.Year}</p>
            </div>
          ))}
        </div>
      )}
      {status === "failed" && <p>{error}</p>}
    </div>
  );
};

export default Series;