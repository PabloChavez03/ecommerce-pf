const axios = require('axios');

export const urlAllProduct = async () => {
    try {
        return await axios
            .get("http://localhost:3001/allproducts")
            .then((res) => res.data);
    } catch (err) {
        console.log(err);
    }
};

export const currentbrands = async () => {
    try {
        const data = await urlAllProduct();
        let marcaArray = []
        data.forEach(item => {
            if (!marcaArray.includes(item.brandName)) {
                marcaArray.push(item.brandName)
            }
        })
        return marcaArray

    } catch (err) {
        console.log(err);
    }
}
export const filterbrands = async (brand) => {
    try {
        const data = await urlAllProduct();
        let databrand = []
        data.forEach(item => {
            if (item.brandName === brand) {
                databrand.push(item);
            }
        })
        console.log(databrand)
        return databrand;

    } catch (err) {
        console.log(err);
    }
}