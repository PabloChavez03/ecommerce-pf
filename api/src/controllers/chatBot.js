const { Chat_bot_emisor, Chat_bot_receptor } = require("../db");

const fs = require("fs");
/////Emisor
const json_emisor = fs.readFileSync("src/data/emisor.json", "utf-8");
const emisorJson = JSON.parse(json_emisor);
////Receptor
const json_receptor = fs.readFileSync("src/data/receptor.json", "utf-8");
const receptorJson = JSON.parse(json_receptor);
//////
const load_chat_bot = async () => {
	let emisorDB = await Chat_bot_emisor.findAll();
	let receptorDB = await Chat_bot_receptor.findAll();
	if (receptorDB.length === 0) {
		receptorJson.forEach(async (item) => {
			const jane = await Chat_bot_receptor.build({
				name: item.name,
				isActive: item.isActive,
			});
			jane.save();
		});
	}
	setTimeout(() => {
		if (emisorDB.length === 0) {
			emisorJson.forEach(async (item) => {
				const ChatEmisor = await Chat_bot_emisor.create({
					name: item.name,
					respuesta: item.respuesta,
					isActive: item.isActive,
				});
				const emisorv1 = await Chat_bot_receptor.findAll({
					where: { name: item.alternativa },
				});
				await ChatEmisor.addChat_bot_receptor(emisorv1);
			});
		}
	}, 1000);
};
/////////////////////////
const chat_bot = async (data) => {
	let v1 = await emisor();
	if (v1.length !== 0) {
		if (!data) {
			v1 = v1[0];
			let v2 = [];
			v1.chat_bot_receptors.forEach((item) => {
				v2.push(item.name);
			});
			let plantilla = {
				id: v1.id,
				name: v1.name,
				respuesta: v1.respuesta,
				isActive: v1.isActive,
				alternativa: [...v2],
			};
			return plantilla;
		}
		let dato = v1.find((item) => item.name === data);
		let v2 = [];
		if (dato !== undefined) {
			if (dato.chat_bot_receptors.length > 0) {
				dato.chat_bot_receptors.forEach((item) => {
					v2.push(item.name);
				});
			}
			let v3 = {
				id: dato.id,
				name: dato.name,
				respuesta: dato.respuesta,
				isActive: dato.isActive,
				alternativa: [...v2],
			};
			return v3;
		} else {
			return { Info: "Dato no encontrado" };
		}
	} else {
		return { Info: "Dato undefined en la base de datos" };
	}
};
//Mostrar todo los Emisor
const emisor = async () => {
	return await Chat_bot_emisor.findAll({
		include: {
			model: Chat_bot_receptor,
			attributes: ["name"],
			through: { attributes: [] },
		},
		order: [["id"]],
	});
};
const allEmisor = async () => {
	let data = await emisor();
	let dataUpdate = [];
	data.forEach((element) => {
		let v1 = [];

		element.chat_bot_receptors.forEach((item) => {
			v1.push(item.name);
		});
		let plantilla = {
			id: element.id,
			name: element.name,
			respuesta: element.respuesta,
			isActive: element.isActive,
			alternativa: [...v1],
		};
		dataUpdate.push(plantilla);
	});
	return await dataUpdate;
};
//Agregar un nuevo Emisor
const addEmisor = async ({ name, respuesta, isActive = true, receptor }) => {
	if (name.length > 0 && respuesta.length > 0) {
		let v1 = await Chat_bot_emisor.findAll();
		let validar = v1.find((item) => item.name === name);
		if (!validar) {
			let data = await Chat_bot_emisor.create({
				name: name,
				respuesta: respuesta,
				isActive: isActive,
			});
			const receptorDB = await Chat_bot_receptor.findAll({
				where: { name: receptor },
			});
			await data.addChat_bot_receptor(receptorDB);
			return { Info: "Registro exitoso" };
		}
		return { Info: "nombre repetido, ingrese otro diferente" };
	} else {
		return { Info: "No hay respuesta" };
	}
};
//Editar el Emisor por parametro {id, name, isActive} se puede obviar el isActive pero
const updateEmisor = async ({ id, name, respuesta, isActive, alternativa }) => {
	if (id) {
		if (name || respuesta || isActive === false || isActive || alternativa) {
			await Chat_bot_emisor.update(
				{
					name,
					respuesta,
					isActive,
					alternativa,
				},
				{ where: { id } },
			);
			const emisor = await Chat_bot_emisor.findAll({
				where: { name },
				include: {
					model: Chat_bot_receptor,
				},
			}).catch((e) => console.log(e));
			console.log(emisor)
			for (el of emisor[0].chat_bot_receptors) {

				await emisor[0].removeChat_bot_receptor(el);

			}
			if (alternativa.length !== 0) {
				for (el of alternativa) {
					const receptorDB = await Chat_bot_receptor.findAll({
						where: { name: alternativa },
					});
					await emisor[0].addChat_bot_receptor(receptorDB);
				}
			}
			return { Info: "Succession" };
		} else {
			return { Info: "Requisito un dato para poder actualizar el dato" };
		}
	} else {
		return { Error: "Ingrese el Id" };
	}
};
//Borrar el Emisor por id
const deleteEmisor = async ({ id }) => {
	return await Chat_bot_emisor.destroy({
		where: {
			id,
		},
	});
	//return { "Info": "Borrado exitosamente" }
};
//////////////////////////////////////////////////////////////////////////////////////////////
//Mostrar todo los Receptores
const allReceptor = async () => {
	return await Chat_bot_receptor.findAll({
		order: [["id"]],
	});
};
//Agregar un nuevo Receptor
const addReceptor = async ({ name, isActive = true }) => {
	let receptor = await Chat_bot_receptor.findAll({ where: { name } })
	if (receptor.length === 0) {
		const data = await Chat_bot_receptor.create({
			name,
			isActive,
		});
		return data;
	} else{
		return {"Info":"Nombre repetido"}
	}


};
//Editar el receptor por parametro {id, name, isActive} se puede obviar el isActive pero
const updateReceptor = async ({ id, name, isActive }) => {
	if (id) {
		if (name || isActive === true || isActive) {
			let data = await Chat_bot_receptor.findAll({ where: { id } })
			let Newdata = data[0].name
			let emisor = await Chat_bot_emisor.findOne({
				where: { name: Newdata },
			});
			if (emisor !== null) {
				await Chat_bot_emisor.update(
					{
						name: name,
						respuesta: emisor.respuesta,
						isActive: emisor.isActive,
					},
					{ where: { id: emisor.id } },
				);
			}
			await Chat_bot_receptor.update(
				{
					name,
					isActive,
				},
				{ where: { id } },
			);
			return { Info: "Succession" };
		} else {
			return { Info: "Requisito un dato para poder actualizar el dato" };
		}
	} else {
		return { Error: "Ingrese el Id" };
	}
};
//Borrar el receptor por id
const deleteReceptor = async ({ id }) => {
	await Chat_bot_receptor.destroy({
		where: {
			id,
		},
	});
	return { Info: "Borrado exitosamente" };
};
module.exports = {
	chat_bot,
	addReceptor,
	allReceptor,
	updateReceptor,
	deleteReceptor,
	allEmisor,
	addEmisor,
	updateEmisor,
	deleteEmisor,
	load_chat_bot,
};
