const db = require("../models");
const User = db.User;
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "./src/config/.env" });

const findOrCreateUser = async (email, provider, phone_number) => {
  const phone = phone_number || ""; // phone_number가 없으면 빈 문자열로 처리
  try {
    // findOrCreate 메서드로 사용자 조회 및 생성
    const [user, created] = await User.findOrCreate({
      where: { email, provider: provider },
      defaults: {
        email,
        phone_number: phone,
        provider,
      },
    });

    return user; // 생성된 사용자 객체 반환
  } catch (error) {
    console.error("Error in findOrCreateUser:", error);
    throw error;
  }
};

const createToken = (req, res) => {
  const user = req.user;
  const payload = {
    id: user.id,
    email: user.email,
  };
  const options = {
    subject: "user",
    expiresIn: "1h",
    issuer: process.env.JWT_ISSUER,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, options);

  res.cookie("accessToken", token);
  res.status(StatusCodes.OK).end();
};

module.exports = { findOrCreateUser, createToken };
