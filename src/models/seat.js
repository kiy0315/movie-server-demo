module.exports = (sequelize, DataTypes) => {
  const Seat = sequelize.define(
    "Seat",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      theater_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      col_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      row_num: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "seat", // 실제 테이블 이름
      timestamps: false,
    }
  );

  Seat.associate = function (models) {
    Seat.belongsTo(models.Theater, {
      foreignKey: "theater_id", // 외래 키
      targetKey: "id", // 참조할 Theater 모델의 primary key
    });
  };

  return Seat;
};
