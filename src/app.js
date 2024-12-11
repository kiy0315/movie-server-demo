const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/database");
const app = express();

dotenv.config({ path: "./src/config/.env" });

const movieRoute = require("./routes/movieRoute");
const genreRoute = require("./routes/genreRoute");
const ratingRoute = require("./routes/ratingRoute");
const authRoute = require("./routes/authRoute");

app.use("/auth", authRoute);
app.use("/movie", movieRoute);
app.use("/genre", genreRoute);
app.use("/rating", ratingRoute);

const port = process.env.PORT || 3333; // 기본 포트 설정

// 서버 실행 및 DB 연결
sequelize
  .sync({ force: false }) // 테이블 덮어쓰지 않도록 설정
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });