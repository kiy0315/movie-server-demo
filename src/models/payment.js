module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ticket_id: {
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

  Payment.associate = function (models) {
    Payment.belongsTo(models.Ticket, {
      foreignKey: "ticket_id",
      targetKey: "id", // Ticket 모델의 Primary Key
    });
  };

  return Payment;
};
