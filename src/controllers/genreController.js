const db = require("../models");
const Genre = db.Genre;
const { StatusCodes } = require("http-status-codes");

const createGenre = async (req, res) => {
  const { title } = req.body;
  try {
    const genre = await Genre.create({ title });
    console.log('Genre created:', genre);
    return res.status(StatusCodes.CREATED).json(genre);
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

const getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.findAll();
    if (genres.length === 0) {
      return res.status(StatusCodes.NO_CONTENT).end(); // 204 No Content
    }
    return res.status(StatusCodes.OK).json(genres);
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

const deleteGenre = async (req, res) => {
  let genreId = req.params.genreId;
  genreId = parseInt(genreId);
  try {
    const genre = await Genre.destroy({
      where: { id: genreId },
    });

    if (genre === 0) return res.status(StatusCodes.NOT_FOUND).end();

    return res.status(StatusCodes.OK).json({
      message: "Genre deleted successfully",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

module.exports = { createGenre, getAllGenres, deleteGenre };
