import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// https://www.omdbapi.com/?apikey=2d4765cd&s=sun&type=movie
const apiKey = "70371f99";
const baseUrl = `http://www.omdbapi.com/?apikey=${apiKey}`;

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (params) => {
    console.log("Fetching movies with params:", params);
    const response = await axios.get(
      `${baseUrl}&s=${params.query}&type=${params.type}`
    );
    console.log("API response:", response.data);
    return response.data.Search || [];
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    series: [],
    status: "idle",
    error: null,
    filters: {
      title: "sun",
      year: ""
    }
  },
  reducers: {
    setTitleFilter: (state, action) => {
      state.filters.title = action.payload;
    },
    setYearFilter: (state, action) => {
      state.filters.year = action.payload;
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
      });
  }
});

export const { setTitleFilter, setYearFilter } = movieSlice.actions;

export default movieSlice.reducer;