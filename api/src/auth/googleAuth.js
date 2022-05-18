const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const { Users, Role } = require("../db");

const CLIENT_URL = "https://clothes-22.vercel.app/auth/google/callback";

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: CLIENT_URL,
			passReqToCallback: true,
		},
		async (req, accessToken, refreshToken, profile, cb) => {
			const defaultUser = {
				user_name: `${profile.name.givenName}${profile.id.slice(0, 4)}`,
				user_password: profile.name.givenName,
				name: profile.name.givenName,
				lastname: profile.name.familyName,
				email: profile.emails[0].value,
				googleId: profile.id,
			};

			const user = await Users.findOrCreate({
				where: { googleId: profile.id },
				defaults: defaultUser,
			}).catch((e) => {
				console.log("Error signing up:", e);
				cb(e, null);
			});

			if (user[1]) {
				const roleClient = await Role.findOne({ where: { name: "client" } });
				await user[0].setRole(roleClient);
			}

			if (user && user[0]) return cb(null, user && user[0]);
		},
	),
);

passport.serializeUser((user, cb) => {
	console.log("Serializing user:", user);
	cb(null, user.googleId);
});

passport.deserializeUser(async (googleId, cb) => {
	const user = await Users.findOne({ where: { googleId } }).catch((e) => {
		console.log("Error deserializing:", e);
		cb(e, null);
	});

	console.log("Deserialized user", user);

	if (user) cb(null, user);
});
