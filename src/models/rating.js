module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    "Rating",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "rating",
      timestamps: false,
    }
  );

  Rating.associate = function (models) {
    Rating.hasMany(models.Movie, {
      foreignKey: "rating_id",
      sourceKey: "id",
    });
  };

  return Rating;
};
