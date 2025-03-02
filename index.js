const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");

const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const clientRoutes = require("./routes/client/index.route");
const adminRoutes = require("./routes/admin/index.route");
const database = require("./config/database");

const methodOverride = require("method-override");

const app = express();
app.use(express.json());
const port = process.env.PORT;

database.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`));

app.use(cookieParser("keyboard cat"));
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(flash());

clientRoutes(app);
adminRoutes(app);

app.use("*", (req, res) => {
  res.send("404 NOT FOUND");
});

// App locals variables
const systemConfig = require("./config/system");
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.listen(port, () => {
  console.log(`App listen on port ${port}`);
});
