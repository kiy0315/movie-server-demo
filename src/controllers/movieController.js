const db = require("../models");
const Movie = db.Movie;
const Genre = db.Genre;
const Rating = db.Rating;
const { StatusCodes } = require("http-status-codes");

const createMovie = async (req, res) => {
  const {
    title,
    summary,
    detail,
    running_time,
    genre_id,
    rating_id,
    country_code,
    language,
    image_url,
  } = req.body;

  try {
    const movie = await Movie.create({
      title,
      summary,
      detail,
      running_time,
      genre_id,
      rating_id,
      country_code,
      language,
      image_url,
    });

    return res.status(StatusCodes.CREATED).json(movie);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll({
      include: [
        {
          model: Genre, // Genre 모델 포함
          attributes: ["title"], // genre의 title만 포함
        },
        {
          model: Rating, // Rating 모델 포함
          attributes: ["rating"], // rating의 rating만 포함
        },
      ],
    });

    if (movies.length === 0) {
      return res.status(StatusCodes.NO_CONTENT).end();
    }

    return res.status(StatusCodes.OK).json(movies);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

const getMovieById = async (req, res) => {
  let movieId = req.params.id;
  movieId = parseInt(movieId);

  try {
    const movie = await Movie.findByPk(movieId, {
      include: [
        {
          model: Genre, // Genre 모델 포함
          attributes: ["title"], // genre의 title만 포함
        },
        {
          model: Rating, // Rating 모델 포함
          attributes: ["rating"], // rating의 rating만 포함
        },
      ],
    });

    if (!movie) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Movie not found" });
    }

    return res.status(StatusCodes.OK).json(movie);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

const getMoviesByCategory = async (req, res) => {
  const { genre_id } = req.query;

  if (!genre_id)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Genre ID is required" });

  try {
    const movies = await Movie.findAll({
      where: { genre_id: parseInt(genre_id, 10) },
      include: [
        {
          model: Genre,
          attributes: ["title"],
        },
        {
          model: Rating,
          attributes: ["rating"],
        },
      ],
    });

    if (movies.length === 0)
      return res
        .status(StatusCodes.NO_CONTENT)
        .json({ message: "No movies found" });

    return res.status(StatusCodes.OK).json(movies);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

const deleteMovie = async (req, res) => {
  let movieId = req.params.id;
  movieId = parseInt(movieId);
  try {
    const movie = await Movie.destroy({
      where: { id: movieId },
    });

    if (movie === 0) return res.status(StatusCodes.NOT_FOUND).end();

    return res.status(StatusCodes.OK).json({
      message: "Movie deleted successfully",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};
module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  getMoviesByCategory,
  deleteMovie,
};
