async function adaptProducts({ navigation }) {
	const [men, women] = navigation.map((el) => el);

	const menCategories = men.children[4].children
		.map((category) => category.children[1])
		.map((el) => el.children)
		.flatMap((el) => el)
		.map((el) => {
			return {
				id: el.link.categoryId,
				title: el.content.title,
				genre: "men",
			};
		});

	const womenCategories = women.children[4].children
		.map((category) => category.children[1])
		.map((el) => el.children)
		.flatMap((el) => el)
		.map((el) => {
			return {
				id: el.link.categoryId,
				title: el.content.title,
				genre: "women",
			};
		});

	return [...menCategories, ...womenCategories];
}

module.exports = adaptProducts;

// id: genre.children[4].
// 			genre: genre.content.title
// 			title: genre.content.title,
// 			categories: genre.children[4].children.map((subcat) => {
// 				return {
// 					title: subcat.content.title,
// 					subcategories: subcat.children[1].children.map((el) => {
// 						return {
// 							id: el.link.categoryId,
// 							title: el.content.title,
// 						};
// 					}),
// 				};
// 			}),

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
