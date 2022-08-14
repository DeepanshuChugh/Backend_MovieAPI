const express = require("express");
const connection = require("./config");
const MovieModel = require("./movie.module");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});

app.post("/postmovie", async (req, res) => {
  const movieData = new MovieModel(req.body);
  await movieData.save();
  console.log("Data saved Successfully");
  res.send(movieData);
});

// Filter by id, ratings, title >>> in QUERY >>> Case Insenstive
app.get("/movies", async (req, res) => {
  const { title, ratings, id } = req.query;
  console.log("title", title);
  console.log("ti", ratings);
  if (title || ratings || id) {
    const findMovie = await MovieModel.find(
      {
        $or: [
          { ratings: ratings },
          { id: id },
          {
            title: { $regex: `^${title}$`, $options: "i" },
          },
        ],
      },
      { __v: 0, _id: 0 }
    );
    if (findMovie.length === 0) {
      return res.send("NO DATA FOUND");
    }
    console.log(findMovie);
    return res.send(findMovie);
  }
  return res.send("Invalid Query");
});

// Regex Searching

app.get("/movies/all", async (req, res) => {
  const { q } = req.query;
  const data = await MovieModel.find({ title: { $regex: q, $options: "i" } });
  res.send(data);
});

// Sorting
app.get("/movies/sort", async (req, res) => {
  const { sortBy, feild } = req.query;
  const data = await MovieModel.find().sort({
    [feild]: sortBy == "asc" ? 1 : "dsc" ? -1 : null,
  });
  res.send(data);
});

app.listen(8000, async () => {
  try {
    await connection;
    console.log("DB Connected");
  } catch (err) {
    console.log(err);
  }
  console.log("server connected");
});
