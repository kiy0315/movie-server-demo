const { StatusCodes } = require("http-status-codes");
const sequelize = require("../config/database");
const db = require("../models");
const Ticket = db.Ticket;
const Schedule = db.Schedule;
const Theater = db.Theater;
const User = db.User;
const reservationTicket = async (req, res) => {
  const { scheduleId, seatsToReserve } = req.body; 
  const userId = req.userId;
  let dbTransaction;
  try {
    dbTransaction = await sequelize.transaction();
    const schedule = await Schedule.findOne({
      where: { id: scheduleId },
      include: [
        {
          model: Theater,
          attributes: ["max_seat"],
        },
      ],
      lock: dbTransaction.LOCK.UPDATE, 
      transaction: dbTransaction,
    });

    if (isLocked) throw new Error(``);

    const reservedTicket = await Ticket.sum("seat_count", {
      where: { scheduleId },
      transaction: dbTransaction,
    });
    const remainingSeats = schedule.Theater.max_seat - reservedTicket;

    if (seatsToReserve > remainingSeats) {
      await dbTransaction.rollback();
      throw new Error("Sold Out");
    }

    const ticket = await Ticket.create(
      {
        seatsToReserve,
        scheduleId,
        userId,
      },
      { transaction: dbTransaction }
    );

    await t.commit();

    return res.status(StatusCodes.CREATED).json(ticket);
  } catch (error) {
    if (dbTransaction) {
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
