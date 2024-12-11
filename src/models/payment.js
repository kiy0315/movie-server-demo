const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Ticket = require("./ticket");

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ticket_id: {
      // One To One 관계
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    tableName: "payment",
    timestamps: false,
  }
);
Payment.belongsTo(Ticket, {
  foreignKey: "ticket_id",
  targetKey: "id", // Ticket 모델의 Primary Key
});
module.exports = Payment;
