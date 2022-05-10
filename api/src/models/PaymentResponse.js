const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("PaymentResponse", { 
       payment_id: {
            type:DataTypes.INTEGER(),
            allowNull:false,
            primaryKey: true,
            unique: true
        },
        status: {
            type: DataTypes.STRING(),
            },
    },{ timestamps: false})
};