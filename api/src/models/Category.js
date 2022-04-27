const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"category",
		{
			id: {
				// Category
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				unique: true,
				primaryKey: true,
			},
			title: {
				// Name
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			categories: {
				type: DataTypes.ARRAY(DataTypes.JSONB),
				allowNull: false,
			},
		},
		{
			timestamps: false,
		},
	);
};
