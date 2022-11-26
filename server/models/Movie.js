const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  year: {
    type: Number,
  },
  director: {
    type: String,
  },
  stars: {
    type: String,
  },
  genreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "genres",
    require: true,
  },
});

MovieSchema.virtual("genre", {
  ref: "genres",
  localField: "genreId",
  foreignField: "_id",
  justOne: true,
});

MovieSchema.set("toObject", { virtuals: true });
MovieSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("movies", MovieSchema);
