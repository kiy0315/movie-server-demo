const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // 위에서 설정한 sequelize 인스턴스를 가져옴

const db = {};

// Sequelize와 sequelize 인스턴스를 db 객체에 추가
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// 각 모델 불러오기
db.Genre = require("./genre")(sequelize, DataTypes);
db.Movie = require("./movie")(sequelize, DataTypes);
db.Payment = require("./payment")(sequelize, DataTypes);
db.Rating = require("./rating")(sequelize, DataTypes);
db.Schedule = require("./schedule")(sequelize, DataTypes);
db.Seat = require("./seat")(sequelize, DataTypes);
db.Theater = require("./theater")(sequelize, DataTypes);
db.Ticket = require("./ticket")(sequelize, DataTypes);
db.User = require("./user")(sequelize, DataTypes);

// 모델 간 관계 설정
db.Genre.associate(db);
db.Movie.associate(db);
db.Rating.associate(db);
db.Theater.associate(db);
db.Seat.associate(db);
db.Ticket.associate(db);
db.User.associate(db);
db.Schedule.associate(db);
db.Payment.associate(db);

// 다른 모델들의 관계 설정도 추가

// 필요한 경우, 테이블 동기화
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synced");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

module.exports = db;
