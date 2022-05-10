require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

// const sequelize = new Sequelize(
// 	`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
// 	{
// 		logging: false, // set to console.log to see the raw SQL queries
// 		native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// 		pool: {
// 			max: 100,
// 			min: 0,
// 			acquire: 80000,
// 			idle: 10000,
// 		},
// 	},
// );

let sequelize =
	process.env.NODE_ENV === "production"
		? new Sequelize({
				database: DB_NAME,
				dialect: "postgres",
				host: DB_HOST,
				port: 5432,
				username: DB_USER,
				password: DB_PASSWORD,
				pool: {
					max: 3,
					min: 1,
					idle: 10000,
				},
				dialectOptions: {
					ssl: {
						require: true,
						// Ref.: https://github.com/brianc/node-postgres/issues/2009
						rejectUnauthorized: false,
					},
					keepAlive: true,
				},
		  })
		: new Sequelize(
				`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
				{ logging: false, native: false },
		  );
const basename = path.basename(__filename);

const modelDefiners = [];
// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
	.filter(
		(file) =>
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js",
	)
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, "/models", file)));
	});

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
	entry[0][0].toUpperCase() + entry[0].slice(1),
	entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const {
	Product,
	Category,
	ProductDetail,
	Order,
	Cliente,
	Carrito,
	Review,
	Invoice,
	Role,
	Users,
	Chat_bot_emisor,
	Chat_bot_receptor,
	PaymentResponse,
} = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
ProductDetail.hasMany(Review);
Review.belongsTo(ProductDetail);

Users.hasMany(Review);
Review.belongsTo(Users);

//Client-Order-Factura
Users.hasMany(Order);
Order.belongsTo(Users);

//Orden de compra - Factura
Order.hasOne(Invoice);
Invoice.belongsTo(Order);

//Product-Category
Category.hasMany(Product);
Product.belongsTo(Category);

//ProductDetail-Category
Category.hasMany(ProductDetail);
ProductDetail.belongsTo(Category);

//ProductDetail-Product
Product.hasOne(ProductDetail);
ProductDetail.belongsTo(Product);

//Carrito-Client
Users.hasOne(Carrito);
Carrito.belongsTo(Users);

//Carrito-Products
Product.hasOne(Carrito);
Carrito.belongsTo(Product);

//Role-User
Users.hasOne(Role);
Role.belongsTo(Users);

//Chat bot Emisor-Receptor
Chat_bot_emisor.belongsToMany(Chat_bot_receptor, {
	through: "Emisor_Receptor",
});
Chat_bot_receptor.belongsToMany(Chat_bot_emisor, {
	through: "Emisor_Receptor",
});

//Relacion Factura - Orden de Compra - PaymentResponse
Cliente.hasMany(Order)
Order.belongsTo(Cliente)
Order.hasOne(Invoice)
Invoice.belongsTo(Order)

Order.hasOne(PaymentResponse)
PaymentResponse.belongsTo(Order)

Order.hasOne(PaymentResponse);
PaymentResponse.belongsTo(Order);

module.exports = {
	...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
	conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
