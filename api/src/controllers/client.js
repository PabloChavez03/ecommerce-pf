// const axios = require("axios");
// const { Sequelize, Op } = require("sequelize");
const { Cliente, Carrito } = require("../db");
// require("dotenv").config();

const cliente = {
	addClient: async (req, res) => {
		try {
			const {
				phone,
				email,
				login_name,
				login_password,
				name,
				lastname,
				address,
			} = req.body;

			const [createdCliente, created] = await Cliente.findOrCreate({
				where: { phone: phone },
				defaults: {
					phone,
					email,
					login_name,
					login_password,
					name,
					lastname,
					address,
					isRegistered: login_name ? true : false,
				},
			});

			let isThereCarrito = await Carrito.findOne({
				where: {
					ClientePhone: phone,
				},
			});

			if (login_name && !isThereCarrito) {
				let newCarrito = await Carrito.create();
				newCarrito.setCliente(phone);
			}
			res
				.status(200)
				.send(
					created ? "Cliente creado correctamente" : "Ya existe el cliente",
				);
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = cliente;
