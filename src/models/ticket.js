module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define(
    "Ticket",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      seat_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      schedule_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "ticket", // 실제 테이블 이름
      timestamps: false,
    }
  );

  Ticket.associate = function (models) {
    Ticket.belongsTo(models.Schedule, {
      foreignKey: "schedule_id",
      targetKey: "id",
    });

    Ticket.belongsTo(models.User, {
      foreignKey: "user_id",
      targetKey: "id",
    });

    Ticket.hasOne(models.Payment, {
      foreignKey: "ticket_id",
      sourceKey: "id", // Ticket 모델의 Primary Key
    });
  };

  return Ticket;
};
