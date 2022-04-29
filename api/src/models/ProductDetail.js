const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo

	sequelize.define(
		"ProductDetail",
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				unique: true,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			info: {
				type: DataTypes.JSON,
				allowNull: false,
			},
			gender: {
				type: DataTypes.STRING,
			},
			brand: {
				type: DataTypes.STRING,
			},
			images: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				allowNull: false,
			},
			previousPrice: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			isOffertProduct: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			currentPrice: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			variants: {
				type: DataTypes.ARRAY(DataTypes.JSON),
				allowNull: true,
			},
		},
		{
			timestamps: false,
		},
	);
};
