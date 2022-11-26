const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    genres: [Genre!]!
    genreById(id: String!): Genre
    movies(title: String, genreId: String): [Movie!]!
    movieById(id: String!): Movie
  }

  type Mutation {
    createGenre(input: CreateGenreInput!): Genre!
    updateGenre(id: String!, input: UpdateGenreInput!): Genre!
    deleteGenre(id: String!): String!

    createMovie(input: CreateMovieInput!): Movie!
    updateMovie(id: String!, input: UpdateMovieInput!): Movie!
    deleteMovie(id: String!): String!
  }

  input CreateGenreInput {
    name: String!
    description: String
    image: String
  }

  input UpdateGenreInput {
    name: String
    description: String
    image: String
  }

  input CreateMovieInput {
    title: String!
    description: String
    year: Int
    director: String!
    stars: String!
    genreId: String!
    image: String
  }

  input UpdateMovieInput {
    title: String!
    description: String
    year: Int
    director: String
    stars: String
    genreId: String
    image: String
  }

  type Genre {
    id: String!
    name: String!
    description: String
    image: String
  }

  type Movie {
    id: String!
    title: String!
    description: String
    year: Int
    director: String!
    stars: String!
    genreId: String!
    genre: Genre
    image: String
  }

  # type Subscription{
  #   newMovie: Movie!
  #   updateMovie: Movie!
  # }
`;

module.exports = typeDefs;
