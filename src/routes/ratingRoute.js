const express = require("express");
const {
  createRating,
  getAllRatings,
  deleteRating,
} = require("../controllers/ratingController");
const router = express.Router();
router.use(express.json());

router.post("/", createRating);

router.get("/", getAllRatings);

router.delete("/:genreId", deleteRating);
module.exports = router;
