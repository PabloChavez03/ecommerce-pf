const express = require("express");
const passport = require("passport");

const router = express.Router();

const successLoginUrl = "https://clothes-22.vercel.app/login/success";
const errorLoginUrl = "https://clothes-22.vercel.app/login";

router.get(
	"/login/google",
	passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
	"/google/callback",
	passport.authenticate("google", {
		failureMessage: "Cannot login to Google",
		failureRedirect: errorLoginUrl,
		successRedirect: successLoginUrl,
	}),
	(req, res) => {
		console.log("User: ", req.user);
		res.send("You've been signed up");
	},
);

module.exports = router;
