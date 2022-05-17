const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
// const { Users } = require("./db");

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
    function (accessToken, refreshToken, profile, done) {
      console.log("AccessToken", accessToken);
      console.log("RefreshToken", refreshToken);
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
