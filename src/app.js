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

app.listen(port, () => {
  console.log(`Server running on "http://${hostname}:${port}"`);
});