const express = require("express");
const { createTheater, getAllTheater, deleteTheater } = require("../controllers/theaterController");

const router = express.Router();
router.use(express.json());

router.post("/", createTheater);

router.get("/", getAllTheater);

router.delete("/:theaterId", deleteTheater);
module.exports = router;
