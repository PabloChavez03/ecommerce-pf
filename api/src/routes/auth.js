const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { Users, Role } = require("../db");

const CLIENT_URL = "http://localhost:3000/";

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    msg: "Failure",
  });
});

router.get("/login/success", async (req, res) => {
  if (req.user) {
		
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

    const token = jwt.sign(userGoogleForToken, process.env.SECRET);
    // console.log(req.user)
    res.status(200).json({
      success: true,
      msg: "Successful",
      user: req.user,
      cookies: req.cookies,
      token,
    });
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router;
