const { getAllDbInfo } = require('./getAllInfo');

async function getGenderFilterByProduc(genreName) {
    try {
        let toLower = genreName.toLowerCase()
        let product = await getAllDbInfo()
        let array = []
        product.forEach(item => {
            return item.Categories.forEach(element => {
                if (element.genre === toLower) array.push(item)
            })
        })
        if (array.length === 0) {
            return [
                { "Error": "Error in the data entered" }
            ]
        }
        return array;
    } catch (err) {
        return new TypeError(err)
    }
}

module.exports = {
    getGenderFilterByProduc
}