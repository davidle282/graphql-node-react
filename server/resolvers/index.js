const genreResolvers = require("./Genre");
const movieResolvers = require("./Movie");

module.exports = {
  Query: {
    ...genreResolvers.Query,
    ...movieResolvers.Query,
  },
  Mutation: {
    ...genreResolvers.Mutation,
    ...movieResolvers.Mutation
  },
  // Subscription: {
  //   ...movieResolvers.Subscription
  // }
};
