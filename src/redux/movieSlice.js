import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = process.env.REACT_APP_BASE_URL;

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (params) => {
    console.log("Fetching movies with params:", params);
    const response = await axios.get(
      `${baseUrl}/?apikey=${apiKey}&s=${params.query}&type=${params.type}`
    );
    console.log("API response:", response.data);
    return response.data.Search || [];
  }
);

export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async (movieId) => {
    console.log("Fetching movie details for ID:", movieId);
    const response = await axios.get(
      `${baseUrl}/?apikey=${apiKey}&i=${movieId}`
    );
    console.log("Movie details response:", response.data);
    return response.data;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    series: [],
    selectedMovie: null,
    status: "idle",
    error: null,
    filters: {
      title: "beauty",
      year: ""
    }
  },
  reducers: {
    setTitleFilter: (state, action) => {
      state.filters.title = action.payload;
    },
    setYearFilter: (state, action) => {
      state.filters.year = action.payload;
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.meta.arg.type === "movie") {
          state.movies = action.payload;
        } else if (action.meta.arg.type === "series") {
          state.series = action.payload;
        }
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchMovieDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

export const { setTitleFilter, setYearFilter, clearSelectedMovie } = movieSlice.actions;

export default movieSlice.reducer;
