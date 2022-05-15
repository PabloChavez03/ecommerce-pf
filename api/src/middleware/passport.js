const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const { Users, Role } = require("../db");
const jwt = require("jsonwebtoken");

const GOOGLE_CLIENT_ID =
  "508702470562-2vbp227ja8knpj7htlp028kafq25ptid.apps.googleusercontent.com";

const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      const { displayName, emails } = profile;
      let emailGoogle = emails[0].value;

      let userGoogle = await Users.findOne({
        where: { email: emailGoogle },
      });

      const rol = await Role.findOne({ where: { name: "client" } });

      if (!userGoogle) {
        userGoogle = await Users.create({
          name: displayName,
          user_name: emailGoogle,
          user_password: "clothes22",
          email: emailGoogle,
        });

        await userGoogle.setRole(rol);

        await userGoogle.save();
      }

      const userGoogleForToken = {
        username: displayName,
        role: rol.id,
      };

      const token = jwt.sign(userGoogleForToken, process.env.SECRET);

      done(null, { userGoogle, token });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
