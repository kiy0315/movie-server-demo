const express = require("express");
const {
  createMovie,
  getAllMovies,
  deleteMovie,
  getMovieById,
  getMoviesByCategory,
} = require("../controllers/movieController");
const router = express.Router();
router.use(express.json());

router.post("/", createMovie);

router.get("/", getAllMovies);
router.get("/:movieId", getMovieById);
router.get("/", getMoviesByCategory);
router.delete("/:movieId", deleteMovie);

module.exports = router;
