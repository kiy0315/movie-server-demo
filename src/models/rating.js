const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Movie = require("./movie");

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
    timestamps: false, // 자동으로 createdAt과 updatedAt 추가 안 함
  }
);

Rating.hasMany(Movie, {
  foreignKey: "rating_id",
  sourceKey: "id",
});

module.exports = Rating;
