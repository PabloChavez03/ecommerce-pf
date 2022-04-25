const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define("producto", {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		colors: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		size: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		listprice: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		originalprice: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		promotion_msg: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		ispromotion: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		promotionprice: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},{ timestamps: false });
};


/*
-----------------
Codigo,
*/
