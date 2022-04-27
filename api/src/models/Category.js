const { DataTypes } = require("sequelize");

/* Category name -> category id
    1. Women → women_main
    2. Plus + Curve → plus_size_main
    3. Accesories → accessories_nav_alias
    4. Swim → swimwear_all
    5. Activewear → activewear_nav
    6. Men → mens_main
    7. Girls → girls_main
    8. Collections → f21_collections_nav
    9. Sale → sale
 */

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
			name: {
				// Name
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
		},
		{
			timestamps: false,
		},
	);
};
