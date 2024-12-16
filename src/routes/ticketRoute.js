const express = require("express");
const {
  getTicketById,
  reservationTicket,
  updateTicketById,
  deleteTicketById,
} = require("../controllers/ticketController");
const { verifyToken } = require("../middlewares/jwtMiddleware");


const router = express.Router();
router.use(express.json());
router.use(verifyToken);

router.get("/:ticketId", getTicketById);
router.post("/", reservationTicket);
router.put("/:ticketId", updateTicketById);
router.delete("/:ticketId", deleteTicketById);

module.exports = router;
