const passport = require("passport");
const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const { Users,Role } = require("../db");

passport.use(
  new StrategyJwt({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
  }),
  function (jwtPayload, done) {
    return Users.findOne({ where: { user_name: jwtPayload.username }}).then((user) => {
      return done(null, user);
    })
    .catch((err) => {
      return done(err);
    })
  }
)