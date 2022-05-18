const express = require("express");
const passport = require("passport");

const router = express.Router();

const successLoginUrl = "http://clothes-22.vercel.app/login/success";
const errorLoginUrl = "http://clothes-22.vercel.app/login";

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
		session: true,
	}),
	(req, res) => {
		console.log("User: ", req.user);
		res.send("You've been signed up");
	},
);

module.exports = router;
