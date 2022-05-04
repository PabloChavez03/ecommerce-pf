const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"Category",
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				unique: true,
				primaryKey: true,
			},
			title: {
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
