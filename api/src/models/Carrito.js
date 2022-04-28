const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("Carrito", { 
        id_carrito: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey:true,
            unique: true
        },
        id_product: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },{ timestamps: false })
};