const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"Review",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				unique: true,
				allowNull: false,
			},
			calification: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
				validate: {
					min: 0,
					max: 5,
				},
			},
			comment: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
		},
		{ timestamps: false },
	);
};
