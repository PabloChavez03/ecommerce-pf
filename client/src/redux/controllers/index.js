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
        let categoryArray = data.map(item => {
            return item.Category
        })
        let hash = {};
        categoryArray = categoryArray.filter((current) => {
            var exists = !hash[current.id];
            hash[current.id] = true;
            return exists;
        });
        let newCategory = []
        categoryArray.forEach(item => {
            if (item.genre.toLowerCase() === gender.toLowerCase()) {
                newCategory.push(item)
            }
        })
        return newCategory
    } catch (err) {
        console.log(err)
    }
}

export const chatBot = async (item) => {
    try {
        if (item) {
            return await axios
                .get(`/chatBot?dataString=${item}`)
                .then((res) => res.data)
        }
        return await axios
            .get("/chatBot")
            .then((res) => res.data)
    } catch (error) {
        console.log(error);
    }
}
////Chat bot Receptor
export const getChatBotReceptor = async () => {
    try {
        return await axios
            .get(`/chatBot/receptor`)
            .then(res => res.data)
    }
    catch (err) {
        console.log(err);
    }
}

export const getChatBotReceptorName = async () => {
    try {
        let data = await getChatBotReceptor()
        return data.map(item => item.name)
    } catch (err) {
        console.log(err);
    }
}

export const postChatBotReceptor = async (data) => {
    try {
        return await axios
            .post(`/chatBot/receptor`, {
                name: data.name,
                isActive: data.isActive
            })
    }
    catch (err) {
        console.log(err);
    }
}

export const putChatBotReceptor = async (data) => {
    try {
        return await axios
            .put(`/chatBot/receptor`, {
                id: data.id,
                name: data.name,
                isActive: data.isActive
            })
    }
    catch (err) {
        console.log(err);
    }
}

export const deleteChatBotReceptor = async (id) => {
    try {
        await axios
            .delete(`/chatBot/receptor`, {
                data: {
                    id: id,
                }
            })
        return await getChatBotReceptor()
    }
    catch (err) {
        console.log(err);
    }
}
/**----------------------------------EMISOR----------------------------------------------- */
////Chat bot Emisor
export const getChatBotEmisor = async () => {
    try {
        return await axios
            .get(`/chatBot/emisor`)
            .then(res => res.data)
    }
    catch (err) {
        console.log(err);
    }
}

export const postChatBotEmisor = async (data) => {
    try {
        return await axios
            .post(`/chatBot/emisor`, {
                name: data.name,
                respuesta: data.respuesta,
                isActive: data.isActive,
                receptor: data.receptor
            })
    }
    catch (err) {
        console.log(err);
    }
}

export const putChatBotEmisor = async (data) => {
    try {
        return await axios
            .put(`/chatBot/emisor`, {
                id: data.id,
                name: data.name,
                respuesta: data.respuesta,
                isActive: data.isActive,
                alternativa: data.receptor
            })
    }
    catch (err) {
        console.log(err);
    }
}

export const deleteChatBotEmisor = async (id) => {
    try {
        await axios
            .delete(`/chatBot/emisor`, {
                data: {
                    id: id,
                }
            })
        return await getChatBotEmisor()
    }
    catch (err) {
        console.log(err);
    }
}

export const emailPublicidad = async (data) => {
    try {
        if (data) {
            return await axios 
            .post(`/email/publicidad`,
            {
                emailGoogle:data.emailGoogle,
                emailAsunto:data.emailAsunto,
                emailImagenTitle:data.emailImagenTitle,
                emailTitulo:data.emailTitulo,
                emailSubTitle:data.emailSubTitle,
                emailDescription:data.emailDescription,
                emailButton:data.emailButton
            }
            )
        } else {console.log({"Info":"No hay datos" })}
    }
    catch (err) { console.log(err); }
}