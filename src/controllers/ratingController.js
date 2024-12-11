const Rating = require("../models/rating"); // Rating 모델
const { StatusCodes } = require("http-status-codes");

const createRating = async (req, res) => {
  let { rating } = req.body;
  rating = parseInt(rating);
  try {
    const newRating = await Rating.create({ rating });
    return res.status(StatusCodes.CREATED).json(newRating);
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

const getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.findAll();
    if (ratings.length === 0) {
      return res.status(StatusCodes.NO_CONTENT).end(); // 204 No Content
    }
    return res.status(StatusCodes.OK).json(ratings);
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

const deleteRating = async (req, res) => {
  let ratingId = req.params.id;
  ratingId = parseInt(ratingId);
  try {
    const rating = await Rating.destroy({
      where: { id: ratingId },
    });

    if (rating === 0) return res.status(StatusCodes.NOT_FOUND).end();

    return res.status(StatusCodes.OK).json({
      message: "Rating deleted successfully",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

module.exports = { createRating, getAllRatings, deleteRating };
