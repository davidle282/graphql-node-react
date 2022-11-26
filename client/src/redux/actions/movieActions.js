import { useDispatch, useSelector } from "react-redux";
import { apolloClient } from "../../graphql/apolloClient";
import {
  CREATE_MOVIE,
  DELETE_MOVIE,
  GET_MOVIES,
  GET_MOVIE_DETAILS,
  UPDATE_MOVIE
} from "../../graphql/movies";
import { actions, selectMovieDetails, selectMovieList } from "../slice/movies";

export default function useGenres() {
  const dispatch = useDispatch();
  const movieList = useSelector(selectMovieList);
  const movieDetails = useSelector(selectMovieDetails);

  const getMovieList = async (filter) => {
    const response = await apolloClient.query({
      query: GET_MOVIES,
      variables: { ...filter },
    });
    dispatch(actions.setMovieList(response.data.movies));
  };

  const getMovieDetails = async (id) => {
    const response = await apolloClient.query({
      query: GET_MOVIE_DETAILS,
      variables: { id },
    });
    dispatch(actions.setMovieDetails(response.data.movieById));
  };

  const createMovie = async (input) => {
    const response = await apolloClient.mutate({
      mutation: CREATE_MOVIE,
      variables: { input },
    });
    if (response?.data?.createMovie) {
      dispatch(actions.setMovieList([...movieList, response.data.createMovie]));
    }
  };

  const updateMovie = async (id, input) => {
    const response = await apolloClient.mutate({
      mutation: UPDATE_MOVIE,
      variables: { id, input },
    });
    if (response?.data?.updateMovie) {
      const newList = [...movieList];
      const index = newList.findIndex((item) => item.id === id);
      newList[index] = response?.data?.updateMovie;
      dispatch(actions.setMovieList(newList));
    }
  };

  const deleteMovie = async (id) => {
    const response = await apolloClient.mutate({
      mutation: DELETE_MOVIE,
      variables: { id },
    });
    const newList = movieList.filter((item) => item.id !== id);
    dispatch(actions.setMovieList(newList));
  };

  return {
    getMovieList,
    getMovieDetails,
    createMovie,
    updateMovie,
    deleteMovie,
    movieList,
    movieDetails,
  };
}
