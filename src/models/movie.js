const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Genre = require("./genre");
const Rating = require("./rating");
const Schedule = require("./schedule");

const Movie = sequelize.define(
  "Movie",
  {
    // 속성 정의
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    running_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    country_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true, // nullable 속성
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "movies", // 실제 테이블 이름과 일치
    timestamps: false, // created_at, updated_at 자동 생성 없이 사용
  }
);

Movie.belongsTo(Genre, {
  foreignKey: "genre_id",
  targetKey: "id", // Genre 모델의 primaryKey인 id
});

Movie.belongsTo(Rating, {
  foreignKey: "rating_id",
  targetKey: "id", // Rating 모델의 primaryKey인 id
});

Movie.hasMany(Schedule, {
  foreignKey: "schedule_fk_movie_id",
  sourceKey: "id", // Movie의 Primary Key
});
module.exports = Movie;
