const express = require("express");
const {
  createSchedule,
  getAllSchedule,
  deleteSchedule,
} = require("../controllers/scheduleController");
const { verifyToken } = require("../middlewares/jwtMiddleware");

const router = express.Router();

router.use(express.json());
router.use(verifyToken);

router.post("/", createSchedule);

router.get("/", getAllSchedule);

router.delete("/:scheduleId", deleteSchedule);
module.exports = router;
