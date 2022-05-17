const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Users",
    {
      user_name: {
        type: DataTypes.STRING(),
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      user_password: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(),
        allowNull: true,
        unique: true,
      },
      legajo_user: {
        type: DataTypes.BIGINT(),
        allowNull: true,
        unique: true,
      },
      dni_client: {
        type: DataTypes.BIGINT(),
        allowNull: true,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(),
        allowNull: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(),
        allowNull: true,
      },
      lastname: {
        type: DataTypes.STRING(),
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING(),
        allowNull: true,
      },
      googleId: {
        type: DataTypes.STRING(),
        allowNull: true,
      },
      isRegistered: {
        type: DataTypes.BOOLEAN(),
        allowNull: true,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
