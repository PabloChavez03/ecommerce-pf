const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"chat_bot_emisor",
		{
			name: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			respuesta: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			isActive: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
		},
		{
			timestamps: false,
		},
	);
};
