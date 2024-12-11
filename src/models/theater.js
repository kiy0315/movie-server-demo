const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Seat = require("../models/seat");
const Schedule = require("./schedule");

const Theater = sequelize.define(
  "Theater",
  {
    // 속성 정의
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    floor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "theater", // 실제 테이블 이름
    timestamps: false,
  }
);

Theater.hasMany(Seat, {
  foreignKey: "theater_id", // foreign key 설정
  sourceKey: "id", // Theater 모델의 primary key
});

Theater.hasMany(Schedule, {
  foreignKey: "theater_id",
  sourceKey: "id",
});
module.exports = Theater;
