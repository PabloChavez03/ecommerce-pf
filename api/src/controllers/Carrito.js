const {sequelize} = require("sequelize");
const {Carrito} = require("../db");


const getCarrito = async (idPhone) => {
    try {
        let clientCarrito = await Carrito.findOne({
            where: {
                ClientePhone: idPhone
            }
        });
        return clientCarrito
    } catch (error) {
        return new TypeError(error)
    }
};


const updateCarrito = async (info, id) => {
    try {
        let modified = await Carrito.update({
            carrito_product: info
        },
         {where: { ClientePhone: id} });
         return modified
    } catch (error) {
        return new TypeError(error)
    }
};

const deleteCarrito = async (id) => {
    try {
        const deleteCarr = await Carrito.destroy({
            where: {ClientePhone: id}
        })

    } catch (error) {
        return new TypeError(error)
    }
};

module.exports = {
    getCarrito,
    updateCarrito,
    deleteCarrito
}