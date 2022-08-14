const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  ratings: { type: Number || Boolean, required: true },
  release_date: { type: String, required: true },
});

const MovieModel = mongoose.model("movie", movieSchema);

module.exports = MovieModel;
