const { StatusCodes } = require("http-status-codes");
const sequelize = require("../config/database");
const db = require("../models");
const Ticket = db.Ticket;
const Schedule = db.Schedule;
const Theater = db.Theater;
const User = db.User;
const reservationTicket = async (req, res) => {
  const { schedule_id, seat_count } = req.body;
  const userId = req.userId;
  let lock;
  let t;
  try {
    t = await sequelize.transaction();

    // 스케줄 정보를 락으로 가져오기
    const schedule = await Schedule.findOne({
      where: { id: schedule_id },
      include: [
        {
          model: Theater,
          attributes: ["max_seat"],
        },
      ],
      lock: t.LOCK.UPDATE, // 행 락
      transaction: t,
    });

    if (!schedule) {
      throw new Error(`Schedule with ID ${schedule_id} not found.`);
    }

    const totalTickets = await Ticket.sum("seat_count", {
      where: { schedule_id },
      transaction: t,
    });
    console.log("여기봐봐" + schedule.Theater.max_seat + " " + totalTickets);
    const remainingSeats = schedule.Theater.max_seat - totalTickets;
    console.log("Remaining seats:", remainingSeats);

    if (seat_count > remainingSeats) {
      await t.rollback();
      throw new Error("Sold Out");
    }

    const ticket = await Ticket.create(
      {
        seat_count,
        schedule_id,
        userId,
      },
      { transaction: t }
    );

    await t.commit();

    return res.status(StatusCodes.CREATED).json(ticket);
  } catch (error) {
    if (t) {
      await t.rollback();
    }
    console.error("Reservation failed:", error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

const getTicketById = async (req, res) => {
  let ticketId = req.params.ticketId;
  ticketId = parseInt(ticketId);

  try {
    const ticket = await Ticket.findOne({
      where: { id: ticketId },
      include: [
        {
          model: User,
          attributes: ["email"],
        },
      ],
    });
    if (!ticket) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Ticket not found",
      });
    }

    return res.status(StatusCodes.OK).json(ticket);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

const updateTicketById = async (req, res) => {
  let ticketId = req.params.ticketId;
  ticketId = parseInt(ticketId);

  try {
    const { updateSeats } = req.body;
    if (updateSeats === null || isNan(updateSeats)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Bad Request",
      });
    }

    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: `Ticket with ID ${ticketId} not found.`,
      });
    }

    ticket.seats = updateSeats;
    await ticket.save();
    return res.status(StatusCodes.OK).json({
      message: "Ticket updated successfully",
      ticket,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

const deleteTicketById = async (req, res) => {
  let ticketId = req.params.ticketId;
  ticketId = parseInt(ticketId);
  try {
    const ticket = await Ticket.destroy({
      where: { id: ticketId },
    });
    if (ticket === 0) return res.status(StatusCodes.NOT_FOUND).end();

    return res.status(StatusCodes.OK).json({
      message: "ticket deleted successfully",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

module.exports = {
  getTicketById,
  reservationTicket,
  updateTicketById,
  deleteTicketById,
};
