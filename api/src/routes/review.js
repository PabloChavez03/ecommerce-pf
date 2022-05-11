const { Router } = require("express");
const { Review, Users, ProductDetail } = require("../db");

const router = Router();

router.get("", async (req, res) => {
	const { username } = req.query;

	const clientFound = await Users.findOne({
		where: {
			user_name: username,
		},
		include: [
			{
				model: Review,
			},
		],
	});

	res.send(clientFound);
});

router.post("", async (req, res) => {
	let { user_name, productId, calification, comment } = req.body;

	let [reviewCreated, created] = await Review.findOrCreate({
		where: {
			calification,
			comment,
		},
	}).catch((e) => e);

	const usuario = await Users.findByPk(user_name);
	const product = await ProductDetail.findByPk(productId);

	await reviewCreated.setUser(usuario).catch((e) => e);
	await reviewCreated.setProductDetail(product).catch((e) => e);

	if (created) {
		res.status(201).send("Review ceated");
	} else {
		res.status(201).send("Review existed");
	}
});

router.patch("", async (req, res) => {
	const {
		reviewId,
		changes: { calification, comment },
	} = req.body;

	const reviewFound = await Review.findOne({
		where: {
			id: reviewId,
		},
	});

	if (calification) reviewFound.calification = calification;
	if (comment) reviewFound.comment = comment;

	await reviewFound.save();

	res.send(reviewFound);
});

router.delete("", async (req, res) => {
	const { reviewId } = req.body;

	await Review.destroy({
		where: {
			id: reviewId,
		},
	});

	res.send(`Review con ID ${reviewId} se eliminó correctamente`);
});

module.exports = router;
