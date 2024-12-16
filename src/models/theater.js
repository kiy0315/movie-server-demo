module.exports = (sequelize, DataTypes) => {
  const Theater = sequelize.define(
    "Theater",
    {
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
      max_seat: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "theater", // 실제 테이블 이름
      timestamps: false,
    }
  );

  Theater.associate = function (models) {
    Theater.hasMany(models.Seat, {
      foreignKey: "theater_id", // foreign key 설정
      sourceKey: "id", // Theater 모델의 primary key
    });

    Theater.hasMany(models.Schedule, {
      foreignKey: "schedule_fk_theater_id",
      sourceKey: "id",
    });
  };

  return Theater;
};
