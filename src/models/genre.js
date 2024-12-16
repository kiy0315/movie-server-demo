module.exports = (sequelize, DataTypes) => {
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
      tableName: "genre",
      timestamps: false,
    }
  );

  Genre.associate = function (models) {
    Genre.hasMany(models.Movie, {
      foreignKey: "genre_id",
      sourceKey: "id",
    });
  };

  return Genre;
};
