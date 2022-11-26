import { configureStore } from "@reduxjs/toolkit";
import genreReducer from "./slice/genre";
import movieReducer from "./slice/movies";

export default configureStore({
  reducer: {
    genres: genreReducer,
    movies: movieReducer,
  },
});
