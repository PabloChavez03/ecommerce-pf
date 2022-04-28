const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("carrito", { 
        id_carrito: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey:true,
            unique: true
        },
        carrito_product: {
            type: DataTypes.JSON,
            allowNull: true,
        },
    },{ timestamps: false })
};