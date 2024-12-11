const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Movie = require("./movie");
const Theater = require("./theater");

const Schedule = sequelize.define(
  "Schedule",
  {
    // 속성 정의
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    schedule_fk_movie_id: {
      // Many To One 관계
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    schedule_fk_theater_id: {
      // Many To One 관계
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "schedule",
    timestamps: false,
  }
);

Schedule.belongsTo(Movie, {
  foreignKey: "schedule_fk_movie_id",
  targetKey: "id", // Movie의 Primary Key
});

Schedule.belongsTo(Theater, {
  foreignKey: "schedule_fk_theater_id",
  targetKey: "id", // Theater의 Primary Key
});

module.exports = Schedule;
