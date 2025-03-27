const express = require("express");
const routes = require("./routes");
const path = require("path");
const cookieParser = require("cookie-parser");
const config = require("./config");
const port = config.PORT;
const hostname = config.HOSTNAME;
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api", routes);

app.get("/api/me", (req, res) => {
	const token = req.cookies.token;
	if (!token) {
		return res.status(401).send({loggedIn: false});
	}

	try {
		jwt.verify(token, config.DB_PASSWORD);
		res.status(200).send({loggedIn: true});
	} catch (error) {
		res.status(401).send({loggedIn: false});
	}
});

app.use('/', routes)

app.listen(port, () => {
	console.log(`Server running on "http://${hostname}:${port}"`);
});
