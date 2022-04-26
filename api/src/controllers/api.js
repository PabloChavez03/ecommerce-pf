const axios = require("axios");
const { optionsCategoriesList } = require("./index");

/** Haciendo una peticion usando limit */

const getInfoApi = () => {
  return axios
    .request(optionsCategoriesList)
    .then((response) => response.data.menuItemList[0].ChildMenus)
    .catch((error) => console.log(error));
};

const getAllCategoriesMain = async () => {
  const listCategories = await getInfoApi();
  return listCategories?.map((el) => {
    return {
      name: el.Category,
      depth: el.Depth, //inicia de depth: 2 ya que el depth: 1 es el storefront osea el contenedor gral
      childMenus: el.ChildMenus?.map((el) => {
				return {
          name: el.Category,
          depth: el.Depth,
          childMenus: el.ChildMenus?.map((el) => {
            return {
              name: el.Category,
              depth: el.Depth,
              // childMenus: el.ChildMenus,
            };
          }),
        };
			})
    };
  });
};

getAllCategoriesMain().then((data) => console.table(data));

// const getAllSubCategories = () => {
//   return getAllCategoriesMain().then((data) => {
//     allCategories = data?.map((el) => el.Category);
// 		return data?.map((el) => {
// 			return {
// 				name : el.Category,
// 				depth: el.Depth,
// 				childMenus: el.ChildMenus?.map((el) => el)
// 			}
// 		})
//   });
// };

// getAllSubCategories().then((data) => console.table(data))

module.exports = {
  getAllCategoriesMain,
};
