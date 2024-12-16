const db = require("../models");
const Payment = db.Payment;
const { StatusCodes } = require("http-status-codes");

const createPayment = async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    return res.status(StatusCodes.CREATED).json(payment);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
    });
  }
};

const updatePayment = async (req, res) => {
  let paymentId = req.params.id;
  paymentId = parseInt(paymentId);
  try {
    const payment = await Payment.findOne({
      where: { id: paymentId },
    });
    let status;
    if (req.body === 1) status = "completed";
    else if (req.body === 2) status = "cancel";
    else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "status code error",
      });
    }
    payment.status = status;

    await Payment.save(payment);
    return res.status(StatusCodes.OK).json(payment);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
    });
  }
};

const getPaymentByUserId = async (req, res) => {
  let userId = req.params.id;
  userId = parseInt(userId);
  try {
    const payments = await Payment.findAll({
      where: { user_id: userId },
    });
    if (payments.length === 0) return res.status(StatusCodes.NOT_FOUND).end();

    return res.status(StatusCodes.OK).json(payments);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
    });
  }
};

const deletePayment = async (req, res) => {
  let paymentId = req.params.id;
  paymentId = parseInt(paymentId);
  try {
    const payment = await Payment.destory({
      where: { id: paymentId },
    });
    if (payment === 0) return res.status(StatusCodes.NOT_FOUND).end();
    return res.status(StatusCodes.OK).json({
      message: "Payment deleted successfully",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  createPayment,
  updatePayment,
  getPaymentByUserId,
  deletePayment,
};
