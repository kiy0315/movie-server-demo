const express = require("express");
const passport = require("../passport/passport");
const { createToken } = require("../controllers/authController");
const router = express.Router();

router.use(passport.initialize());

router.get("/google", passport.authenticate("google", { scope: ["email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/auth/google",
  }),
  createToken
);

module.exports = router;
