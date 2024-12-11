const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Payment = require("./payment");

const Ticket = sequelize.define(
  "Ticket",
  {
    // 속성 정의
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    schedule_id: {
      //One TO Many 관계
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      // One To Many 관계
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "ticket", // 실제 테이블 이름
    timestamps: false,
  }
);

Ticket.hasOne(Payment, {
  foreignKey: "ticket_id",
  sourceKey: "id", // Ticket 모델의 Primary Key
});

module.exports = Ticket;
