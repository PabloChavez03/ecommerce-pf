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
				allowNull: true,
			},
			gender: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			brandName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			images: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				allowNull: false,
			},
			isInStock: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			isOffertProduct: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			previousPrice: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			currentPrice: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			color: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			variants: {
				type: DataTypes.ARRAY(DataTypes.JSON),
				allowNull: false,
			},
		},
		{
			timestamps: false,
		},
	);
};
