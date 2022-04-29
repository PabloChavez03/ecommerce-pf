const { Carrito, Product } = require("../db");

//GET

const getCarrito = async (idPhone) => {
  try {
    let clientCarrito = await Carrito.findOne({
      where: {
        ClientePhone: idPhone,
      },
    });
    return clientCarrito;
  } catch (error) {
    return new TypeError(error);
  }
};

// getCarrito(34426541908).then((data) => console.log(data))

//UPDATE

const updateCarrito = async (name,id) => {
  try {
    let product = await Product.findOne({
        where: {
            name,
        }
    });
    product = product?.toJSON();
    product = product?.name
    console.log(product)

    let modified = await Carrito.update(
      {
        carrito_product: product,
      },
      { where: { ClientePhone: id } }
    );
    return modified;
  } catch (error) {
    return new TypeError(error);
  }
};

//DELETE 

// const deleteCarrito = async (id) => {
//   try {
//     const deleteCarr = await Carrito.destroy({
//       where: { ClientePhone: id },
//     });
//   } catch (error) {
//     return new TypeError(error);
//   }
// };

module.exports = {
  getCarrito,
  updateCarrito,
//   deleteCarrito,
};
