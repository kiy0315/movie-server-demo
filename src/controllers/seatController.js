const db = require("../models");
const Seat = db.Seat;
const { StatusCodes } = require("http-status-codes");

const createTheater = async (req, res) => {
  try {
    const theather = await Theater.create(req.body);
    return res.status(StatusCodes.CREATED).json(theather);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
    });
  }
};

const getAllTheater = async (req, res) => {
  try {
    const theaters = await Theater.findAll();

    if (theaters.length === 0) {
      return res.status(StatusCodes.NO_CONTENT).end();
    }

    return res.status(StatusCodes.OK).json(theaters);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
    });
  }
};
