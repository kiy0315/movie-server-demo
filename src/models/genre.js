const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Movie = require("./movie");

const Genre = sequelize.define(
  "Genre",
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
  },
  {
    timestamps: false, // 자동으로 createdAt과 updatedAt 추가 안 함
  }
);

Genre.hasMany(Movie, {
  foreignKey: 'genre_id',
  sourceKey: 'id',
});

module.exports = Genre;
