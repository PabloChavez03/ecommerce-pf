async function adaptProducts({ navigation }) {
	return await navigation.map((genre) => {
		return {
			title: genre.content.title,
			categories: genre.children[4].children.map((subcat) => {
				return {
					title: subcat.content.title,
					subcategories: subcat.children[1].children.map((el) => {
						return {
							id: el.link.categoryId,
							title: el.content.title,
						};
					}),
				};
			}),
		};
	});
}

module.exports = adaptProducts;

// {
// 	navigation: [ // 2 categorias (man, women)
// 		{
// 			content: {
// 				title: "Man",
// 			},
// 			children: [
// 				{
// 					//4
// 					content: {
// 						title: "Categories",
// 					},
// 					children: [
// 						//3 en adelante
// 						{
// 							content: {
// 								title: "Clothing",
// 							},
// 							children: [
// 								// 1
// 								{
// 									content: {
// 										title: "SHOP BY PRODUCT",
// 									},
// 									children: [
// 										{
// 											content: {
// 												title: ""
// 											},
// 											link: {
// 												categoryId: 000
// 											}
// 										}
// 									]
// 								},
// 							],
// 						},
// 					],
// 				},
// 			],
// 		},
// 	];
// }
