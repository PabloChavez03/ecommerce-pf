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

  if (!req.user) {
    return res.status(409).json({ message: "user not register" });
  }

  const username = req.user?.userGoogle.user_name;
  const password = req.user?.userGoogle.user_password;
  const token = req.user?.token;
  
  return res.status(200).json({
    // rue,
    status: "successful",
    username: username,
    password: password,
    token: token,
  });
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
  }),
  async (req, res) => {}
);

module.exports = router;
