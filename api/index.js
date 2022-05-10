//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
// const setDDBBproducts = require("./src/controllers/productsDbSetter");

const setDDBBcategories = require("./src/controllers/categoriesDbSetter.js");
const getDDBBproducts = require("./src/controllers/productsDbGetter.js");
const createRoles = require("./src/controllers/createRoles.js");
const { load_chat_bot } = require("./src/controllers/chatBot.js");
//const { getAPIproducts } = require("./src/controllers/productsPost.js");

// Syncing all the models at once.
conn
	.sync({ force: false })
	.then(() => {
		server.listen(process.env.PORT || 5000, async () => {
			await load_chat_bot(); 

			// // Roles
			await createRoles();

			// // Categories
			await setDDBBcategories();

			// Men
			/** Clothing */
			await getDDBBproducts(7616);
			await getDDBBproducts(7078);
			await getDDBBproducts(4616);
			await getDDBBproducts(7617);
			await getDDBBproducts(4208);
			await getDDBBproducts(26090);
			await getDDBBproducts(3606);
			await getDDBBproducts(4910);
			await getDDBBproducts(20317);

			/** Shoes */
			await getDDBBproducts(5774);
			await getDDBBproducts(27116);
			await getDDBBproducts(5775);
			await getDDBBproducts(16329);

			/** Accessories */
			await getDDBBproducts(9265);
			await getDDBBproducts(6517);
			await getDDBBproducts(11854);
			await getDDBBproducts(6520);
			await getDDBBproducts(6516);
			await getDDBBproducts(19855);

			// Women
			/** Clothing */
			await getDDBBproducts(8799);
			await getDDBBproducts(4169);
			await getDDBBproducts(9263);
			await getDDBBproducts(11318);
			await getDDBBproducts(26091);
			await getDDBBproducts(11896);
			await getDDBBproducts(2641);
			await getDDBBproducts(2640);
			await getDDBBproducts(2639);
			await getDDBBproducts(7657);
			await getDDBBproducts(2637);
			await getDDBBproducts(3630);

			/** Shoes */
			await getDDBBproducts(6455);
			await getDDBBproducts(17170);
			await getDDBBproducts(6459);
			await getDDBBproducts(6461);
			await getDDBBproducts(6458);
			await getDDBBproducts(6456);

			/** Accessories */
			await getDDBBproducts(8730);
			await getDDBBproducts(6448);
			await getDDBBproducts(11412);
			await getDDBBproducts(6449);
			await getDDBBproducts(4175);
			await getDDBBproducts(4545);
			await getDDBBproducts(5088);

			console.log("Listening on 3001"); // eslint-disable-line no-console
		});
	})
	.catch((e) => console.log(e));
