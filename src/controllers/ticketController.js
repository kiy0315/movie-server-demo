const { StatusCodes } = require("http-status-codes");
const sequelize = require("../config/database");
const db = require("../models");
const Ticket = db.Ticket;
const Schedule = db.Schedule;
const Theater = db.Theater;

const reservationTicket = async (req, res) => {
  const { schedule_id, user_id, seat_count } = req.body;

  let lock;
  let t;
  try {
    // 트랜잭션 시작
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

    console.log(schedule.Theater.max_seat); // Theater 모델의 max_seat 값

    if (!schedule) {
      throw new Error(`Schedule with ID ${schedule_id} not found.`);
    }

    console.log("Schedule locked:", schedule);

    // 예매 가능한지 확인 (Schedule 유효성 검사)
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

    // 티켓 생성
    const ticket = await Ticket.create(
      {
        seat_count,
        schedule_id,
        user_id,
      },
      { transaction: t }
    );

    // 트랜잭션 커밋
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
  let ticketId = req.params.id;
  ticketId = parseInt(ticketId);
  try {
    const ticket = await Ticket.findByPk(ticketId);
    return res.status(StatusCodes.OK).json(ticket);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

const updateTicketById = async (req, res) => {
  let ticketId = req.params.id;
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
  let ticketId = req.params.id;
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
