const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const { Users, Role } = require("../db");

const GOOGLE_CLIENT_ID =
  "508702470562-2vbp227ja8knpj7htlp028kafq25ptid.apps.googleusercontent.com";

const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      console.log("AccessToken", accessToken);
      console.log("RefreshToken", refreshToken);
      // profile.accessToken = accessToken;
      const defaultUser = {
        name: profile.name.givenName,
        lastname: profile.name.familyName,
        user_name: profile.emails[0].value,
        user_password: "clothes22",
        googleId: profile.id,
      };

      const user = await Users.findOrCreate({
        where: { googleId: profile.id },
        defaults: defaultUser,
      }).catch((err) => {
        console.log("soy el err", err);
        cb(err, null);
      });

      const rol = await Role.findOne({ where: { name: "client" } });
      console.log(rol)
      await user[0].setRole(rol);

      await user[0].save();

      if (user && user[0]) return cb(null, user && user[0]);

    }
  )
);

passport.serializeUser((user, cb) => {
  console.log("Serializacion de usuario:",user);
  cb(null, user.user_name);
});

passport.deserializeUser(async (user_name, cb) => {
  const user = await Users.findOne({ where: { user_name: user_name }}).catch((err) => {
    console.log("Error de deserealizacion:", err);
    cb(err,null);
  })

  console.log("Deserealizacion user:", user);

  if (user) cb(null,user);
});
