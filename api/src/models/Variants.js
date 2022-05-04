const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("Variants", {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			unique: true,
			primaryKey: true,
		},
		brandSize: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		isInStock: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		stock: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	});
};
