const express = require("express");
const {
  createPayment,
  getAllPaymentByUserId,
  updatePaymentById,
  deletePaymentById,
  getPaymentDetailById,
} = require("../controllers/paymentController");
const { verifyToken } = require("../middlewares/jwtMiddleware");

const router = express.Router();

router.use(express.json());
router.use(verifyToken);

router.post("/", createPayment);
router.get("/", getAllPaymentByUserId);
router.put("/:paymentId", updatePaymentById);
router.delete("/:paymentId", deletePaymentById);
module.exports = router;
