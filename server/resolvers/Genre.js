const Genre = require("../models/Genre");

const Query = {
  genres: async () => {
    try {
      const genre = await Genre.find();
      return genre;
    } catch (err) {
      throw new Error(err);
    }
  },
  genreById: async (_, { id }) => {
    try {
      const genre = await Genre.findById(id);
      if (genre) {
        return genre;
      } else {
        throw new Error("Genre not found");
      }
    } catch (err) {
      throw new Error(err);
    }
  },
};

const Mutation = {
  createGenre: async (_, { input }) => {
    try {
      const newGenre = new Genre(input);
      const genre = await newGenre.save();
      return genre;
    } catch (err) {
      throw new Error(err);
    }
  },

  updateGenre: async (_, { id, input }, context) => {
    try {
      const updateGenre = await Genre.findByIdAndUpdate(
        id,
        { $set: input },
        { new: true }
      );
      return updateGenre;
    } catch (err) {
      throw new Error(err);
    }
  },
  deleteGenre: async (_, { id }) => {
    try {
      const deleteGenre = await Genre.findByIdAndDelete(id);
      return "Delete genre successfully!";
    } catch (err) {
      throw new Error(err);
    }
  },
};

module.exports = {
  Query,
  Mutation,
};
