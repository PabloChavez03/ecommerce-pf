const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "chat_bot_receptor",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        },
    );
};
