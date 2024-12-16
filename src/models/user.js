module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      provider: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false, // createdAt, updatedAt 컬럼을 비활성화
    }
  );

  User.associate = function (models) {
    User.hasMany(models.Ticket, { foreignKey: "user_id", sourceKey: "id" });
  };

  return User;
};
