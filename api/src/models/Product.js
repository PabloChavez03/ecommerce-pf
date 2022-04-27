const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo

	sequelize.define(
		"product",
		{
			id: {
				// ProductId
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				primaryKey: true,
			},
			name: {
				// DisplayName
				type: DataTypes.STRING,
				allowNull: false,
			},
			image: {
				// DefaultProductImage
				type: DataTypes.STRING,
				allowNull: false,
			},
			originalPrice: {
				// OriginalPrice
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			offertPrice: {
				// ListPrice
				type: DataTypes.FLOAT,
				allowNull: true,
			},

			/** La información de aquí para abajo llegará con la llamada al endpoint de detail
			 * 	así se tiene mejor rendimiento en el Home ya que no se llama toda la
			 * 	información desde allí, sino cuando se necesite dentro de los detalles del producto
			 */

			// description: {
			// 	// Description
			// 	type: DataTypes.TEXT,
			// 	allowNull: true,
			// },

			// variants: {
			// 	type: DataTypes.ARRAY(DataTypes.JSON),
			// 	allowNull: true,

			// 	// "Variants": [{
			// // 			"ColorId":"01"
			// // 			"ColorName":"LIME/BROWN"
			// // 			"HasVideo":false
			// // 			"ImageFileName":NULL
			// // 			"ImageFolders":NULL
			// // 			"IsDefault":false
			// // 			"ListPrice":NULL
			// // 			"OriginalPrice":NULL
			// // 			"Sizes":[{
			// // 						"Available":true
			// // 						"AvailableBOPIS":false
			// // 						"FinalSale":NULL
			// // 						"LowStockMessage":NULL
			// // 						"Price":7.99
			// // 						"SizeId":"1"
			// // 						"SizeName":"ONE SIZE"
			// // 			}]
			// // 			"ProductImages":[5 items
			// // 					"https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dwbe14d722/1_front_750/00457395-01.jpg"
			// // 					"https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dwbe14d722/1_front_750/00457395-01.jpg"
			// // 					"https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dwf4c131e6/2_side_750/00457395-01.jpg"
			// // 					"https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dwe8b45e85/3_back_750/00457395-01.jpg"
			// // 					"https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dw1918639b/7_additional_750/00457395-01.jpg"
			// // 			]
			// // 			"SwatchImage":"https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dwe6cc61bb/sw_22/00457395-01.jpg"
			// // 	}]
			// },
		},
		{
			timestamps: false,
		},
	);
};
