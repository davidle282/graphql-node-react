import { gql } from "@apollo/client";

const MOVIE_FIELDS = gql`
  fragment MovieFields on Movie {
    id
    image
    title
    description
    director
    stars
    year
    genreId
    genre {
      id
      name
    }
  }
`;

export const GET_MOVIES = gql`
  ${MOVIE_FIELDS}
  query ($title: String, $genreId: String) {
    movies(title: $title, genreId: $genreId) {
      ...MovieFields
    }
  }
`;

export const GET_MOVIE_DETAILS = gql`
  ${MOVIE_FIELDS}
  query ($id: String!) {
    movieById(id: $id) {
      ...MovieFields
    }
  }
`;

export const CREATE_MOVIE = gql`
  ${MOVIE_FIELDS}
  mutation ($input: CreateMovieInput!) {
    createMovie(input: $input) {
      ...MovieFields
    }
  }
`;

export const UPDATE_MOVIE = gql`
  ${MOVIE_FIELDS}
  mutation ($id: String!, $input: UpdateMovieInput!) {
    updateMovie(id: $id, input: $input) {
      ...MovieFields
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation ($id: String!) {
    deleteMovie(id: $id)
  }
`;
