module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define(
    "Schedule",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      start_time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      schedule_fk_movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      schedule_fk_theater_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "schedule",
      timestamps: false,
    }
  );

  Schedule.associate = function (models) {
    Schedule.belongsTo(models.Movie, {
      foreignKey: "schedule_fk_movie_id",
      targetKey: "id", // Movie의 Primary Key
    });

    Schedule.belongsTo(models.Theater, {
      foreignKey: "schedule_fk_theater_id",
      targetKey: "id", // Theater의 Primary Key
    });

    Schedule.hasMany(models.Ticket, {
      foreignKey: "schedule_id",
      sourceKey: "id",
    });
  };

  return Schedule;
};
