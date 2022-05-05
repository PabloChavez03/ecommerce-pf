const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"Cliente",
		{
			phone: {
				type: DataTypes.BIGINT(),
				allowNull: false,
				primaryKey: true,
				unique: true,
			},
			email: {
				type: DataTypes.STRING(),
				allowNull: false,
				unique: true,
			},
			login_name: {
				type: DataTypes.STRING(),
				get() {
					return this.getDataValue("login_name") === null ||
						this.getDataValue("login_name") === ""
						? "Anonymous"
						: this.getDataValue("login_name");
				},
				allowNull: true,
				unique: true,
			},
			login_password: {
				type: DataTypes.STRING(),
				allowNull: true,
				unique: false,
			},
			name: {
				type: DataTypes.STRING(),
				allowNull: false,
			},
			lastname: {
				type: DataTypes.STRING(),
				allowNull: false,
			},
			address: {
				type: DataTypes.STRING(),
				allowNull: false,
			},
			isRegistered: {
				type: DataTypes.BOOLEAN(),
				allowNull: true,
			},
		},
		{ timestamps: false },
	);
};
