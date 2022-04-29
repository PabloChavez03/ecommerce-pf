const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"Category",
		{
			id: {
				// Category
				type: DataTypes.INTEGER,
				allowNull: false,
				unique: true,
				primaryKey: true,
			},
			title: {
				// Name
				type: DataTypes.STRING,
				allowNull: false,
			},
			genre: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			timestamps: false,
		},
	);
};
