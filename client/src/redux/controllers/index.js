const axios = require('axios');

export const urlAllProduct = async () => {
    try {
        return await axios
            .get("/allproducts")
            .then((res) => res.data);
    } catch (err) {
        console.log(err);
    }
};
////////////////////////Mostrar los datos de la Api///////////////////////////
export const urlProdutcGender = async (gender) => {
    try {
        return await axios
            .get(`/products/genre?genrename=${gender}`)
            .then(res => res.data)
    } catch (err) {
        console.log(err);
    }
}
/////////////////////////Mostrar todas las marcas que tiene///////////////////////////
export const currentbrands = async (gender) => {
    try {
        const data = await urlProdutcGender(gender);
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
/////////////////////////////Mostrar los productos filtrados por marca///////////////////////////////
export const filterbrands = (brand, allProducts) => {
    try {
        const data = allProducts;
        let databrand = []
        data.forEach(item => {
            if (item.brandName === brand) {
                databrand.push(item);
            }
        })

        return databrand;

    } catch (err) {
        console.log(err);
    }
}

export const currentcategory = async (gender) => {
    try {
        const data = await urlProdutcGender(gender);//Women
        let categoryArray = []
        data.forEach(item => {
            item.Categories.forEach(element => {
                if (!categoryArray.includes(element)) {
                    categoryArray.push(element)
                }
            })
        })
        let hash = {};
        categoryArray = categoryArray.filter((current) => {
            var exists = !hash[current.id];
            hash[current.id] = true;
            return exists;
        });let newCategory =[]
        categoryArray.forEach(item=>{
            if(item.genre.toLowerCase()===gender.toLowerCase()){
                newCategory.push(item)
            }
        })
        return newCategory
    } catch (err) {
        console.log(err)
    }
}
