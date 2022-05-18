const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { Users, Role } = require("../db");
// const { isAuthenticate } = require("../middleware/auth");

const CLIENT_URL = "https://clothes-22.vercel.app/";

router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
	"/google/callback",
	passport.authenticate("google", {
		failureMessage: "Cannot login to Google, please try later again!",
		failureRedirect: "/login/failed",
		successRedirect: CLIENT_URL,
	}),
	(req, res) => {
		console.log(req.user);
		return res.send("Thank you for signing in!");
	},
);

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		success: false,
		msg: "Failure",
	});
});

router.get("/login/success", async (req, res) => {
	if (req.user) {
		try {
			// console.log("soy el response de auth perrin",req.user);
			let userGoogle = await Users.findOne({
				where: { email: req.user.emails[0].value },
			});

			const rol = await Role.findOne({ where: { name: "client" } });

			if (!userGoogle) {
				userGoogle = await Users.create({
					user_name: req.user.displayName,
					user_password: req.user.id,
					email: req.user.emails[0].value,
				});

				await userGoogle.setRole(rol);

				await userGoogle.save();
			}

			const userGoogleForToken = {
				username: req.user.displayName,
				role: rol.id,
			};

			const userPerGoogle = {
				googleId: req.user.id,
				user_name: req.user.emails[0].value,
				user_password: "clothes22",
				provider: req.provider,
			};

			const token = jwt.sign(userGoogleForToken, process.env.SECRET);
			// console.log(req.user)
			return res.status(200).json({
				accessToken: req.accessToken,
				success: true,
				msg: "Successful",
				user: userPerGoogle,
				cookies: req.cookies,
				// accessToken: req.user.accessToken,
				token,
			});
		} catch (error) {
			return res.status(409).json({ message: error });
		}
	}
});

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(CLIENT_URL);
});

module.exports = router;
