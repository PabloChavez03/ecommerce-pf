const { Router } = require("express");
const { getGenderFilterByProduc } = require("../controllers/productsByGenreGetter");
const router = Router();

router.get('/', async (req, res) => {
    const { genreName } = req.query
    let data = await getGenderFilterByProduc(genreName)
    try {
        data
            ? res.status(200).json(data)
            : res.status(404).send("Filter problems")

    } catch (err) {
        return new TypeError(err)
    }

})

module.exports = router;
