const {Product, Category} = require("../db");


const getAllDbInfo = async () => {  
        let allInfo = await Product.findAll({
            include: {
                model: Category,
                // attributes: ["title"],
                through: {
                    attributes: [],
                }
            }
        })
       return allInfo
};



module.exports ={ getAllDbInfo}