var express = require("express");
var path = require("path");
var cors = require("cors");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

var logger = require("morgan");

// Routers
var indexRouter = require("./routes/index");
var adminRouter = require("./routes/adminRouter");

// Middlewares
const { hasValidToken } = require("./middlewares/AuthenticationMiddleware");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

const port = parseInt(process.env.PORT, 10) || 8000;
app.set("port", port);

app.listen(port, () => console.log("Server listening on port 8000"));

app.use("/", indexRouter);
app.use("/admin", adminRouter);

module.exports = app;
