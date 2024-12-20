module.exports = (sequelize, DataTypes) => {
  const UserPaymentDetails = sequelize.define(
    "UserPaymentDetails",
    {
      payment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.BOOLEAN,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      ticket_id: {
        type: DataTypes.INTEGER,
      },
      seat_count: {
        type: DataTypes.INTEGER,
      },
      schedule_id: {
        type: DataTypes.INTEGER,
      },
      start_time: {
        type: DataTypes.STRING,
      },
      end_time: {
        type: DataTypes.STRING,
      },
      movie_id: {
        type: DataTypes.INTEGER,
      },
      movie_title: {
        type: DataTypes.STRING,
      },
      running_time: {
        type: DataTypes.INTEGER,
      },
      genre_name: {
        type: DataTypes.STRING,
      },
      rating_age_limit: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "user_payment_details", // View 이름
      timestamps: false,
    }
  );

  return UserPaymentDetails;
};
