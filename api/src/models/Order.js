const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Order",
    {
      payment_id: {
        type: DataTypes.BIGINT(),
        unique: true,
        allowNull: false,
        primaryKey: true,
      },
      orderDetails: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
      },
      total: {
        type: DataTypes.FLOAT(),
        allowNull: false,
      },
      orderDate: {
        type: DataTypes.DATE(),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(),
        allowNull: true,
      },
    },
    { timestamps: true }
  );
};
