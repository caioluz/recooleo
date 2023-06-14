var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var User = require("./src/classes/user.js");
var Espaco = require("./src/classes/espaço.js");

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

// middleware de verificação de autenticação
const requireAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};
const requireNotAuth = (req, res, next) => {
  if (!req.session || !req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
};

// set the view engine to ejs
app.set("view engine", "ejs");

// load up an ejs view file
app.get("/", requireAuth, function (req, res) {
  res.render("pages/index", { user: req.session.user });
});
app.get("/register", requireNotAuth, function (req, res) {
  res.render("pages/register");
});
app.post("/register", urlencodedParser, function (req, res) {
  let { nome, email, password } = req.body;
  let usuario = new User(nome, email, password);

  usuario.add(req.body);
  res.redirect("/");
});
app.get("/login", requireNotAuth, function (req, res) {
  res.render("pages/login");
});
app.post("/login", urlencodedParser, async function (req, res) {
  let { email, password } = req.body;
  const user = await User.fecthUser(email);

  if (user && user[0].senha === password) {
    req.session.user = user[0];
    res.redirect("/");
  }
  else {
    res.redirect("/login");
  }
});
app.get("/logout", requireAuth, function (req, res) {
  req.session.destroy();
  res.redirect("/");
});
app.get("/settings", requireAuth, function (req, res) {
  res.render("pages/settings", { user: req.session.user });
});
app.get("/info", requireAuth, function (req, res) {
  res.render("pages/info");
});
app.get("/spaces", requireAuth, function (req, res) {
  res.render("pages/spaces", { user: req.session.user });
});
app.get("/space-register", requireAuth, function (req, res) {
  res.render("pages/spaceRegister");
});
app.post("/space-register", urlencodedParser, function (req, res) {
  const { nomeespaco, tipoespacos, localizacao, proprietario, membros } = req.body;
  let espaco = new Espaco(
    nomeespaco,
    tipoespacos,
    localizacao,
    proprietario,
    membros
  );

  espaco.addEspaco(espaco);
  res.redirect("/spaces");
});
app.get("/space-manager", requireAuth, function (req, res) {
  res.render("pages/spaceManager");
});

// load public folder
app.use(express.static(__dirname + "/public"));

app.listen(8080, () => {
  console.log("Servidor iniciado em http://localhost:8080");
});
