const Movie = require("../models/Movie");

const Query = {
  movies: async (_, args) => {
    try {
      let filter = { ...args };
      if (args.title) {
        filter = {
          ...filter,
          title: { $regex: args.title, $options: "i" },
        };
      }
      const movies = await Movie.find(filter).populate("genre");
      return movies;
    } catch (err) {
      throw new Error(err);
    }
  },
  movieById: async (_, { id }) => {
    try {
      const movie = await Movie.findById(id).populate("genre");
      if (movie) {
        return movie;
      } else {
        throw new Error("Movie not found");
      }
    } catch (err) {
      throw new Error(err);
    }
  },
};

const Mutation = {
  createMovie: async (_, { input }, context) => {
    try {
      const newMovie = new Movie(input);
      const movie = await newMovie.save();
      const populatedMovie = await Movie.populate(movie, { path: "genre" });
      // context.pubsub.publish("NEW_MOVIE", {
      //   newMovie: populatedMovie,
      // });
      return populatedMovie;
    } catch (err) {
      throw new Error(err);
    }
  },

  updateMovie: async (_, { id, input }, context) => {
    try {
      const updateMovie = await Movie.findByIdAndUpdate(
        id,
        { $set: input },
        { new: true }
      ).populate("genre");
      // context.pubsub.publish("UPDATE_MOVIE", {
      //   updateMovie,
      // });
      return updateMovie;
    } catch (err) {
      throw new Error(err);
    }
  },
  deleteMovie: async (_, { id }) => {
    try {
      const deleteMovie = await Movie.findByIdAndDelete(id);
      return "Delete Movie successfully!";
    } catch (err) {
      throw new Error(err);
    }
  },
};

// const Subscription = {
//   newMovie: {
//     subscribe: (_, __, { pubsub }) => pubsub?.asyncIterator("NEW_MOVIE"),
//   },
//   updateMovie: {
//     subscribe: (_, __, { pubsub }) => pubsub?.asyncIterator("UPDATE_MOVIE"),
//   },
// };

module.exports = {
  Query,
  Mutation,
  // Subscription,
};
