const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const cors = require("cors");

const cookieSession = require("cookie-session");
const passport = require("passport");
// const passportSetup = require("../src/middleware/passport");

require("./auth/googleAuth");
require("./db.js");

const server = express();

server.use(cors());
server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	}),
);

server.use(
	cookieSession({
		maxAge: 24 * 60 * 60 * 100,
		name: "session",
		keys: ["test"],
	}),
);
server.use(passport.initialize());
server.use(passport.session());

// server.use((req, res, next) => {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	// authorized headers for preflight requests
// 	// https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
// 	res.header(
// 		"Access-Control-Allow-Headers",
// 		"Origin, X-Requested-With, Content-Type, Accept",
// 	);
// 	next();

// 	server.options("*", (req, res) => {
// 		// allowed XHR methods
// 		res.header(
// 			"Access-Control-Allow-Methods",
// 			"GET, PATCH, PUT, POST, DELETE, OPTIONS",
// 		);
// 		res.send();
// 	});
// });

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
	// eslint-disable-line no-unused-vars
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
});

module.exports = server;
