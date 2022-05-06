const { Chat_bot_emisor, Chat_bot_receptor } = require('../db')

const chat_bot = async (data) => {
    let v1 = await emisor();
    if (v1) {
        if (!data) {
            v1 = v1.find(item => item.id === 1)
            let v2 = []
            v1.chat_bot_receptors.forEach(item => {
                v2.push(item.name)
            })
            let plantilla = {
                id: v1.id,
                name: v1.name,
                respuesta: v1.respuesta,
                isActive: v1.isActive,
                alternativa: [...v2]
            }
            return plantilla
        }
        let dato = v1.find(item => item.name === data)
        let v2 = []
        dato.chat_bot_receptors.forEach(item => {
            v2.push(item.name)
        })
        let v3 = {
            id: dato.id,
            name: dato.name,
            respuesta: dato.respuesta,
            isActive: dato.isActive,
            alternativa: [...v2]
        }
        return v3

    } else {
        return { "Info": "Dato undefined en la base de datos" }
    }

}
//Mostrar todo los Emisor
const emisor = async () => {
    return await Chat_bot_emisor.findAll({
        include: {
            model: Chat_bot_receptor,
            attributes: ['name'],
            through: { attributes: [] },
        }
    });
}
const allEmisor = async () => {
    let data = await emisor()
    let dataUpdate = []
    data.forEach(element => {
        let v1 = []

        element.chat_bot_receptors.forEach(item => {
            v1.push(item.name)
        })
        let plantilla = {
            id: element.id,
            name: element.name,
            respuesta: element.respuesta,
            isActive: element.isActive,
            alternativa: [...v1]
        }
        dataUpdate.push(plantilla)
    });
    return await dataUpdate;
}
//Agregar un nuevo Emisor
const addEmisor = async ({ name, respuesta, isActive = true, receptor }) => {
    if (name.length > 0 && respuesta.length > 0) {
        let v1 = await Chat_bot_emisor.findAll();
        let validar = v1.find(item => item.name === name)
        if (!validar) {
            let data = await Chat_bot_emisor.create({
                name: name,
                respuesta: respuesta,
                isActive: isActive,
            })
            const receptorDB = await Chat_bot_receptor.findAll({
                where: { name: receptor },
            });
            await data.addChat_bot_receptor(receptorDB);
            return { "Info": "Registro exitoso" }
        }
        return { "Info": "nombre repetido, ingrese otro diferente" }
    } else {
        return { "Info": "No hay respuesta" }
    }



}
//Editar el Emisor por parametro {id, name, isActive} se puede obviar el isActive pero 
const updateEmisor = async ({ id, name, isActive }) => {
    if (id) {
        if (name || isActive === false || isActive) {
            await Chat_bot_emisor.update({
                name,
                isActive,
            }, { where: { id } })
            return { "Info": "Succession" }
        } else {
            return { "Info": "Requisito un dato para poder actualizar el dato" }
        }
    } else {
        return { "Error": "Ingrese el Id" }
    }
}
//Borrar el Emisor por id
const deleteEmisor = async ({ id }) => {
    return await Chat_bot_emisor.destroy({
        where: {
            id,
        }
    });
    //return { "Info": "Borrado exitosamente" }
}
//////////////////////////////////////////////////////////////////////////////////////////////
//Mostrar todo los Receptores
const allReceptor = async () => {
    return await Chat_bot_receptor.findAll({
        order: [['id']]
    })
}
//Agregar un nuevo Receptor
const addReceptor = async ({ name, isActive = true }) => {
    const data = await Chat_bot_receptor.create({
        name,
        isActive,
    })
    return data
}
//Editar el receptor por parametro {id, name, isActive} se puede obviar el isActive pero 
const updateReceptor = async ({ id, name, isActive }) => {
    if (id) {
        if (name || isActive === false || isActive) {
            await Chat_bot_receptor.update({
                name,
                isActive,
            }, { where: { id } })
            return { "Info": "Succession" }
        } else {
            return { "Info": "Requisito un dato para poder actualizar el dato" }
        }

    } else {
        return { "Error": "Ingrese el Id" }
    }

}
//Borrar el receptor por id
const deleteReceptor = async ({ id }) => {
    await Chat_bot_receptor.destroy({
        where: {
            id,
        }
    });
    return { "Info": "Borrado exitosamente" }
}
module.exports = {
    chat_bot,
    addReceptor,
    allReceptor,
    updateReceptor,
    deleteReceptor,
    allEmisor,
    addEmisor,
    updateEmisor,
    deleteEmisor
}