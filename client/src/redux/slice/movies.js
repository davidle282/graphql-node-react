import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieList: null,
  movieDetails: null,
};

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovieList: (state, action) => {
      state.movieList = action.payload;
    },
    setMovieDetails: (state, action) => {
      state.movieDetails = action.payload;
    },
  },
});

export const { actions } = movieSlice;
export const selectMovieList = (state) => state.movies.movieList;
export const selectMovieDetails = (state) => state.movies.movieDetails;

export default movieSlice.reducer;
