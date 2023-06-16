var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var User = require("./src/classes/user.js");

var app = express();

//create secret of section
app.use(
  session({
    secret: "hjf382y32vh2b3835hbfh",
    resave: true,
    saveUninitialized: true,
  })
);

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// set the view engine to ejs
app.set("view engine", "ejs");

// load up an ejs view file
app.get("/", function (req, res) {
  if (req.session.user) {
    res.redirect("home");
  }

  res.render("pages/login");
});
app.post("/", urlencodedParser, async function (req, res) {
  let { email, password } = req.body;

  const user = await User.fecthUser(email);

  if (user && user[0].senha === password) {
    req.session.user = user[0];
    res.redirect("home");
  }

  res.render("pages/login");
});
app.get("/home", function (req, res) {
  if (!req.session.user) {
    res.redirect("/");
  }

  res.render("pages/index", { user: req.session.user });
});
app.get("/espacos", function (req, res) {
  if (!req.session.user) {
    res.redirect("/");
  }

  res.render("pages/buildings", { user: req.session.user });
});
app.get("/info", function (req, res) {
  if (!req.session.user) {
    res.redirect("/");
  }

  res.render("pages/info", { user: req.session.user });
});
app.get("/configuracoes", function (req, res) {
  if (!req.session.user) {
    res.redirect("/");
  }

  res.render("pages/settings", { user: req.session.user });
});
app.get("/sair", urlencodedParser, function (req, res) {
  if (!req.session.user) {
    res.redirect("/");
  }

  req.session.destroy();
  res.redirect("/");
});
app.get("/cadastro", function (req, res) {
  res.render("pages/register");
});
app.post("/cadastro", urlencodedParser, function (req, res) {
  let { nome, email, password } = req.body;
  let usuario = new User(nome, email, password);
  usuario.add(req.body);
  res.redirect("/");
});

app.get("/spaceManager", function (req, res) {
  res.render("pages/spaceManager");
});

app.get("/spaceUser", function (req, res) {
  res.render("pages/spaceUser");
});
app.get("/spaceEdit", function (req, res) {
  res.render("pages/spaceEdit");
});
app.get("/manage-users", function (req, res) {
  res.render("pages/managerUsers");
});
// load public folder
app.use(express.static(__dirname + "/public"));

app.listen(8080, () => {
  console.log("Servidor iniciado em http://localhost:8080");
});
