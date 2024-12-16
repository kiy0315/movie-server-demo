const db = require("../models");
const Schedule = db.Schedule;
const { StatusCodes } = require("http-status-codes");

const createSchedule = async (req, res) => {
  console.log(req.body);
  const { start_time, end_time, schedule_fk_movie_id, schedule_fk_theater_id } =
    req.body;
  try {
    const schedule = await Schedule.create({
      start_time,
      end_time,
      schedule_fk_movie_id,
      schedule_fk_theater_id,
    });
    return res.status(StatusCodes.CREATED).json(schedule);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
    });
  }
};

const getAllSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findAll();

    if (schedule.length === 0) {
      return res.status(StatusCodes.NO_CONTENT).end();
    }

    return res.status(StatusCodes.OK).json(schedule);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
    });
  }
};

const deleteSchedule = async (req, res) => {
  let scheduleId = req.params.scheduleId;
  scheduleId = parseInt(scheduleId);

  try {
    const schedule = await Schedule.destroy({
      where: { id: scheduleId },
    });

    if (schedule === 0) return res.status(StatusCodes.NOT_FOUND).end();

    return res.status(StatusCodes.OK).json({
      message: "schedule deleted successfully",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  createSchedule,
  deleteSchedule,
  getAllSchedule,
};
