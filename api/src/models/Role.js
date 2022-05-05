const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Role",
    {
      id: {
        type: DataTypes.UUID(),
        defaultValue: DataTypes.UUIDV4(),
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(),
        unique: true,
        allowNull: true,  
      },
    },
    { timestamps: false }
  );
};
