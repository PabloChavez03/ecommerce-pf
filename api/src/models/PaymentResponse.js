const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
      "PaymentResponse",
      {
        status: {
          type: DataTypes.STRING(),
          allowNull: true,
          primaryKey: true,
        },
        payment_id: {
          type: DataTypes.INTEGER(),
          allowNull: true,
        //   unique: true,
        },
      },
      { timestamps: false }
    );
};