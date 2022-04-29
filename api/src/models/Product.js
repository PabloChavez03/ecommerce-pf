const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo

	sequelize.define(
		"Product",
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
			image: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			previousPrice: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			isOffertPrice: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			currentPrice: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			brandName: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			colour: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			timestamps: false,
		},
	);
};
